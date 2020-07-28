package bank.admin;

import java.util.List;

import bank.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bank.service.AppointmentService;
import bank.domain.Appointment;

@RestController
@RequestMapping("/api/appointment")
@PreAuthorize("hasRole('ADMIN')")
public class AppointmentResource {

    @Autowired
    private AppointmentService appointmentService;

    //get all appointment
    @RequestMapping("/all")
    public ResponseEntity<?> findAppointmentList() {
        List<Appointment> appointmentList = appointmentService.findAll();
        return new ResponseEntity<List<Appointment>>(appointmentList, HttpStatus.OK);
    }
    //confirm the appointment
    @RequestMapping("/{id}/confirm")
    public void confirmAppointment(@PathVariable("id") Long id) {
        appointmentService.confirmAppointment(id);
    }
}
