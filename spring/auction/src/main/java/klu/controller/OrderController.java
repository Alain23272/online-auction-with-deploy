package klu.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import klu.model.Order;
import klu.model.OrderManager;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" , "*"})
public class OrderController {

    @Autowired
    OrderManager OM;

    @PostMapping("/place")
    public String placeOrder(@RequestBody Order O) {
        return OM.placeOrder(O);
    }

    @PostMapping("/getbyuser")
    public List<Order> getOrdersByUser(@RequestBody Map<String, String> data) {
        return OM.getOrdersByUser(data.get("email"));
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return OM.getAllOrders();
    }
}

