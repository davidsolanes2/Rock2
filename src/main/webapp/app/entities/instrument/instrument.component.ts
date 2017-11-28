import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Instrument } from './instrument.model';
import { InstrumentService } from './instrument.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-instrument',
    templateUrl: './instrument.component.html'
})
export class InstrumentComponent implements OnInit, OnDestroy {
instruments: Instrument[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private instrumentService: InstrumentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.instrumentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.instruments = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInstruments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Instrument) {
        return item.id;
    }
    registerChangeInInstruments() {
        this.eventSubscriber = this.eventManager.subscribe('instrumentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
