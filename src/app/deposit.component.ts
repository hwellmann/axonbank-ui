import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StompService } from '@stomp/ng2-stompjs';

@Component({
    selector: 'app-deposit',
    templateUrl: './deposit.component.html'
})
export class DepositComponent {

    bankAccountId: string;

    deposit: any = {};

    constructor(public activeModal: NgbActiveModal, private stompService: StompService) {}

    cancel() {
        this.activeModal.dismiss();
    }

    submit() {
        this.activeModal.close();
        console.log(`depositing ${this.deposit.amount} into ${this.bankAccountId}`);
    }

}
