package com.example.demo.controller;


import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.demo.domain.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public ResponseEntity<?> profile(Principal principal, Model model) {
        User user = userService.findByUsername(principal.getName());
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }



}

