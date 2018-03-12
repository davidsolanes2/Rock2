import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';

import { Pages } from './pages.model';
import { PagesService } from './pages.service';
import {Principal, ResponseWrapper} from '../../shared';
import {Http, Response} from '@angular/http';
import {Collections} from '../../entities/collections';
import {CollectionsService} from '../../entities/collections';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
    selector: 'jhi-pages',
    templateUrl: './pages.component.html',
    styleUrls: [
        'pages.css'
    ]
})
export class PagesComponent implements OnInit, OnDestroy {

    collections: Collections;
    Coleccion : Collections[];
    Favoritos : any = [];
    pages: Pages = new Pages();
    video: SafeUrl;
    iframe = document.getElementById("myFrame") as HTMLIFrameElement;
    display = 'none';
    idYoutube = '';
    currentAccount: any;
    eventSubscriber: Subscription;
    isSaving: Boolean;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private pagesService: PagesService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private collectionsService: CollectionsService,
        private http: Http,
        private _sanitizer: DomSanitizer,
    ) {
    }
    public sanitizeImage(image: string) {
        return this._sanitizer.bypassSecurityTrustStyle(`url(http://direct.rhapsody.com/imageserver/v2/albums/${image}/images/500x500.jpg)`);
    }
    loadAll() {
        this.collectionsService.listar().subscribe(
            (res: ResponseWrapper) => {
                this.Coleccion = res.json;
                for (let i=0; i < this.Coleccion.length; i++){
                    console.log(this.Coleccion[i].napsterId);
                    //Consulta en cada vuelta los datos de las canciones
                    this.http.get(`http://api.napster.com/v2.2/tracks/${this.Coleccion[i].napsterId}?apikey=MjM4OWE1MzQtNTUyMy00ODIzLWEyNTMtNDQ1MzFlN2ExYzll`)
                        .subscribe((res: Response) => {
                            const data = res.json();
                            console.log(data.tracks);
                            this.Favoritos.push(data.tracks);
                        });
                }
                //console.log(this.Favoritos);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    openModal(nombre:string, artist:string){
        this.video = this._sanitizer.bypassSecurityTrustResourceUrl(``);
        this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${nombre}-${artist}&type=video&maxResults=1&order=relevance&key=AIzaSyA9MBYmc8ESwDR5tpB4D-bkNhM4_RpAAvM`)
            .subscribe((res: Response) => {
                const data = res.json();
                this.idYoutube = data.items[0].id.videoId;
                this.video = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.idYoutube}?autoplay=1`);
                this.display="block";
            });
    }
    onCloseHandled(){
        this.display="none";
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
    private subscribeToListCollectionsResponse(result: Observable<Collections>) {
        result.subscribe((res: Collections) => {
                this.onSaveSuccess(res), (res: Response) => this.onSaveError()
            }
        );
    }
    private onSaveSuccess(result: Collections) {
        this.eventManager.broadcast({ name: 'collectionsListModification', content: 'OK'});
        this.isSaving = false;
    }
    private onSaveError() {
        this.isSaving = false;
    }
}
