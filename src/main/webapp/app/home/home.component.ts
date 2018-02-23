import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { Http, Response } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

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
    DataTopTracks: any = [];
    DataSearch: any = [];
    search = "";
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private http: Http,
        private _sanitizer: DomSanitizer
    ) {
    }

    public sanitizeImage(image: string) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(http://direct.rhapsody.com/imageserver/v2/albums/${image}/images/500x500.jpg)`);
    }

    public searchSong() {
        console.log(this.search);
            this.http.get(`http://api.napster.com/v2.2/search?apikey=MjM4OWE1MzQtNTUyMy00ODIzLWEyNTMtNDQ1MzFlN2ExYzll&query='${this.search}'&type=track&per_type_limit=5`)
                .subscribe((res: Response) => {
                    const data = res.json();
                    console.log(data.search.data.tracks);
                    this.DataSearch = data.search.data.tracks;
                });
        }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.http.get('http://api.napster.com/v2.2/tracks/top?apikey=MjM4OWE1MzQtNTUyMy00ODIzLWEyNTMtNDQ1MzFlN2ExYzll&limit=10&catalog=ES')
            .subscribe((res: Response) => {
                const data = res.json();
                this.DataTopTracks = data.tracks;
        });
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
