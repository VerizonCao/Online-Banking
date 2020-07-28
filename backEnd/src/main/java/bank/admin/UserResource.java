package bank.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bank.domain.PrimaryTransaction;
import bank.domain.SavingsTransaction;
import bank.domain.User;
import bank.service.TransactionService;
import bank.service.UserService;

@RestController
@RequestMapping("/api")
@PreAuthorize("hasRole('ADMIN')")   //check role 是不是 admin
public class UserResource {

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    //get users
    @RequestMapping(value = "/user/all", method = RequestMethod.GET)
    public ResponseEntity<?> userList() {
        return new ResponseEntity<List<User>>(userService.findUserList(), HttpStatus.OK);
    }

    //get all saving account
    @RequestMapping(value = "/user/primary/transaction", method = RequestMethod.GET)
    public ResponseEntity<?> getPrimaryTransactionList(@RequestParam("username") String username) {
        return new ResponseEntity<List<PrimaryTransaction>>(transactionService.findPrimaryTransactionList(username), HttpStatus.OK);
    }

    //get all primary account
    @RequestMapping(value = "/user/savings/transaction", method = RequestMethod.GET)
    public ResponseEntity<?> getSavingsTransactionList(@RequestParam("username") String username) {
        return new ResponseEntity<List<SavingsTransaction>>(transactionService.findSavingsTransactionList(username), HttpStatus.OK);
    }

    @RequestMapping("/user/{username}/enable")
    public void enableUser(@PathVariable("username") String username) {
        userService.enableUser(username);
    }

    @RequestMapping("/user/{username}/disable")
    public void diableUser(@PathVariable("username") String username) {
        userService.disableUser(username);
    }
}
