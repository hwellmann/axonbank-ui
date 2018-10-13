import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-bank-transfers',
    templateUrl: './bank.transfers.component.html'
})
export class BankTransfersComponent implements OnInit {
    bankTransfers: BankTransfer[] = [];
    bankAccountId: string;


    constructor(public activeModal: NgbActiveModal, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.http.get<Array<BankTransfer>>(`http://localhost:8080/api/bank-transfers/bank-account/${this.bankAccountId}`).toPromise()
            .then(result => this.bankTransfers = result);
    }

    cancel() {
        this.activeModal.dismiss();
    }
}
