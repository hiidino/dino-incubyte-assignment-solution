package com.incubyte.sweetshop.controller;

import com.incubyte.sweetshop.model.User;
import com.incubyte.sweetshop.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private com.incubyte.sweetshop.repository.UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String role = body.get("role");
        User user = authService.register(username, password, role);
        return ResponseEntity.ok(Map.of("id", user.getId(), "username", user.getUsername()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String token = authService.login(username, password);
        String role = userRepository.findByUsername(username).map(u -> u.getRole()).orElse("ROLE_USER");
        return ResponseEntity.ok(Map.of("token", token, "role", role));
    }
}
