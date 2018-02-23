import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Collections } from './collections.model';
import { CollectionsService } from './collections.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-collections',
    templateUrl: './collections.component.html'
})
export class CollectionsComponent implements OnInit, OnDestroy {
collections: Collections[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private collectionsService: CollectionsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.collectionsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.collections = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCollections();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Collections) {
        return item.id;
    }
    registerChangeInCollections() {
        this.eventSubscriber = this.eventManager.subscribe('collectionsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
