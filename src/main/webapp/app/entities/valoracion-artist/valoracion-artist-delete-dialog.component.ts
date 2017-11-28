import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ValoracionArtist } from './valoracion-artist.model';
import { ValoracionArtistPopupService } from './valoracion-artist-popup.service';
import { ValoracionArtistService } from './valoracion-artist.service';

@Component({
    selector: 'jhi-valoracion-artist-delete-dialog',
    templateUrl: './valoracion-artist-delete-dialog.component.html'
})
export class ValoracionArtistDeleteDialogComponent {

    valoracionArtist: ValoracionArtist;

    constructor(
        private valoracionArtistService: ValoracionArtistService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.valoracionArtistService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'valoracionArtistListModification',
                content: 'Deleted an valoracionArtist'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-valoracion-artist-delete-popup',
    template: ''
})
export class ValoracionArtistDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valoracionArtistPopupService: ValoracionArtistPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.valoracionArtistPopupService
                .open(ValoracionArtistDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
