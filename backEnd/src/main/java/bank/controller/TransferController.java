package bank.controller;

import java.security.Principal;
import java.util.List;

import bank.domain.PrimaryAccount;
import bank.domain.Recipient;
import bank.domain.SavingsAccount;
import bank.domain.User;
import bank.service.TransactionService;
import bank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/transfer")
public class TransferController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;


    //transfer money from primary to saving
    @RequestMapping(value = "/primaryToSavings", method = RequestMethod.POST)
    public void primaryToSaving(Principal principal, @RequestParam(value = "amount") String amount) throws Exception {
        User user = userService.findByUsername(principal.getName());
        PrimaryAccount primaryAccount = user.getPrimaryAccount();
        SavingsAccount savingsAccount = user.getSavingsAccount();
        transactionService.primaryToSaving(amount, primaryAccount, savingsAccount);
    }

    @RequestMapping(value = "/savingToPrimary", method = RequestMethod.POST)
    public void savingToPrimary(Principal principal, @RequestParam(value = "amount") String amount) throws Exception {
        User user = userService.findByUsername(principal.getName());
        PrimaryAccount primaryAccount = user.getPrimaryAccount();
        SavingsAccount savingsAccount = user.getSavingsAccount();
        transactionService.savingToPrimary(amount, primaryAccount, savingsAccount);
    }

    //get all recipients
    @RequestMapping(value = "/recipients", method = RequestMethod.GET)
    public ResponseEntity<?> getRecipients(Principal principal) {
        List<Recipient> recipientList = transactionService.findRecipientList(principal);
        return new ResponseEntity<List<Recipient>>(recipientList, HttpStatus.OK);
    }

    @RequestMapping(value = "/recipient", method = RequestMethod.GET)
    public ResponseEntity<?> getRecipient(@RequestParam(value = "name") String name) {
        Recipient temp = transactionService.findRecipientByName(name);
        return new ResponseEntity<Recipient>(temp, HttpStatus.OK);
    }

    @RequestMapping(value = "/recipient/save", method = RequestMethod.POST)
    public ResponseEntity<?> recipientPost(@RequestBody Recipient recipient, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        recipient.setUser(user);
        Recipient temp = transactionService.saveRecipient(recipient);
        return new ResponseEntity<Recipient>(temp, HttpStatus.CREATED);
    }

    //patch or post   change recipient by name
    @RequestMapping(value = "/recipient/edit", method = RequestMethod.POST)
    public void recipientEdit(@RequestBody Recipient recipient, @RequestParam(value = "name") String name, Principal principal){
        Recipient temp = transactionService.findRecipientByName(name);
        temp = recipient;
        transactionService.saveRecipient(temp);
    }

    @RequestMapping(value = "/recipient/delete", method = RequestMethod.DELETE)
    public void recipientDelete(@RequestBody String recipientName){
        transactionService.deleteRecipientByName(recipientName);
    }

//    @RequestMapping(value = "/toSomeoneElse",method = RequestMethod.POST)
////    public void toSomeoneElsePost(JSONObject jsonObject, Principal principal) {
////        String recipientName = jsonObject.getString("recipientName");
////        String accountType = jsonObject.getString("accountType");
////        String amount = jsonObject.getString("amount");
////
////        User user = userService.findByUsername(principal.getName());
////        Recipient recipient = transactionService.findRecipientByName(recipientName);
////        transactionService.toSomeoneElseTransfer(recipient, accountType, amount, user.getPrimaryAccount(), user.getSavingsAccount());
////    }

    @RequestMapping(value = "/toSomeoneElse",method = RequestMethod.POST)
    public void toSomeoneElsePost(@RequestParam(value = "recipientName") String recipientName,
                                  @RequestParam(value = "accountType") String accountType,
                                  @RequestParam(value = "amount") String amount,
                                  Principal principal) {
        User user = userService.findByUsername(principal.getName());
        Recipient recipient = transactionService.findRecipientByName(recipientName);
        transactionService.toSomeoneElseTransfer(recipient, accountType, amount, user.getPrimaryAccount(), user.getSavingsAccount());
    }
}
