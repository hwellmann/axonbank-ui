import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBankAccountComponent } from './create.bank.account.component';
import { DepositComponent } from './deposit.component';
import { Subscription, Observable } from 'rxjs';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

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

    constructor(private modalService: NgbModal, private stompService: StompService) {
        console.log('constructed BankAccountsComponent');
    }

    ngOnInit(): void {
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
