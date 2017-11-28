import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ValoracionAlbum } from './valoracion-album.model';
import { ValoracionAlbumPopupService } from './valoracion-album-popup.service';
import { ValoracionAlbumService } from './valoracion-album.service';

@Component({
    selector: 'jhi-valoracion-album-delete-dialog',
    templateUrl: './valoracion-album-delete-dialog.component.html'
})
export class ValoracionAlbumDeleteDialogComponent {

    valoracionAlbum: ValoracionAlbum;

    constructor(
        private valoracionAlbumService: ValoracionAlbumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.valoracionAlbumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'valoracionAlbumListModification',
                content: 'Deleted an valoracionAlbum'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-valoracion-album-delete-popup',
    template: ''
})
export class ValoracionAlbumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valoracionAlbumPopupService: ValoracionAlbumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.valoracionAlbumPopupService
                .open(ValoracionAlbumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
