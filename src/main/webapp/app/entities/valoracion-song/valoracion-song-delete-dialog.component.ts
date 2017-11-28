import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ValoracionSong } from './valoracion-song.model';
import { ValoracionSongPopupService } from './valoracion-song-popup.service';
import { ValoracionSongService } from './valoracion-song.service';

@Component({
    selector: 'jhi-valoracion-song-delete-dialog',
    templateUrl: './valoracion-song-delete-dialog.component.html'
})
export class ValoracionSongDeleteDialogComponent {

    valoracionSong: ValoracionSong;

    constructor(
        private valoracionSongService: ValoracionSongService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.valoracionSongService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'valoracionSongListModification',
                content: 'Deleted an valoracionSong'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-valoracion-song-delete-popup',
    template: ''
})
export class ValoracionSongDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valoracionSongPopupService: ValoracionSongPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.valoracionSongPopupService
                .open(ValoracionSongDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
