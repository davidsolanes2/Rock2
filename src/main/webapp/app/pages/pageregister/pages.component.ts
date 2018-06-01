import { Component, OnInit, OnDestroy } from '@angular/core';
// import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
// import { Observable, Subscription } from 'rxjs/Rx';

import { Pages } from './pages.model';
import { PagesService } from './pages.service';
import {LoginModalService, Principal} from '../../shared';
import {Http, Response} from '@angular/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Collections, CollectionsService} from '../../entities/collections';

@Component({
    selector: 'jhi-pages',
    templateUrl: './pages.component.html',
    styleUrls: [
        'pageregister.css'
    ]

})
export class PagesComponent implements OnInit, OnDestroy {

    pages: Pages = new Pages();
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
    display = 'none';
    // displayMain = 'none';
    // displayCountry = 'block';
    // displayTitle = 'block';
    displayTitleBuscador = 'none';
    displayMas = 'none';
    DataTopTracks: any = [];
    DataSearch: any = [];
    // DataTopTracksID: any = [];
    DataLiked: any = [];
    search = '';
    idYoutube = '';
    idNapster = '';
    video: SafeUrl;
    likeVacio = require('../../../content/images/heart-1.png');
    likeCompleto = require('../../../content/images/heart-2.png');

    constructor (
        private pagesService: PagesService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private http: Http,
        private _sanitizer: DomSanitizer,
        private collectionsService: CollectionsService) {
    }

    loadAll() {
    }

    public sanitizeImage(image: string) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(http://direct.rhapsody.com/imageserver/v2/albums/${image}/images/500x500.jpg)`);
    }

    public isLiked(id: string): boolean {
        for (let i = 0; i < this.DataLiked.length; i++) {
            if (this.DataLiked[i].napsterId === (id)) {
                console.log(this.DataLiked[i].napsterId);
                return true;
            }
        }
        return false;
    }

    public searchSong() {
        console.log(this.search);
        this.http.get(`http://api.napster.com/v2.2/search?apikey=MjM4OWE1MzQtNTUyMy00ODIzLWEyNTMtNDQ1MzFlN2ExYzll&query='${this.search}'&type=track&per_type_limit=8`)
            .subscribe((res: Response) => {
                this.displayTitleBuscador = 'block';
                const data = res.json();
                this.DataSearch = data.search.data.tracks;
                this.displayMas = 'block';
            });
    }

    openModal(nombre: string, artist: string) {
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

        this.registerChangeInPages();
    }

    ngOnDestroy() {

        this.eventManager.destroy(this.eventSubscriber);
    }
    registerChangeInPages() {
        this.eventSubscriber = this.eventManager.subscribe('pagesListModification', (response) => this.loadAll());
    }

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

    dislike(idNapster: string) {
        this.isSaving = true;
        if (document.images[idNapster].alt === 'completo') {
            this.idNapster = idNapster;
            this.subscribeToDislikeResponse(
                this.collectionsService.dislike(idNapster));
        } else {
            document.images[idNapster].src = this.likeVacio;
            document.images[idNapster].alt = 'vacio';
        }

    }

    private subscribeToLikeResponse(result: Observable<Collections>) {
        console.log('Antes subscribe');
        result.subscribe((res: Collections) => {
                this.onSaveSuccessLike(res), (res: Response) => this.onSaveError()
            }
        );
    }

    private subscribeToDislikeResponse(result: Observable<Response>) {
        console.log('Antes subscribe Dislike');
        result.subscribe((res: Response) => {
                this.onSaveSuccessDislike(res), (res: Response) => this.onSaveError()
            }
        );
    }

    private onSaveSuccessLike(result: Collections) {
        this.eventManager.broadcast({name: 'SongAdd', content: 'OK'});
        this.isSaving = false;
        document.images[this.idNapster].src = this.likeCompleto;
        document.images[this.idNapster].alt = 'completo';
        document.images[this.idNapster].setAttribute('(click)', `dislike('${this.idNapster}')`);
    }

    private onSaveSuccessDislike(result: Response) {
        this.eventManager.broadcast({name: 'SongDelete', content: 'OK'});
        this.isSaving = false;
        document.images[this.idNapster].src = this.likeVacio;
        document.images[this.idNapster].alt = 'vacio';
        document.images[this.idNapster].setAttribute('(click)', `like('${this.idNapster}')`);
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
