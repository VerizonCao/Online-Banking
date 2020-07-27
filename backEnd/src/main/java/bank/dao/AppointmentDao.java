package bank.dao;

import java.util.List;

import bank.domain.Appointment;
import org.springframework.data.repository.CrudRepository;

public interface AppointmentDao extends CrudRepository<Appointment, Long> {

    List<Appointment> findAll();

    Appointment  findByid(Long id);
}
