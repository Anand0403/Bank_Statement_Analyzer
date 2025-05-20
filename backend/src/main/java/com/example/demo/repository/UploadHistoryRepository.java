package com.example.demo.repository;

import com.example.demo.model.UploadHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadHistoryRepository extends JpaRepository<UploadHistory, Long> {
    UploadHistory findTopByOrderByUploadDateDesc();
}
