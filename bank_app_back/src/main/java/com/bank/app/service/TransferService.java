package com.bank.app.service;

import com.bank.app.model.Account;
import com.bank.app.model.Transaction;
import com.bank.app.repository.AccountRepository;
import com.bank.app.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransferService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    @Transactional
    public Transaction performTransfer(String senderAccountNumber, String receiverAccountNumber, double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Le montant doit être supérieur à 0");
        }

        Account sender = accountRepository.findByAccountNumber(senderAccountNumber)
            .orElseThrow(() -> new IllegalArgumentException("Compte expéditeur non trouvé"));
        
        Account receiver = accountRepository.findByAccountNumber(receiverAccountNumber)
            .orElseThrow(() -> new IllegalArgumentException("Compte destinataire non trouvé"));

        if (sender.getBalance() < amount) {
            throw new IllegalArgumentException("Solde insuffisant");
        }

        // Mise à jour des soldes
        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        // Création de la transaction
        Transaction transaction = new Transaction();
        transaction.setSender(sender);
        transaction.setReceiver(receiver);
        transaction.setAmount(amount);

        // Sauvegarde
        accountRepository.save(sender);
        accountRepository.save(receiver);
        return transactionRepository.save(transaction);
    }
} 