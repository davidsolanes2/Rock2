import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Band } from './band.model';
import { BandPopupService } from './band-popup.service';
import { BandService } from './band.service';
import { Country, CountryService } from '../country';
import { Label, LabelService } from '../label';
import { Genre, GenreService } from '../genre';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-band-dialog',
    templateUrl: './band-dialog.component.html'
})
export class BandDialogComponent implements OnInit {

    band: Band;
    isSaving: boolean;

    countries: Country[];

    labels: Label[];

    genres: Genre[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bandService: BandService,
        private countryService: CountryService,
        private labelService: LabelService,
        private genreService: GenreService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService.query()
            .subscribe((res: ResponseWrapper) => { this.countries = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.labelService.query()
            .subscribe((res: ResponseWrapper) => { this.labels = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.genreService.query()
            .subscribe((res: ResponseWrapper) => { this.genres = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.band.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bandService.update(this.band));
        } else {
            this.subscribeToSaveResponse(
                this.bandService.create(this.band));
        }
    }

    private subscribeToSaveResponse(result: Observable<Band>) {
        result.subscribe((res: Band) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Band) {
        this.eventManager.broadcast({ name: 'bandListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackLabelById(index: number, item: Label) {
        return item.id;
    }

    trackGenreById(index: number, item: Genre) {
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
    selector: 'jhi-band-popup',
    template: ''
})
export class BandPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bandPopupService: BandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bandPopupService
                    .open(BandDialogComponent as Component, params['id']);
            } else {
                this.bandPopupService
                    .open(BandDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
