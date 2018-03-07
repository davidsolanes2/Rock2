import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';

import { Pages } from './pages.model';
import { PagesService } from './pages.service';
import {Principal, ResponseWrapper} from '../../shared';
import {Response} from '@angular/http';
import {Collections} from '../../entities/collections';
import {CollectionsService} from '../../entities/collections';

@Component({
    selector: 'jhi-pages',
    templateUrl: './pages.component.html',
    styleUrls: [
        'pages.css'
    ]
})
export class PagesComponent implements OnInit, OnDestroy {

    collections: Collections;
    coleccion : Collections[];
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

    constructor(
        private pagesService: PagesService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private collectionsService: CollectionsService

    ) {
    }

    loadAll() {
        this.collectionsService.listar().subscribe(
            (res: ResponseWrapper) => {
                this.coleccion = res.json;
                console.log(this.coleccion)
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
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
