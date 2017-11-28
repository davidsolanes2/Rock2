import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ValoracionSong } from './valoracion-song.model';
import { ValoracionSongService } from './valoracion-song.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-valoracion-song',
    templateUrl: './valoracion-song.component.html'
})
export class ValoracionSongComponent implements OnInit, OnDestroy {
valoracionSongs: ValoracionSong[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private valoracionSongService: ValoracionSongService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.valoracionSongService.query().subscribe(
            (res: ResponseWrapper) => {
                this.valoracionSongs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInValoracionSongs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ValoracionSong) {
        return item.id;
    }
    registerChangeInValoracionSongs() {
        this.eventSubscriber = this.eventManager.subscribe('valoracionSongListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
