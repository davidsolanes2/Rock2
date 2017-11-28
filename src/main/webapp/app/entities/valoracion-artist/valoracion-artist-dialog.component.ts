import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ValoracionArtist } from './valoracion-artist.model';
import { ValoracionArtistPopupService } from './valoracion-artist-popup.service';
import { ValoracionArtistService } from './valoracion-artist.service';
import { Artist, ArtistService } from '../artist';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-valoracion-artist-dialog',
    templateUrl: './valoracion-artist-dialog.component.html'
})
export class ValoracionArtistDialogComponent implements OnInit {

    valoracionArtist: ValoracionArtist;
    isSaving: boolean;

    artists: Artist[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private valoracionArtistService: ValoracionArtistService,
        private artistService: ArtistService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.artistService.query()
            .subscribe((res: ResponseWrapper) => { this.artists = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.valoracionArtist.id !== undefined) {
            this.subscribeToSaveResponse(
                this.valoracionArtistService.update(this.valoracionArtist));
        } else {
            this.subscribeToSaveResponse(
                this.valoracionArtistService.create(this.valoracionArtist));
        }
    }

    private subscribeToSaveResponse(result: Observable<ValoracionArtist>) {
        result.subscribe((res: ValoracionArtist) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ValoracionArtist) {
        this.eventManager.broadcast({ name: 'valoracionArtistListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackArtistById(index: number, item: Artist) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-valoracion-artist-popup',
    template: ''
})
export class ValoracionArtistPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valoracionArtistPopupService: ValoracionArtistPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.valoracionArtistPopupService
                    .open(ValoracionArtistDialogComponent as Component, params['id']);
            } else {
                this.valoracionArtistPopupService
                    .open(ValoracionArtistDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
