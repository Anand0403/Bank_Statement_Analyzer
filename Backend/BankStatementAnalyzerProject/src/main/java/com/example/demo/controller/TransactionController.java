package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.service.TransactionService;
import com.example.demo.model.UploadHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/transactions")

public class TransactionController {

    @Autowired
    private TransactionService service;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return service.getAllTransactions();
    }

    @GetMapping("/category/{category}")
    public List<Transaction> getByCategory(@PathVariable String category) {
        return service.getByCategory(category);
    }

    @GetMapping("/total-savings")
    public double getTotalSavings() {
        return service.getTotalSavings();
    }

    @GetMapping("/total-spending")
    public double getTotalSpending() {
        return service.getTotalSpending();
    }


    @GetMapping("/chart-data/spending-by-category")
    public Map<String, Double> getSpendingChartData() {
        return service.getCategoryWiseSpending();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            service.saveTransactionsFromCsv(file);
            return ResponseEntity.ok("File uploaded and data stored successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }


    @GetMapping("/chart-data/monthly-balance")
    public Map<String, Double> getMonthlyBalance() {
        return service.getMonthlyBalanceTrend(); // You’d create this method
    }

    @GetMapping("/upload/history")
    public List<UploadHistory> getUploadHistory() {
        return service.getUploadHistory();
    }

    @GetMapping("/upload/history/latest")
    public UploadHistory getLatestUploadedFile() {
        return service.getLatestUpload();
    }

    @GetMapping("/chart-data/monthly-savings-spendings")
    public Map<String, Map<String, Double>> getSavingsAndSpendingsPerMonth() {
        return service.getMonthlySavingsAndSpending();
    }

}
