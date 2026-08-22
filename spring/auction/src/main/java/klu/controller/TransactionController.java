package klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import klu.model.Transaction;
import klu.model.TransactionManage;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" , "*"})
public class TransactionController {

    @Autowired
    TransactionManage TM;

    @PostMapping("/record")
    public String recordTransaction(@RequestBody Transaction t) {
        return TM.recordTransaction(t);
    }

    @GetMapping("/user")
    public List<Transaction> getUserTransactions(@RequestParam String email) {
        return TM.getUserTransactions(email);
    }

    @GetMapping("/all")
    public List<Transaction> getAllTransactions() {
        return TM.getAllTransactions();
    }
}
