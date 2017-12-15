import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ValoracionBand } from './valoracion-band.model';
import { ValoracionBandPopupService } from './valoracion-band-popup.service';
import { ValoracionBandService } from './valoracion-band.service';
import { Band, BandService } from '../band';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-valoracion-band-dialog',
    templateUrl: './valoracion-band-dialog.component.html'
})
export class ValoracionBandDialogComponent implements OnInit {

    valoracionBand: ValoracionBand;
    isSaving: boolean;

    bands: Band[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private valoracionBandService: ValoracionBandService,
        private bandService: BandService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bandService.query()
            .subscribe((res: ResponseWrapper) => { this.bands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.valoracionBand.id !== undefined) {
            this.subscribeToSaveResponse(
                this.valoracionBandService.update(this.valoracionBand));
        } else {
            this.subscribeToSaveResponse(
                this.valoracionBandService.create(this.valoracionBand));
        }
    }

    private subscribeToSaveResponse(result: Observable<ValoracionBand>) {
        result.subscribe((res: ValoracionBand) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ValoracionBand) {
        this.eventManager.broadcast({ name: 'valoracionBandListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-valoracion-band-popup',
    template: ''
})
export class ValoracionBandPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valoracionBandPopupService: ValoracionBandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.valoracionBandPopupService
                    .open(ValoracionBandDialogComponent as Component, params['id']);
            } else {
                this.valoracionBandPopupService
                    .open(ValoracionBandDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
