package com.example.demo.controller;

import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // allow your React app origin
public class AuthController {

    @Autowired
    private EmailService emailService;

    // Store OTPs temporarily in memory: email -> otp
    private final Map<String, String> otpMap = new HashMap<>();

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Map<String, Object> response = new HashMap<>();

        if (email == null || email.isEmpty()) {
            response.put("success", false);
            response.put("message", "Email is required");
            return ResponseEntity.badRequest().body(response);
        }

        String otp = emailService.generateOtp();
        otpMap.put(email, otp);

        // Send OTP to email
        emailService.sendOtpToEmail(email, otp);

        response.put("success", true);
        response.put("message", "OTP sent to your email.");

        // ⚠️ Do NOT include OTP in response in production!
        // response.put("otp", otp); // For testing only
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        Map<String, Object> response = new HashMap<>();

        if (email == null || otp == null || email.isEmpty() || otp.isEmpty()) {
            response.put("success", false);
            response.put("message", "Email and OTP are required");
            return ResponseEntity.badRequest().body(response);
        }

        String storedOtp = otpMap.get(email);

        if (storedOtp != null && storedOtp.equals(otp)) {
            response.put("success", true);
            response.put("message", "OTP verified successfully");

            // Optionally, remove OTP after successful verification
            otpMap.remove(email);
        } else {
            response.put("success", false);
            response.put("message", "Invalid OTP");
        }

        return ResponseEntity.ok(response);
    }
}
