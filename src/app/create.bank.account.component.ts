import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-create-bank-account',
    templateUrl: './create.bank.account.component.html'
})
export class CreateBankAccountComponent {

    bankAccount: any = {};

    constructor(public activeModal: NgbActiveModal) {}

    cancel() {
        this.activeModal.dismiss();
    }

    submit() {
        this.activeModal.close();
        console.log('creating account with overdraft limit ' + this.bankAccount.overdraftLimit);
    }

}
