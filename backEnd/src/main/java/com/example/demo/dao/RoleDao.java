package com.example.demo.dao;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.domain.security.Role;

public interface RoleDao extends CrudRepository<Role, Integer> {
    Role findByName(String name);
}
