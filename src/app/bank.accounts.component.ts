import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBankAccountComponent } from './create.bank.account.component';
import { DepositComponent } from './deposit.component';
import { Subscription, Observable } from 'rxjs';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { WithdrawalComponent } from './withdrawal.component';
import { TransferComponent } from './transfer.component';
import { BankTransfersComponent } from './bank.transfers.component';

@Component({
    selector: 'app-bank-accounts',
    templateUrl: './bank.accounts.component.html',
    styleUrls: ['./bank.accounts.component.css']
})
export class BankAccountsComponent implements OnInit, OnDestroy {
    bankAccounts: any[] = [];

    private subscription: Subscription;
    private subscribed: boolean;
    private messages: Observable<Message>;
    private topic = 'jms.topic.bankAccountsUpdates';

    constructor(private modalService: NgbModal, private stompService: StompService, private http: HttpClient) {
        console.log('constructed BankAccountsComponent');
    }

    ngOnInit(): void {
        this.http.get<Array<any>>('http://localhost:8080/api/bank-accounts').toPromise()
            .then(result => this.bankAccounts = result);

            this.subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    createAccount() {
        this.modalService.open(CreateBankAccountComponent);
    }

    deposit(bankAccountId: string) {
        console.log('deposit into ' + bankAccountId);
        const modalRef = this.modalService.open(DepositComponent);
        modalRef.componentInstance.deposit.bankAccountId = bankAccountId;
    }

    withdraw(bankAccountId: string) {
        console.log('withdraw from ' + bankAccountId);
        const modalRef = this.modalService.open(WithdrawalComponent);
        modalRef.componentInstance.withdrawal.bankAccountId = bankAccountId;
    }

    transfer(bankAccountId: string) {
        console.log('transfer from ' + bankAccountId);
        const modalRef = this.modalService.open(TransferComponent);
        modalRef.componentInstance.bankTransfer.sourceBankAccountId = bankAccountId;
        modalRef.componentInstance.bankAccounts = this.bankAccounts;
    }

    bankTransfers(bankAccountId: string) {
        console.log('show transfers from ' + bankAccountId);
        const modalRef = this.modalService.open(BankTransfersComponent, { size: 'lg' });
        modalRef.componentInstance.bankAccountId = bankAccountId;
    }

    subscribe() {
        if (this.subscribed) {
            return;
        }

        // Stream of messages
        this.messages = this.stompService.subscribe(this.topic);

        // Subscribe a function to be run on_next message
        this.subscription = this.messages.subscribe(this.on_next);
        this.subscribed = true;
        console.log(`subscribed to ${this.topic}`);
    }

    on_next = (message: Message) => {

        console.log(message.body);
        this.bankAccounts = JSON.parse(message.body);
    }

    unsubscribe() {
        if (!this.subscribed) {
            return;
        }

        this.subscription.unsubscribe();
        this.subscription = null;
        this.messages = null;

        this.subscribed = false;
    }
}
