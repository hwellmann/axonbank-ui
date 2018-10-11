import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StompService } from '@stomp/ng2-stompjs';

@Component({
    selector: 'app-create-bank-account',
    templateUrl: './create.bank.account.component.html'
})
export class CreateBankAccountComponent {

    bankAccount: any = {};

    constructor(public activeModal: NgbActiveModal, private stompService: StompService) {}

    cancel() {
        this.activeModal.dismiss();
    }

    submit() {
        this.activeModal.close();
        console.log('creating account with overdraft limit ' + this.bankAccount.overdraftLimit);
        this.stompService.publish('jms.queue.bank-accounts.create', JSON.stringify(this.bankAccount));
    }

}
