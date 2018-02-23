import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Collections } from './collections.model';
import { CollectionsService } from './collections.service';

@Component({
    selector: 'jhi-collections-detail',
    templateUrl: './collections-detail.component.html'
})
export class CollectionsDetailComponent implements OnInit, OnDestroy {

    collections: Collections;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private collectionsService: CollectionsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCollections();
    }

    load(id) {
        this.collectionsService.find(id).subscribe((collections) => {
            this.collections = collections;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCollections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'collectionsListModification',
            (response) => this.load(this.collections.id)
        );
    }
}
