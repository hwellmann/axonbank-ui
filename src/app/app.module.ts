import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';

import { AppComponent } from './app.component';
import { BankAccountsComponent } from './bank.accounts.component';
import { CommonModule } from '@angular/common';
import { CreateBankAccountComponent } from './create.bank.account.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DepositComponent } from './deposit.component';

const stompConfig: StompConfig = {
    // Which server?
    url: 'ws://127.0.0.1:8080/stomp',

    // Headers
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
        DepositComponent
    ],
    entryComponents: [
        CreateBankAccountComponent,
        DepositComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
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
