package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.EmailService;
import com.example.demo.service.OtpService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private OtpService otpService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email is required"));
        }
        if (userService.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User already exists"));
        }
        String otp = emailService.generateOtp();
        otpService.storeOtp(email, otp);
        emailService.sendOtpToEmail(email, otp);
        return ResponseEntity.ok(Map.of("success", true, "message", "OTP sent to your email."));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        if (otpService.verifyOtp(email, otp)) {
            return ResponseEntity.ok(Map.of("success", true, "message", "OTP verified successfully"));
        } else {
            return ResponseEntity.ok(Map.of("success", false, "message", "Invalid OTP"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String username = request.get("username");
        String phoneNumber = request.get("phoneNumber");
        String password = request.get("password");

        if (!otpService.isVerified(email)) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "OTP not verified for this email"));
        }
        if (userService.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User already exists"));
        }
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPhoneNumber(phoneNumber);
        user.setPassword(password); // Will be hashed in service
        userService.save(user);
        otpService.clearVerification(email);
        return ResponseEntity.ok(Map.of("success", true, "message", "Signup successful"));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        User user = userService.findByEmail(email);
        if (user == null || !userService.checkPassword(user, password)) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid credentials"));
        }
        // Optionally, generate and return JWT here
        return ResponseEntity.ok(Map.of("success", true, "message", "Sign in successful"));
    }
}