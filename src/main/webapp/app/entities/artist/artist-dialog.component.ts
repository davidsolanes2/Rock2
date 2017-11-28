import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Artist } from './artist.model';
import { ArtistPopupService } from './artist-popup.service';
import { ArtistService } from './artist.service';
import { Band, BandService } from '../band';
import { Country, CountryService } from '../country';
import { Label, LabelService } from '../label';
import { Instrument, InstrumentService } from '../instrument';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-artist-dialog',
    templateUrl: './artist-dialog.component.html'
})
export class ArtistDialogComponent implements OnInit {

    artist: Artist;
    isSaving: boolean;

    bands: Band[];

    countries: Country[];

    labels: Label[];

    instruments: Instrument[];
    bornDp: any;
    deathDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private artistService: ArtistService,
        private bandService: BandService,
        private countryService: CountryService,
        private labelService: LabelService,
        private instrumentService: InstrumentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bandService.query()
            .subscribe((res: ResponseWrapper) => { this.bands = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.countryService.query()
            .subscribe((res: ResponseWrapper) => { this.countries = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.labelService.query()
            .subscribe((res: ResponseWrapper) => { this.labels = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.instrumentService.query()
            .subscribe((res: ResponseWrapper) => { this.instruments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.artist.id !== undefined) {
            this.subscribeToSaveResponse(
                this.artistService.update(this.artist));
        } else {
            this.subscribeToSaveResponse(
                this.artistService.create(this.artist));
        }
    }

    private subscribeToSaveResponse(result: Observable<Artist>) {
        result.subscribe((res: Artist) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Artist) {
        this.eventManager.broadcast({ name: 'artistListModification', content: 'OK'});
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

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    trackLabelById(index: number, item: Label) {
        return item.id;
    }

    trackInstrumentById(index: number, item: Instrument) {
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
    selector: 'jhi-artist-popup',
    template: ''
})
export class ArtistPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private artistPopupService: ArtistPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.artistPopupService
                    .open(ArtistDialogComponent as Component, params['id']);
            } else {
                this.artistPopupService
                    .open(ArtistDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
