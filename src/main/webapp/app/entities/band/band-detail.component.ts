import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Band } from './band.model';
import { BandService } from './band.service';

@Component({
    selector: 'jhi-band-detail',
    templateUrl: './band-detail.component.html'
})
export class BandDetailComponent implements OnInit, OnDestroy {

    band: Band;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bandService: BandService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBands();
    }

    load(id) {
        this.bandService.find(id).subscribe((band) => {
            this.band = band;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBands() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bandListModification',
            (response) => this.load(this.band.id)
        );
    }
}
