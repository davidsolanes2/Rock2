import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ValoracionBand } from './valoracion-band.model';
import { ValoracionBandService } from './valoracion-band.service';

@Component({
    selector: 'jhi-valoracion-band-detail',
    templateUrl: './valoracion-band-detail.component.html'
})
export class ValoracionBandDetailComponent implements OnInit, OnDestroy {

    valoracionBand: ValoracionBand;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private valoracionBandService: ValoracionBandService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInValoracionBands();
    }

    load(id) {
        this.valoracionBandService.find(id).subscribe((valoracionBand) => {
            this.valoracionBand = valoracionBand;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInValoracionBands() {
        this.eventSubscriber = this.eventManager.subscribe(
            'valoracionBandListModification',
            (response) => this.load(this.valoracionBand.id)
        );
    }
}
