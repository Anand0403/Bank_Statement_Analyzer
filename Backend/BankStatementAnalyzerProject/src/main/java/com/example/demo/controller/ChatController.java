    package com.example.demo.controller;

    import com.example.demo.service.TransactionService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api/chat")
    @CrossOrigin(origins = "*")
    public class ChatController {

        @Autowired
        private TransactionService transactionService;

        @GetMapping("/ask")
        public String askQuestion(@RequestParam String question) {
            return transactionService.analyzeQuestion(question);
        }
    }
