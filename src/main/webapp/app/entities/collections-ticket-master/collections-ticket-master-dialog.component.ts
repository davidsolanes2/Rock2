import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CollectionsTicketMaster } from './collections-ticket-master.model';
import { CollectionsTicketMasterPopupService } from './collections-ticket-master-popup.service';
import { CollectionsTicketMasterService } from './collections-ticket-master.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-collections-ticket-master-dialog',
    templateUrl: './collections-ticket-master-dialog.component.html'
})
export class CollectionsTicketMasterDialogComponent implements OnInit {

    collectionsTicketMaster: CollectionsTicketMaster;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private collectionsTicketMasterService: CollectionsTicketMasterService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.collectionsTicketMaster.id !== undefined) {
            this.subscribeToSaveResponse(
                this.collectionsTicketMasterService.update(this.collectionsTicketMaster));
        } else {
            this.subscribeToSaveResponse(
                this.collectionsTicketMasterService.create(this.collectionsTicketMaster));
        }
    }

    private subscribeToSaveResponse(result: Observable<CollectionsTicketMaster>) {
        result.subscribe((res: CollectionsTicketMaster) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CollectionsTicketMaster) {
        this.eventManager.broadcast({ name: 'collectionsTicketMasterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-collections-ticket-master-popup',
    template: ''
})
export class CollectionsTicketMasterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private collectionsTicketMasterPopupService: CollectionsTicketMasterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.collectionsTicketMasterPopupService
                    .open(CollectionsTicketMasterDialogComponent as Component, params['id']);
            } else {
                this.collectionsTicketMasterPopupService
                    .open(CollectionsTicketMasterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
