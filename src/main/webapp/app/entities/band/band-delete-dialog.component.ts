import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Band } from './band.model';
import { BandPopupService } from './band-popup.service';
import { BandService } from './band.service';

@Component({
    selector: 'jhi-band-delete-dialog',
    templateUrl: './band-delete-dialog.component.html'
})
export class BandDeleteDialogComponent {

    band: Band;

    constructor(
        private bandService: BandService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bandService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bandListModification',
                content: 'Deleted an band'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-band-delete-popup',
    template: ''
})
export class BandDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bandPopupService: BandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bandPopupService
                .open(BandDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
