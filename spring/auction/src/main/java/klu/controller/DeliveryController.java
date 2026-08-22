package klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import klu.model.Delivery;
import klu.model.DeliveryManager;

@RestController
@RequestMapping("/delivery")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" , "*"})
public class DeliveryController {

    @Autowired
    DeliveryManager DM;

    @PostMapping("/create")
    public String createDelivery(@RequestBody Delivery d) {
        return DM.createDelivery(d);
    }

    @GetMapping("/all")
    public List<Delivery> getAllDeliveries() {
        return DM.getAllDeliveries();
    }

    @GetMapping("/{id}")
    public Delivery getDeliveryById(@PathVariable int id) {
        return DM.getDeliveryById(id);
    }

    @PostMapping("/updatestatus")
    public String updateStatus(@RequestParam int id, @RequestParam String status) {
        return DM.updateDeliveryStatus(id, status);
    }
}
