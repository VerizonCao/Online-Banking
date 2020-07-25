package com.example.demo.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.dao.RoleDao;
import com.example.demo.domain.User;
import com.example.demo.domain.security.UserRole;
import com.example.demo.service.UserService;

@Controller
public class HomeController {
	
	@Autowired
	private UserService userService;

	@Autowired
    private RoleDao roleDao;

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<?> signupPost(@ModelAttribute("user") User user, Model model) {
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(new UserRole(user, roleDao.findByName("ROLE_USER")));
        User temp = userService.createUser(user, userRoles);
        return new ResponseEntity<User>(temp, HttpStatus.CREATED);   //a new User or the user by given name
    }

}
