import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';

import { Pages } from './pages.model';
import { PagesService } from './pages.service';
import { Principal } from '../../shared';
import {Http, Response} from "@angular/http";

@Component({
    selector: 'jhi-pages',
    templateUrl: './pages.component.html',
    styleUrls: [
        'pagesong.css'
    ]
})
export class PagesComponent implements OnInit, OnDestroy {

    Info: any = [];
    pages: Pages = new Pages();

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
    private subscription: Subscription;

    constructor(
        private pagesService: PagesService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private http: Http,


    ) {
    }

    loadAll() {
    }

    searchAritst(artistId: number){
        console.log(artistId);
        this.http.get(`http://api.napster.com/v2.2/artists/${artistId}?apikey=MjM4OWE1MzQtNTUyMy00ODIzLWEyNTMtNDQ1MzFlN2ExYzll&lang=es`)
            .subscribe((res: Response) => {
                const data = res.json();
                console.log(data.artists);
                this.Info = data.artists;
            });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.searchAritst(params['artistId']);
        });
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
}
