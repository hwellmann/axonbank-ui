import { Component, NgModuleRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBankAccountComponent } from './create.bank.account.component';
import { DepositComponent } from './deposit.component';

@Component({
    selector: 'app-bank-accounts',
    templateUrl: './bank.accounts.component.html',
    styleUrls: ['./bank.accounts.component.css']
})
export class BankAccountsComponent {

    bankAccounts: any[] = [
        { axonBankAccountId: '4711', balance: 10000, overdraftLimit: 0 },
        { axonBankAccountId: '4712', balance: 12000, overdraftLimit: 1000 }
    ];

    constructor(private modalService: NgbModal) {}

    createAccount() {
        this.modalService.open(CreateBankAccountComponent);
    }

    deposit(bankAccountId: string) {
        console.log('deposit into ' + bankAccountId);
        const modalRef = this.modalService.open(DepositComponent);
        modalRef.componentInstance.bankAccountId = bankAccountId;
    }

    withdraw(bankAccountId: string) {
        console.log('withdraw from ' + bankAccountId);
    }

    transfer(bankAccountId: string) {
        console.log('transfer from ' + bankAccountId);
    }

    bankTransfers(bankAccountId: string) {
        console.log('show transfers from ' + bankAccountId);
    }
}
