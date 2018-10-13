import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { AppComponent } from './app.component';
import { BankAccountsComponent } from './bank.accounts.component';
import { CreateBankAccountComponent } from './create.bank.account.component';
import { DepositComponent } from './deposit.component';
import { WithdrawalComponent } from './withdrawal.component';
import { TransferComponent } from './transfer.component';


const stompConfig: StompConfig = {
    // Which server?
    url: 'ws://127.0.0.1:8080/stomp',

    // Headersimport { HttpClientModule } from '@angular/common/http';

    // Typical keys: login, passcode, host
    headers: {
        login: 'stomp',
        passcode: 'stomp'
    },

    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeat_in: 0, // Typical value 0 - disabled
    heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 5000 (5 seconds)
    reconnect_delay: 5000,

    // Will log diagnostics on console
    debug: true
};


@NgModule({
    declarations: [
        AppComponent,
        BankAccountsComponent,
        CreateBankAccountComponent,
        DepositComponent,
        TransferComponent,
        WithdrawalComponent
    ],
    entryComponents: [
        CreateBankAccountComponent,
        DepositComponent,
        TransferComponent,
        WithdrawalComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModalModule
    ],
    providers: [
        StompService,
        {
            provide: StompConfig,
            useValue: stompConfig
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
