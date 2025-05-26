package com.example.login.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @GetMapping("/public/hello")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "¡Hola! Este es un endpoint público");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/protected/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> profile = new HashMap<>();
        
        // Extraer información del JWT
        profile.put("sub", jwt.getSubject());
        profile.put("email", jwt.getClaim("email"));
        profile.put("name", jwt.getClaim("name"));
        profile.put("picture", jwt.getClaim("picture"));
        profile.put("email_verified", jwt.getClaim("email_verified"));
        
        // Información adicional
        profile.put("iss", jwt.getIssuer());
        profile.put("aud", jwt.getAudience());
        profile.put("exp", jwt.getExpiresAt());
        profile.put("iat", jwt.getIssuedAt());
        
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/protected/user-info")
    public ResponseEntity<Map<String, Object>> getUserInfo(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> userInfo = new HashMap<>();
        
        userInfo.put("userId", jwt.getSubject());
        userInfo.put("email", jwt.getClaim("email"));
        userInfo.put("name", jwt.getClaim("name"));
        userInfo.put("isAuthenticated", true);
        
        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/protected/test")
    public ResponseEntity<Map<String, String>> testProtectedPost(@AuthenticationPrincipal Jwt jwt) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "¡POST exitoso en endpoint protegido!");
        response.put("user", jwt.getClaim("email"));
        return ResponseEntity.ok(response);
    }
}
