import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ValoracionBand } from './valoracion-band.model';
import { ValoracionBandService } from './valoracion-band.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-valoracion-band',
    templateUrl: './valoracion-band.component.html'
})
export class ValoracionBandComponent implements OnInit, OnDestroy {
valoracionBands: ValoracionBand[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private valoracionBandService: ValoracionBandService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.valoracionBandService.query().subscribe(
            (res: ResponseWrapper) => {
                this.valoracionBands = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInValoracionBands();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ValoracionBand) {
        return item.id;
    }
    registerChangeInValoracionBands() {
        this.eventSubscriber = this.eventManager.subscribe('valoracionBandListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
