import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ValoracionArtist } from './valoracion-artist.model';
import { ValoracionArtistService } from './valoracion-artist.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-valoracion-artist',
    templateUrl: './valoracion-artist.component.html'
})
export class ValoracionArtistComponent implements OnInit, OnDestroy {
valoracionArtists: ValoracionArtist[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private valoracionArtistService: ValoracionArtistService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.valoracionArtistService.query().subscribe(
            (res: ResponseWrapper) => {
                this.valoracionArtists = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInValoracionArtists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ValoracionArtist) {
        return item.id;
    }
    registerChangeInValoracionArtists() {
        this.eventSubscriber = this.eventManager.subscribe('valoracionArtistListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
