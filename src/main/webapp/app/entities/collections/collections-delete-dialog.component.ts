import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Collections } from './collections.model';
import { CollectionsPopupService } from './collections-popup.service';
import { CollectionsService } from './collections.service';

@Component({
    selector: 'jhi-collections-delete-dialog',
    templateUrl: './collections-delete-dialog.component.html'
})
export class CollectionsDeleteDialogComponent {

    collections: Collections;

    constructor(
        private collectionsService: CollectionsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.collectionsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'collectionsListModification',
                content: 'Deleted an collections'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-collections-delete-popup',
    template: ''
})
export class CollectionsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private collectionsPopupService: CollectionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.collectionsPopupService
                .open(CollectionsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
