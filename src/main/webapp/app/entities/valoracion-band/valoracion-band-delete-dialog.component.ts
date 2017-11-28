import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ValoracionBand } from './valoracion-band.model';
import { ValoracionBandPopupService } from './valoracion-band-popup.service';
import { ValoracionBandService } from './valoracion-band.service';

@Component({
    selector: 'jhi-valoracion-band-delete-dialog',
    templateUrl: './valoracion-band-delete-dialog.component.html'
})
export class ValoracionBandDeleteDialogComponent {

    valoracionBand: ValoracionBand;

    constructor(
        private valoracionBandService: ValoracionBandService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.valoracionBandService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'valoracionBandListModification',
                content: 'Deleted an valoracionBand'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-valoracion-band-delete-popup',
    template: ''
})
export class ValoracionBandDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valoracionBandPopupService: ValoracionBandPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.valoracionBandPopupService
                .open(ValoracionBandDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
