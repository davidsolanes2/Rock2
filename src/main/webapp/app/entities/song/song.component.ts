import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Song } from './song.model';
import { SongService } from './song.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-song',
    templateUrl: './song.component.html'
})
export class SongComponent implements OnInit, OnDestroy {
songs: Song[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private songService: SongService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.songService.query().subscribe(
            (res: ResponseWrapper) => {
                this.songs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSongs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Song) {
        return item.id;
    }
    registerChangeInSongs() {
        this.eventSubscriber = this.eventManager.subscribe('songListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
