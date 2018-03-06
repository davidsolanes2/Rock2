import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { CollectionsTicketMaster } from './collections-ticket-master.model';
import { CollectionsTicketMasterService } from './collections-ticket-master.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-collections-ticket-master',
    templateUrl: './collections-ticket-master.component.html'
})
export class CollectionsTicketMasterComponent implements OnInit, OnDestroy {
collectionsTicketMasters: CollectionsTicketMaster[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private collectionsTicketMasterService: CollectionsTicketMasterService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.collectionsTicketMasterService.query().subscribe(
            (res: ResponseWrapper) => {
                this.collectionsTicketMasters = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCollectionsTicketMasters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CollectionsTicketMaster) {
        return item.id;
    }
    registerChangeInCollectionsTicketMasters() {
        this.eventSubscriber = this.eventManager.subscribe('collectionsTicketMasterListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
