package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.service.TransactionService;
import com.example.demo.model.UploadHistory;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.PrintWriter;
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

    @GetMapping("/report/download")
    public void downloadReport(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=transaction_report.csv");

        PrintWriter writer = response.getWriter();

        // Section 1: Monthly Savings & Spending
        writer.println("Monthly Report");
        writer.println("Month,Savings,Spending");
        Map<String, Map<String, Double>> monthlyData = service.getMonthlySavingsAndSpending();
        for (String month : monthlyData.keySet()) {
            Map<String, Double> data = monthlyData.get(month);
            writer.printf("%s,%.2f,%.2f\n", month, data.get("savings"), data.get("spending"));
        }

        writer.println(); // blank line

        // Section 2: Category-wise Spending
        writer.println("Category-wise Spending");
        writer.println("Category,Amount");
        Map<String, Double> categoryData = service.getCategoryWiseSpending();
        for (String category : categoryData.keySet()) {
            writer.printf("%s,%.2f\n", category, categoryData.get(category));
        }

        writer.flush();
    }


}
