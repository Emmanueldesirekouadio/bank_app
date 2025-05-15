package com.bank.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String accountNumber;
    
    private double balance;
    
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
} 