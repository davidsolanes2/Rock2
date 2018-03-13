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
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CollectionsService} from '../../entities/collections';
import {Collections} from '../../entities/collections';

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

    display = 'none';
    DataTopTracks: any = [];
    DataSearch: any = [];
    search = '';
    idYoutube = '';
    idNapster = '';
    video: SafeUrl;
    likeVacio = require('../../../content/images/heart-1.png');
    likeCompleto = require('../../../content/images/heart-2.png');
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

    openModal(nombre: string, artist: string) {
        this.video = this._sanitizer.bypassSecurityTrustResourceUrl(``);
        this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${artist}-${nombre}&type=video&maxResults=1&order=relevance&key=AIzaSyA9MBYmc8ESwDR5tpB4D-bkNhM4_RpAAvM`)
            .subscribe((res: Response) => {
                const data = res.json();
                this.idYoutube = data.items[0].id.videoId;
                this.video = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.idYoutube}?autoplay=1`);
                this.display = 'block';
            });
    }

    onCloseHandled() {
        this.display = 'none';
        this.video = this._sanitizer.bypassSecurityTrustResourceUrl(``);
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
        this.http.get('http://api.napster.com/v2.2/tracks/top?apikey=MjM4OWE1MzQtNTUyMy00ODIzLWEyNTMtNDQ1MzFlN2ExYzll&limit=10&catalog=ES&range=week')
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
        if (document.images[idNapster].alt === 'vacio') {
            this.idNapster = idNapster;
            this.subscribeToLikeResponse(
                this.collectionsService.like(idNapster));
        } else {
            document.images[idNapster].src = this.likeVacio;
            document.images[idNapster].alt = 'vacio';
        }
    }

    private subscribeToLikeResponse(result: Observable<Collections>) {
        console.log('Antes subscribe');
        result.subscribe((res: Collections) => {
                console.log('dentro subscribe. Antes de onsavesucces');
                this.onSaveSuccess(res), (res: Response) => this.onSaveError()
                console.log('dentro subscribe. Despues de onsavesucces');
            }
        );
    }

    private onSaveSuccess(result: Collections) {
        this.eventManager.broadcast({ name: 'collectionsListModification', content: 'OK'});
        this.isSaving = false;
        document.images[this.idNapster].src = this.likeCompleto;
        document.images[this.idNapster].alt = 'completo';
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
