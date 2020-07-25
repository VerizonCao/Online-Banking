package com.example.demo.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.domain.Appointment;

public interface AppointmentDao extends CrudRepository<Appointment, Long> {

    List<Appointment> findAll();

    Appointment  findByid(Long id);
}
