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
        try (InputStreamReader reader = new InputStreamReader(file.getInputStream())) {
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withTrim());

            SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yy", Locale.ENGLISH);

            for (CSVRecord record : csvParser) {
                Transaction transaction = new Transaction();

                transaction.setDate(sdf.parse(record.get("date")));
                transaction.setTransactionDescription(record.get("transactionDescription"));
                transaction.setChqRefNo(record.get("chqRefNo"));
                transaction.setValueDate(sdf.parse(record.get("valueDate")));
                transaction.setWithdrawalAmount(parseDoubleSafe(record.get("withdrawalAmount")));
                transaction.setDepositAmount(parseDoubleSafe(record.get("depositAmount")));
                transaction.setClosingBalance(parseDoubleSafe(record.get("closingBalance")));
                transaction.setCategory(record.get("category"));
                transaction.setSubCategory(record.get("subCategory"));
                transaction.setRemarks(record.get("remarks"));

                repository.save(transaction);
            }
            UploadHistory history = new UploadHistory(file.getOriginalFilename(), new Date());
            uploadHistoryRepository.save(history);
        }
    }
    
    public List<UploadHistory> getUploadHistory() {
        return uploadHistoryRepository.findAll();
    }

    public void deleteAll() {
        repository.deleteAll();
        uploadHistoryRepository.deleteAll();
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

}

