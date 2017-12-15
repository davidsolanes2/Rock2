import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Song } from './song.model';
import { SongPopupService } from './song-popup.service';
import { SongService } from './song.service';
import { Genre, GenreService } from '../genre';
import { Album, AlbumService } from '../album';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-song-dialog',
    templateUrl: './song-dialog.component.html'
})
export class SongDialogComponent implements OnInit {

    song: Song;
    isSaving: boolean;

    genres: Genre[];

    albums: Album[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private songService: SongService,
        private genreService: GenreService,
        private albumService: AlbumService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.genreService.query()
            .subscribe((res: ResponseWrapper) => { this.genres = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.albumService.query()
            .subscribe((res: ResponseWrapper) => { this.albums = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.song.id !== undefined) {
            this.subscribeToSaveResponse(
                this.songService.update(this.song));
        } else {
            this.subscribeToSaveResponse(
                this.songService.create(this.song));
        }
    }

    private subscribeToSaveResponse(result: Observable<Song>) {
        result.subscribe((res: Song) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Song) {
        this.eventManager.broadcast({ name: 'songListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackGenreById(index: number, item: Genre) {
        return item.id;
    }

    trackAlbumById(index: number, item: Album) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-song-popup',
    template: ''
})
export class SongPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private songPopupService: SongPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.songPopupService
                    .open(SongDialogComponent as Component, params['id']);
            } else {
                this.songPopupService
                    .open(SongDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
