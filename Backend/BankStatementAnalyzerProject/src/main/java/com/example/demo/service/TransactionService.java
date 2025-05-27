package com.example.demo.service;

import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UploadHistoryRepository;
import com.example.demo.model.UploadHistory;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;
    @Autowired
    private UploadHistoryRepository uploadHistoryRepository;

    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    public List<Transaction> getByCategory(String category) {
        return repository.findByCategory(category);
    }

    public double getTotalSavings() {
        List<Transaction> transactions = repository.findAll();
        return transactions.stream()
                .mapToDouble(t ->
                        (t.getDepositAmount() != null ? t.getDepositAmount() : 0.0) -
                                (t.getWithdrawalAmount() != null ? t.getWithdrawalAmount() : 0.0)
                ).sum();
    }


    public Map<String, Double> getCategoryWiseSpending() {
        List<Transaction> transactions = repository.findAll();
        Map<String, Double> spending = new HashMap<>();

        for (Transaction t : transactions) {
            if (t.getCategory() != null && t.getWithdrawalAmount() != null) {
                spending.put(
                        t.getCategory(),
                        spending.getOrDefault(t.getCategory(), 0.0) + t.getWithdrawalAmount()
                );
            }
        }
        return spending;
    }

    public Map<String, Double> getMonthlyBalanceTrend() {
        List<Transaction> transactions = repository.findAll();
        Map<String, Double> monthlyBalances = new TreeMap<>(); // TreeMap keeps keys sorted

        for (Transaction t : transactions) {
            if (t.getDate() != null && t.getClosingBalance() != null) {
                Calendar cal = Calendar.getInstance();
                cal.setTime(t.getDate());

                int month = cal.get(Calendar.MONTH) + 1; // Jan = 0
                int year = cal.get(Calendar.YEAR);

                String key = String.format("%d-%02d", year, month); // e.g., 2025-05

                // Replace with latest balance in that month (assuming file is chronological)
                monthlyBalances.put(key, t.getClosingBalance());
            }
        }

        return monthlyBalances;
    }


    public String analyzeQuestion(String question) {
        if (question.toLowerCase().contains("savings")) {
            return "Your total savings is: ₹" + getTotalSavings();
        }
        if (question.toLowerCase().contains("highest spending")) {
            Map<String, Double> spending = getCategoryWiseSpending();
            return spending.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .map(entry -> "Your highest spending is in " + entry.getKey() + ": ₹" + entry.getValue())
                    .orElse("No spending data found.");
        }
        return "Sorry, I couldn't understand the question.";
    }

    public void saveTransactionsFromCsv(MultipartFile file) throws Exception {
        // Step 1: Delete previous transactions
        repository.deleteAll();

        // Step 2: Parse and save new transactions
        try (
                InputStreamReader inputStreamReader = new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8);
                CSVParser csvParser = new CSVParser(inputStreamReader, CSVFormat.DEFAULT);
        ) {
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yy", Locale.ENGLISH);

            // Fix BOM in headers if present (e.g., "﻿date" -> "date")
            Map<String, String> headerFixMap = new HashMap<>();
            for (String header : csvParser.getHeaderMap().keySet()) {
                String cleanHeader = header.replace("\uFEFF", ""); // Remove BOM
                headerFixMap.put(cleanHeader, header); // Map "date" -> "﻿date" if needed
            }

            for (CSVRecord record : csvParser) {
                Transaction transaction = new Transaction();

                // Use safe header lookup
                transaction.setDate(sdf.parse(record.get(headerFixMap.get("date"))));
                transaction.setTransactionDescription(record.get(headerFixMap.get("transactionDescription")));
                transaction.setChqRefNo(record.get(headerFixMap.get("chqRefNo")));
                transaction.setValueDate(sdf.parse(record.get(headerFixMap.get("valueDate"))));
                transaction.setWithdrawalAmount(parseDoubleSafe(record.get(headerFixMap.get("withdrawalAmount"))));
                transaction.setDepositAmount(parseDoubleSafe(record.get(headerFixMap.get("depositAmount"))));
                transaction.setClosingBalance(parseDoubleSafe(record.get(headerFixMap.get("closingBalance"))));
                transaction.setCategory(record.get(headerFixMap.get("category")));
                transaction.setSubCategory(record.get(headerFixMap.get("subCategory")));
                transaction.setRemarks(record.get(headerFixMap.get("remarks")));

                repository.save(transaction);
            }

            // Step 3: Save upload history
            UploadHistory history = new UploadHistory(file.getOriginalFilename(), new Date());
            uploadHistoryRepository.save(history);
        }
    }

    public List<UploadHistory> getUploadHistory() {
        return uploadHistoryRepository.findAll();
    }

    public UploadHistory getLatestUpload() {
        return uploadHistoryRepository.findTopByOrderByUploadDateDesc();
    }

    // Helper method to safely parse doubles (in case of empty strings)
    private double parseDoubleSafe(String value) {
        if (value == null || value.isEmpty()) {
            return 0.0;
        }
        // Remove all commas before parsing
        String sanitizedValue = value.replaceAll(",", "");
        return Double.parseDouble(sanitizedValue);
    }

    public Map<String, Map<String, Double>> getMonthlySavingsAndSpending() {
        Map<String, Double> savingsMap = new TreeMap<>();
        Map<String, Double> spendingMap = new TreeMap<>();

        for (Transaction t : repository.findAll()) {
            if (t.getDate() == null) continue;

            Calendar cal = Calendar.getInstance();
            cal.setTime(t.getDate());
            String key = String.format("%d-%02d", cal.get(Calendar.YEAR), cal.get(Calendar.MONTH) + 1);

            double deposit = t.getDepositAmount() != null ? t.getDepositAmount() : 0.0;
            double withdraw = t.getWithdrawalAmount() != null ? t.getWithdrawalAmount() : 0.0;

            savingsMap.put(key, savingsMap.getOrDefault(key, 0.0) + (deposit - withdraw));
            spendingMap.put(key, spendingMap.getOrDefault(key, 0.0) + withdraw);
        }

        Map<String, Map<String, Double>> result = new TreeMap<>();
        for (String month : savingsMap.keySet()) {
            Map<String, Double> data = new HashMap<>();
            data.put("savings", savingsMap.get(month));
            data.put("spending", spendingMap.getOrDefault(month, 0.0));
            result.put(month, data);
        }

        return result;
    }

    public double getTotalSpending() {
        List<Transaction> transactions = repository.findAll();
        return transactions.stream()
                .mapToDouble(t -> t.getWithdrawalAmount() != null ? t.getWithdrawalAmount() : 0.0)
                .sum();
    }


}

