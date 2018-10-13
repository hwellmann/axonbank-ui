import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StompService } from '@stomp/ng2-stompjs';

@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html'
})
export class WithdrawalComponent {

    withdrawal: any = {};

    constructor(public activeModal: NgbActiveModal, private stompService: StompService) {}

    cancel() {
        this.activeModal.dismiss();
    }

    submit() {
        this.activeModal.close();
        console.log(`withdrawing ${this.withdrawal.amount} from ${this.withdrawal.bankAccountId}`);
        this.stompService.publish('jms.queue.bank-accounts.withdraw', JSON.stringify(this.withdrawal));
    }

}
