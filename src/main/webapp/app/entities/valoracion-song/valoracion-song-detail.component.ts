import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ValoracionSong } from './valoracion-song.model';
import { ValoracionSongService } from './valoracion-song.service';

@Component({
    selector: 'jhi-valoracion-song-detail',
    templateUrl: './valoracion-song-detail.component.html'
})
export class ValoracionSongDetailComponent implements OnInit, OnDestroy {

    valoracionSong: ValoracionSong;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private valoracionSongService: ValoracionSongService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInValoracionSongs();
    }

    load(id) {
        this.valoracionSongService.find(id).subscribe((valoracionSong) => {
            this.valoracionSong = valoracionSong;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInValoracionSongs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'valoracionSongListModification',
            (response) => this.load(this.valoracionSong.id)
        );
    }
}
