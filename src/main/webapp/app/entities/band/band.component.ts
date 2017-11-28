import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Band } from './band.model';
import { BandService } from './band.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-band',
    templateUrl: './band.component.html'
})
export class BandComponent implements OnInit, OnDestroy {
bands: Band[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bandService: BandService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bandService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bands = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBands();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Band) {
        return item.id;
    }
    registerChangeInBands() {
        this.eventSubscriber = this.eventManager.subscribe('bandListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
