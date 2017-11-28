import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Instrument } from './instrument.model';
import { InstrumentService } from './instrument.service';

@Component({
    selector: 'jhi-instrument-detail',
    templateUrl: './instrument-detail.component.html'
})
export class InstrumentDetailComponent implements OnInit, OnDestroy {

    instrument: Instrument;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private instrumentService: InstrumentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInstruments();
    }

    load(id) {
        this.instrumentService.find(id).subscribe((instrument) => {
            this.instrument = instrument;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInstruments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'instrumentListModification',
            (response) => this.load(this.instrument.id)
        );
    }
}
