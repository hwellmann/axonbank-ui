import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StompService } from '@stomp/ng2-stompjs';

@Component({
    selector: 'app-deposit',
    templateUrl: './deposit.component.html'
})
export class DepositComponent {

    deposit: Deposit = { bankAccountId: '', amount: 0};

    constructor(public activeModal: NgbActiveModal, private stompService: StompService) {}

    cancel() {
        this.activeModal.dismiss();
    }

    submit() {
        this.activeModal.close();
        console.log(`depositing ${this.deposit.amount} into ${this.deposit.bankAccountId}`);
        this.stompService.publish('jms.queue.bank-accounts.deposit', JSON.stringify(this.deposit));
    }

}
