package klu.model;

import java.time.LocalDateTime;
import java.util.List;
import klu.model.Transaction;
import klu.model.TransactionManage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import klu.repo.OrderRepository;

@Service
public class OrderManager {

    @Autowired
    OrderRepository OR;
    @Autowired
    TransactionManage TM;
    @Autowired
    WalletManager WM;

    public String placeOrder(Order O) {
        String walletResponse = WM.deductBalance(O.getBuyerEmail(), O.getAmount());
        if (!walletResponse.startsWith("200::")) {
            return walletResponse;
        }

        O.setOrderDate(LocalDateTime.now());
        OR.save(O);

        Transaction t = new Transaction();
        t.setBuyerEmail(O.getBuyerEmail());
        t.setProductId(O.getProductId());
        t.setAmount(O.getAmount());
        TM.recordTransaction(t);

        return "200::" + O.getId();
    }

    public List<Order> getOrdersByUser(String email) {
        return OR.findByBuyerEmail(email);
    }

    public List<Order> getAllOrders() {
        return OR.findAll();
    }
}
