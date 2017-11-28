import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ValoracionAlbum } from './valoracion-album.model';
import { ValoracionAlbumPopupService } from './valoracion-album-popup.service';
import { ValoracionAlbumService } from './valoracion-album.service';
import { Album, AlbumService } from '../album';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-valoracion-album-dialog',
    templateUrl: './valoracion-album-dialog.component.html'
})
export class ValoracionAlbumDialogComponent implements OnInit {

    valoracionAlbum: ValoracionAlbum;
    isSaving: boolean;

    albums: Album[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private valoracionAlbumService: ValoracionAlbumService,
        private albumService: AlbumService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.albumService.query()
            .subscribe((res: ResponseWrapper) => { this.albums = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.valoracionAlbum.id !== undefined) {
            this.subscribeToSaveResponse(
                this.valoracionAlbumService.update(this.valoracionAlbum));
        } else {
            this.subscribeToSaveResponse(
                this.valoracionAlbumService.create(this.valoracionAlbum));
        }
    }

    private subscribeToSaveResponse(result: Observable<ValoracionAlbum>) {
        result.subscribe((res: ValoracionAlbum) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ValoracionAlbum) {
        this.eventManager.broadcast({ name: 'valoracionAlbumListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlbumById(index: number, item: Album) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-valoracion-album-popup',
    template: ''
})
export class ValoracionAlbumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valoracionAlbumPopupService: ValoracionAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.valoracionAlbumPopupService
                    .open(ValoracionAlbumDialogComponent as Component, params['id']);
            } else {
                this.valoracionAlbumPopupService
                    .open(ValoracionAlbumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
