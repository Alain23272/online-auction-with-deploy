package klu.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import klu.model.Product;
import klu.model.ProductManager;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000" , "*"})
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    
    @Autowired
    private ProductManager PM;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String addProduct(@RequestPart("product") String productJson, @RequestPart(value = "image", required = false) MultipartFile file) {
        try {
            Product product = objectMapper.readValue(productJson, Product.class);
            if (file != null && !file.isEmpty()) {
                product.setImage(file.getBytes());
                product.setImageContentType(file.getContentType());
            }
            return PM.addProduct(product);
        } catch (Exception e) {
            logger.error("Error adding product", e);
            return "500::Error adding product: " + e.getMessage();
        }
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return PM.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable("id") int id) {
        return PM.getProductById(id);
    }

    @GetMapping("/seller/{email}")
    public List<Product> getProductsBySeller(@PathVariable("email") String email) {
        return PM.getProductsBySeller(email);
    }

    @PutMapping("/update")
    public String updateProduct(@RequestBody Product product) {
        return PM.updateProduct(product);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable("id") int id) {
        return PM.deleteProduct(id);
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getProductImage(@PathVariable int id) {
        Product product = PM.getProductById(id);
        if (product != null && product.getImage() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(product.getImageContentType()))
                    .body(product.getImage());
        }
        return ResponseEntity.notFound().build();
    }
}