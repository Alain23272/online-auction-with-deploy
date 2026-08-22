package klu.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import klu.repo.TransactionRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionManage {

    @Autowired
    TransactionRepository TR;

    public String recordTransaction(Transaction t) {
        System.out.println("Recording transaction for: " + t.getBuyerEmail());
        t.setTransactionTime(LocalDateTime.now());
        try {
            TR.save(t);
            System.out.println("Transaction saved successfully");
            return "Transaction Recorded Successfully";
        } catch (Exception e) {
            System.out.println("Error saving transaction: " + e.getMessage());
            return "Error: " + e.getMessage();
        }
    }

    public List<Transaction> getUserTransactions(String email) {
        System.out.println("Fetching transactions for: " + email);
        List<Transaction> list = TR.findByBuyerEmail(email);
        System.out.println("Found " + list.size() + " transactions");
        return list;
    }

    public List<Transaction> getAllTransactions() {
        return TR.findAll();
    }
}
