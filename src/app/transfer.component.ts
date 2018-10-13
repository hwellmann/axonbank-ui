import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StompService } from '@stomp/ng2-stompjs';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html'
})
export class TransferComponent {

    bankTransfer: any = {};
    bankAccounts: any[] = [];

    constructor(public activeModal: NgbActiveModal, private stompService: StompService) {}

    cancel() {
        this.activeModal.dismiss();
    }

    submit() {
        this.activeModal.close();
        console.log(`transferring ${this.bankTransfer.amount} from ` +
            `${this.bankTransfer.sourceBankAccountId} to ${this.bankTransfer.destinationBankAccountId}`);
        this.stompService.publish('jms.queue.bank-transfers.create', JSON.stringify(this.bankTransfer));
    }

    destinationAccounts() {
        return this.bankAccounts.filter(account =>
            (account.axonBankAccountId !== this.bankTransfer.sourceBankAccountId));
    }

}
