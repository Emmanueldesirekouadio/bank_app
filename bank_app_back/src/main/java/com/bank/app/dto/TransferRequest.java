package com.bank.app.dto;

import lombok.Data;

@Data
public class TransferRequest {
    private String senderAccountNumber;
    private String receiverAccountNumber;
    private double amount;
} 