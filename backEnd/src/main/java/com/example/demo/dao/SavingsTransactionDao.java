package com.example.demo.dao;


import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.domain.SavingsTransaction;

public interface SavingsTransactionDao extends CrudRepository<SavingsTransaction, Long> {

    List<SavingsTransaction> findAll();
}

