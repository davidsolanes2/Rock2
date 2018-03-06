import { Component, OnInit, OnDestroy } from '@angular/core';

// import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Account, LoginModalService, Principal } from '../../shared';

import {Observable, Subscription} from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
// import { Observable } from 'rxjs/Rx';

import { Phome } from './phome.model';
import { PhomeService } from './phome.service';
import { Http, Response } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import {CollectionsService} from "../../entities/collections";
import {Collections} from "../../entities/collections/collections.model";


@Component({
    selector: 'jhi-phome',
    templateUrl: './phome.component.html',
    styleUrls: [
        'phome.css'
    ]
})
export class PhomeComponent implements OnInit, OnDestroy {

    phome: Phome = new Phome();

    currentAccount: any;
    eventSubscriber: Subscription;
    isSaving: Boolean;
    // routeData: any;
    links: any;
    // totalItems: any;
    // queryCount: any;
    // itemsPerPage: any;
    page: any;
    predicate: any;
    // previousPage: any;
    reverse: any;
    /**
     * Inicio control del usuario logeado
     */
    account: Account;
    modalRef: NgbModalRef;
    /**
     * Fin control del usuario logeado
     */

    DataTopTracks: any = [];
    DataSearch: any = [];
    search = '';

    constructor(
        private phomeService: PhomeService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private http: Http,
        private _sanitizer: DomSanitizer,
        private collectionsService: CollectionsService,

) {
    }

    loadAll() {
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

        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInPhomes();
        /**
         * Inicio control del usuario logeado
         */
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        /**
         * Fin control del usuario logeado
         */
        // this.http.get('api/topSongsNap/testInicial')
        this.http.get('http://api.napster.com/v2.2/tracks/top?apikey=MjM4OWE1MzQtNTUyMy00ODIzLWEyNTMtNDQ1MzFlN2ExYzll&limit=10&catalog=ES')
            .subscribe((res: Response) => {
                const data = res.json();
                this.DataTopTracks = data.tracks;
            });
    }

    ngOnDestroy() {

        this.eventManager.destroy(this.eventSubscriber);
    }
    registerChangeInPhomes() {
        this.eventSubscriber = this.eventManager.subscribe('phomeListModification', (response) => this.loadAll());
    }
    /**
     * Inicio control del usuario logeado
     */
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
    /**
     * Fin control del usuario logeado
     */
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    like(idNapster: string) {
        this.isSaving = true;
console.log(idNapster);
        this.subscribeToLikeResponse(
            this.collectionsService.like(idNapster));

    }

    private subscribeToLikeResponse(result: Observable<Collections>) {
        result.subscribe((res: Collections) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Collections) {
        this.eventManager.broadcast({ name: 'collectionsListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
