import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private _sanitizer: DomSanitizer, ) {

    }

    public sanitizerHome1(home1: string) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(https://s3-eu-west-1.amazonaws.com/imagespgs/${home1}.jpg)`);
    }

    public sanitizerHome2(home2: string) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(https://s3-eu-west-1.amazonaws.com/imagespgs/${home2}.jpg)`);
    }

    public sanitizerHome3(home3: string) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(https://s3-eu-west-1.amazonaws.com/imagespgs/${home3}.jpg)`);
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.registerAuthenticationSuccess();

    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
