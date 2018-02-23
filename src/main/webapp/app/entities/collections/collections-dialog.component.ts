import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Collections } from './collections.model';
import { CollectionsPopupService } from './collections-popup.service';
import { CollectionsService } from './collections.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-collections-dialog',
    templateUrl: './collections-dialog.component.html'
})
export class CollectionsDialogComponent implements OnInit {

    collections: Collections;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private collectionsService: CollectionsService,
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
        if (this.collections.id !== undefined) {
            this.subscribeToSaveResponse(
                this.collectionsService.update(this.collections));
        } else {
            this.subscribeToSaveResponse(
                this.collectionsService.create(this.collections));
        }
    }

    private subscribeToSaveResponse(result: Observable<Collections>) {
        result.subscribe((res: Collections) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Collections) {
        this.eventManager.broadcast({ name: 'collectionsListModification', content: 'OK'});
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
    selector: 'jhi-collections-popup',
    template: ''
})
export class CollectionsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private collectionsPopupService: CollectionsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.collectionsPopupService
                    .open(CollectionsDialogComponent as Component, params['id']);
            } else {
                this.collectionsPopupService
                    .open(CollectionsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
