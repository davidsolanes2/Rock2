import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CollectionsTicketMaster } from './collections-ticket-master.model';
import { CollectionsTicketMasterService } from './collections-ticket-master.service';

@Component({
    selector: 'jhi-collections-ticket-master-detail',
    templateUrl: './collections-ticket-master-detail.component.html'
})
export class CollectionsTicketMasterDetailComponent implements OnInit, OnDestroy {

    collectionsTicketMaster: CollectionsTicketMaster;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private collectionsTicketMasterService: CollectionsTicketMasterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCollectionsTicketMasters();
    }

    load(id) {
        this.collectionsTicketMasterService.find(id).subscribe((collectionsTicketMaster) => {
            this.collectionsTicketMaster = collectionsTicketMaster;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCollectionsTicketMasters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'collectionsTicketMasterListModification',
            (response) => this.load(this.collectionsTicketMaster.id)
        );
    }
}
