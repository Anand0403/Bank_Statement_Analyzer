package com.example.demo.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class UploadHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String fileName;
	
	private Date uploadDate;
	
	public UploadHistory() {}
	
	public UploadHistory(String fileName, Date uploadDate) {
		this.fileName = fileName;
		this.uploadDate = uploadDate;
	}

	public long getId() {
		return id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Date getUploadDate() {
		return uploadDate;
	}

	public void setUploadDate(Date uploadDate) {
		this.uploadDate = uploadDate;
	}
	
	
}
