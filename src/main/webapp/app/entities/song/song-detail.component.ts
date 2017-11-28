import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Song } from './song.model';
import { SongService } from './song.service';

@Component({
    selector: 'jhi-song-detail',
    templateUrl: './song-detail.component.html'
})
export class SongDetailComponent implements OnInit, OnDestroy {

    song: Song;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private songService: SongService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSongs();
    }

    load(id) {
        this.songService.find(id).subscribe((song) => {
            this.song = song;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSongs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'songListModification',
            (response) => this.load(this.song.id)
        );
    }
}
