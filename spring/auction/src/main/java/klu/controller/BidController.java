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

import klu.model.Bid;
import klu.model.BidManager;

@RestController
@RequestMapping("/bid")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" , "*"})
public class BidController {

    @Autowired
    private BidManager bidManager;

    @PostMapping("/place")
    public String placeBid(@RequestBody Bid bid) {
        return bidManager.placeBid(bid);
    }

    @GetMapping("/getbids")
    public List<Bid> getBids(@RequestParam int productId) {
        return bidManager.getBidsForProduct(productId);
    }

    @GetMapping("/highest")
    public Bid getHighestBid(@RequestParam int productId) {
        return bidManager.getHighestBid(productId);
    }
}
