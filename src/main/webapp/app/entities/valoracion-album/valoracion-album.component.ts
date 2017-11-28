import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ValoracionAlbum } from './valoracion-album.model';
import { ValoracionAlbumService } from './valoracion-album.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-valoracion-album',
    templateUrl: './valoracion-album.component.html'
})
export class ValoracionAlbumComponent implements OnInit, OnDestroy {
valoracionAlbums: ValoracionAlbum[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private valoracionAlbumService: ValoracionAlbumService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.valoracionAlbumService.query().subscribe(
            (res: ResponseWrapper) => {
                this.valoracionAlbums = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInValoracionAlbums();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ValoracionAlbum) {
        return item.id;
    }
    registerChangeInValoracionAlbums() {
        this.eventSubscriber = this.eventManager.subscribe('valoracionAlbumListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
