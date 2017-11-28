import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Label } from './label.model';
import { LabelPopupService } from './label-popup.service';
import { LabelService } from './label.service';

@Component({
    selector: 'jhi-label-dialog',
    templateUrl: './label-dialog.component.html'
})
export class LabelDialogComponent implements OnInit {

    label: Label;
    isSaving: boolean;
    foundationdateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private labelService: LabelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.label.id !== undefined) {
            this.subscribeToSaveResponse(
                this.labelService.update(this.label));
        } else {
            this.subscribeToSaveResponse(
                this.labelService.create(this.label));
        }
    }

    private subscribeToSaveResponse(result: Observable<Label>) {
        result.subscribe((res: Label) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Label) {
        this.eventManager.broadcast({ name: 'labelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-label-popup',
    template: ''
})
export class LabelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private labelPopupService: LabelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.labelPopupService
                    .open(LabelDialogComponent as Component, params['id']);
            } else {
                this.labelPopupService
                    .open(LabelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
