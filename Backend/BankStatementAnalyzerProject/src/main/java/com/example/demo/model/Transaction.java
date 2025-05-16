
package com.example.demo.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date date;
    private String transactionDescription;
    private String chqRefNo;

    @Temporal(TemporalType.DATE)
    private Date valueDate;

    private Double withdrawalAmount;
    private Double depositAmount;
    private Double closingBalance;
    private String category;
    private String subCategory;
    private String remarks;
    
    private String uploadId;

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getTransactionDescription() { return transactionDescription; }
    public void setTransactionDescription(String transactionDescription) { this.transactionDescription = transactionDescription; }

    public String getChqRefNo() { return chqRefNo; }
    public void setChqRefNo(String chqRefNo) { this.chqRefNo = chqRefNo; }

    public Date getValueDate() { return valueDate; }
    public void setValueDate(Date valueDate) { this.valueDate = valueDate; }

    public Double getWithdrawalAmount() { return withdrawalAmount; }
    public void setWithdrawalAmount(Double withdrawalAmount) { this.withdrawalAmount = withdrawalAmount; }

    public Double getDepositAmount() { return depositAmount; }
    public void setDepositAmount(Double depositAmount) { this.depositAmount = depositAmount; }

    public Double getClosingBalance() { return closingBalance; }
    public void setClosingBalance(Double closingBalance) { this.closingBalance = closingBalance; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
    
	public String getUploadId() {
		return uploadId;
	}
	public void setUploadId(String uploadId) {
		this.uploadId = uploadId;
	}
}