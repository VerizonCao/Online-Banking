package bank.controller;


import java.security.Principal;
import java.text.ParseException;
import java.util.List;

import bank.domain.Appointment;
import bank.domain.User;
import bank.service.AppointmentService;
import bank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/findAll",method = RequestMethod.GET)
    public ResponseEntity<?> getAppointments() {
        List<Appointment> list =  appointmentService.findAll();
        return new ResponseEntity<List<Appointment>>(list, HttpStatus.OK);
    }

    @RequestMapping(value = "/find/{id}",method = RequestMethod.GET)
    public ResponseEntity<?> getAppointment(@PathVariable String id) {
        Appointment temp =  appointmentService.findAppointment(Long.parseLong(id));
        return new ResponseEntity<Appointment>(temp, HttpStatus.OK);
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public ResponseEntity<?> createAppointmentPost(@RequestBody Appointment appointment, Principal principal) throws ParseException {
        User user = userService.findByUsername(principal.getName());
        appointment.setUser(user);
        Appointment temp = appointmentService.saveAppointment(appointment);
        return new ResponseEntity<Appointment>(temp, HttpStatus.OK);
    }


}
