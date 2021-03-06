package bank.controller;

import java.security.Principal;
import java.util.List;

import bank.service.AccountService;
import bank.service.TransactionService;
import bank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import bank.domain.PrimaryAccount;
import bank.domain.PrimaryTransaction;
import bank.domain.SavingsAccount;
import bank.domain.SavingsTransaction;
import bank.domain.User;

@Controller
@RequestMapping("/account")
public class AccountController {
	
	@Autowired
    private UserService userService;
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private TransactionService transactionService;
	
	@RequestMapping("/primaryAccount")
	public ResponseEntity<?> primaryAccount(Principal principal) {

	    //找到transaction 的list
		List<PrimaryTransaction> primaryTransactionList = transactionService.findPrimaryTransactionList(principal.getName());
		//找到user
		User user = userService.findByUsername(principal.getName());
		//得到account
        PrimaryAccount primaryAccount = user.getPrimaryAccount();
        //我们应该做的是返回一个 primary account
		return new ResponseEntity<PrimaryAccount>(primaryAccount, HttpStatus.CREATED);

	}

	@RequestMapping("/savingsAccount")
    public ResponseEntity<?> savingsAccount(Principal principal) {
		List<SavingsTransaction> savingsTransactionList = transactionService.findSavingsTransactionList(principal.getName());
        User user = userService.findByUsername(principal.getName());
        SavingsAccount savingsAccount = user.getSavingsAccount();
        return new ResponseEntity<SavingsAccount>(savingsAccount, HttpStatus.CREATED);
    }



    @RequestMapping(value = "/deposit/primary", method = RequestMethod.POST)
    public void depositPrimaryPOST(@RequestParam(value = "amount") String amount, Principal principal) {
        accountService.deposit("Primary", Double.parseDouble(amount), principal);
    }

    @RequestMapping(value = "/deposit/saving", method = RequestMethod.POST)
    public void depositSavingPOST(@RequestParam(value = "amount") String amount, Principal principal) {
        accountService.deposit("Savings", Double.parseDouble(amount), principal);
    }

    @RequestMapping(value = "/withdraw/primary", method = RequestMethod.POST)
    public void withdrawPrimaryPOST(@RequestParam(value = "amount") String amount, Principal principal) {
        accountService.withdraw("Primary", Double.parseDouble(amount), principal);
    }

    @RequestMapping(value = "/withdraw/saving", method = RequestMethod.POST)
    public void withdrawSavingPOST(@RequestParam(value = "amount") String amount, Principal principal) {
        accountService.withdraw("Savings", Double.parseDouble(amount), principal);
    }

}
