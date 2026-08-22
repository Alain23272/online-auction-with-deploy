package klu.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import klu.model.AnalyticsManager;

@RestController
@RequestMapping("/admin/analytics")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" , "*"})
public class AnalyticsController {

    @Autowired
    private AnalyticsManager analyticsManager;

    @GetMapping("/summary")
    public Map<String, Object> getDashboardSummary() {
        return analyticsManager.getDashboardSummary();
    }
}
