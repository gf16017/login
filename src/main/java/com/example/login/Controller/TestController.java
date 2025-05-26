package com.example.login.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/public/hello")
    public ResponseEntity<String> publicHello() {
        System.out.println("Public endpoint called");
        return ResponseEntity.ok("Hello from public endpoint!");
    }
    
    @GetMapping("/protected/profile")
    public ResponseEntity<String> protectedProfile() {
        System.out.println("Protected endpoint called");
        return ResponseEntity.ok("Hello from protected endpoint!");
    }
}
