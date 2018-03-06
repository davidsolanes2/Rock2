import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CollectionsTicketMaster } from './collections-ticket-master.model';
import { CollectionsTicketMasterPopupService } from './collections-ticket-master-popup.service';
import { CollectionsTicketMasterService } from './collections-ticket-master.service';

@Component({
    selector: 'jhi-collections-ticket-master-delete-dialog',
    templateUrl: './collections-ticket-master-delete-dialog.component.html'
})
export class CollectionsTicketMasterDeleteDialogComponent {

    collectionsTicketMaster: CollectionsTicketMaster;

    constructor(
        private collectionsTicketMasterService: CollectionsTicketMasterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.collectionsTicketMasterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'collectionsTicketMasterListModification',
                content: 'Deleted an collectionsTicketMaster'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-collections-ticket-master-delete-popup',
    template: ''
})
export class CollectionsTicketMasterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private collectionsTicketMasterPopupService: CollectionsTicketMasterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.collectionsTicketMasterPopupService
                .open(CollectionsTicketMasterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
