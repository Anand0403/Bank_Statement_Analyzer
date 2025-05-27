package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    private final Map<String, String> otpMap = new ConcurrentHashMap<>();
    private final Map<String, Boolean> verifiedMap = new ConcurrentHashMap<>();

    public void storeOtp(String email, String otp) {
        otpMap.put(email, otp);
        verifiedMap.put(email, false);
    }

    public boolean verifyOtp(String email, String otp) {
        String stored = otpMap.get(email);
        if (stored != null && stored.equals(otp)) {
            verifiedMap.put(email, true);
            otpMap.remove(email);
            return true;
        }
        return false;
    }

    public boolean isVerified(String email) {
        return verifiedMap.getOrDefault(email, false);
    }

    public void clearVerification(String email) {
        verifiedMap.remove(email);
    }
}