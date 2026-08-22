package klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import klu.model.Category;
import klu.model.CategoryManager;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" , "*"})
public class CategoryController {

    @Autowired
    private CategoryManager CM;

    @PostMapping("/add")
    public String addCategory(@RequestBody Category C) {
        return CM.addCategory(C);
    }

    @PutMapping("/update")
    public String updateCategory(@RequestBody Category C) {
        return CM.updateCategory(C);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCategory(@PathVariable("id") int id) {
        return CM.deleteCategory(id);
    }

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return CM.getAllCategories();
    }
}
