import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Song } from './song.model';
import { SongPopupService } from './song-popup.service';
import { SongService } from './song.service';

@Component({
    selector: 'jhi-song-delete-dialog',
    templateUrl: './song-delete-dialog.component.html'
})
export class SongDeleteDialogComponent {

    song: Song;

    constructor(
        private songService: SongService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.songService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'songListModification',
                content: 'Deleted an song'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-song-delete-popup',
    template: ''
})
export class SongDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private songPopupService: SongPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.songPopupService
                .open(SongDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
