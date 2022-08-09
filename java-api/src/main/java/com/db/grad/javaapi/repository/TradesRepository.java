package com.db.grad.javaapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.db.grad.javaapi.model.Trades;

@Repository
public interface TradesRepository extends JpaRepository<Trades, Long>{

}