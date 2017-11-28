import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ValoracionSong } from './valoracion-song.model';
import { ValoracionSongPopupService } from './valoracion-song-popup.service';
import { ValoracionSongService } from './valoracion-song.service';
import { Song, SongService } from '../song';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-valoracion-song-dialog',
    templateUrl: './valoracion-song-dialog.component.html'
})
export class ValoracionSongDialogComponent implements OnInit {

    valoracionSong: ValoracionSong;
    isSaving: boolean;

    songs: Song[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private valoracionSongService: ValoracionSongService,
        private songService: SongService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.songService.query()
            .subscribe((res: ResponseWrapper) => { this.songs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.valoracionSong.id !== undefined) {
            this.subscribeToSaveResponse(
                this.valoracionSongService.update(this.valoracionSong));
        } else {
            this.subscribeToSaveResponse(
                this.valoracionSongService.create(this.valoracionSong));
        }
    }

    private subscribeToSaveResponse(result: Observable<ValoracionSong>) {
        result.subscribe((res: ValoracionSong) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ValoracionSong) {
        this.eventManager.broadcast({ name: 'valoracionSongListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSongById(index: number, item: Song) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-valoracion-song-popup',
    template: ''
})
export class ValoracionSongPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valoracionSongPopupService: ValoracionSongPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.valoracionSongPopupService
                    .open(ValoracionSongDialogComponent as Component, params['id']);
            } else {
                this.valoracionSongPopupService
                    .open(ValoracionSongDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
