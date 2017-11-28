import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Instrument } from './instrument.model';
import { InstrumentPopupService } from './instrument-popup.service';
import { InstrumentService } from './instrument.service';

@Component({
    selector: 'jhi-instrument-delete-dialog',
    templateUrl: './instrument-delete-dialog.component.html'
})
export class InstrumentDeleteDialogComponent {

    instrument: Instrument;

    constructor(
        private instrumentService: InstrumentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.instrumentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'instrumentListModification',
                content: 'Deleted an instrument'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-instrument-delete-popup',
    template: ''
})
export class InstrumentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private instrumentPopupService: InstrumentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.instrumentPopupService
                .open(InstrumentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
