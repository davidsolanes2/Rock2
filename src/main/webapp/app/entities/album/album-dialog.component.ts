import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Album } from './album.model';
import { AlbumPopupService } from './album-popup.service';
import { AlbumService } from './album.service';
import { Band, BandService } from '../band';
import { UserExt, UserExtService } from '../user-ext';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-album-dialog',
    templateUrl: './album-dialog.component.html'
})
export class AlbumDialogComponent implements OnInit {

    album: Album;
    isSaving: boolean;

    bands: Band[];

    userexts: UserExt[];
    releaseDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private albumService: AlbumService,
        private bandService: BandService,
        private userExtService: UserExtService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bandService.query()
            .subscribe((res: ResponseWrapper) => { this.bands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userExtService.query()
            .subscribe((res: ResponseWrapper) => { this.userexts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.album.id !== undefined) {
            this.subscribeToSaveResponse(
                this.albumService.update(this.album));
        } else {
            this.subscribeToSaveResponse(
                this.albumService.create(this.album));
        }
    }

    private subscribeToSaveResponse(result: Observable<Album>) {
        result.subscribe((res: Album) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Album) {
        this.eventManager.broadcast({ name: 'albumListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBandById(index: number, item: Band) {
        return item.id;
    }

    trackUserExtById(index: number, item: UserExt) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-album-popup',
    template: ''
})
export class AlbumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private albumPopupService: AlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.albumPopupService
                    .open(AlbumDialogComponent as Component, params['id']);
            } else {
                this.albumPopupService
                    .open(AlbumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
