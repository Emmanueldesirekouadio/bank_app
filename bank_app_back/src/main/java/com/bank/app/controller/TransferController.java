package com.bank.app.controller;

import com.bank.app.dto.TransferRequest;
import com.bank.app.model.Transaction;
import com.bank.app.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TransferController {
    private final TransferService transferService;

    @PostMapping("/transfer")
    public ResponseEntity<Transaction> performTransfer(@RequestBody TransferRequest request) {
        try {
            Transaction transaction = transferService.performTransfer(
                request.getSenderAccountNumber(),
                request.getReceiverAccountNumber(),
                request.getAmount()
            );
            return ResponseEntity.ok(transaction);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 