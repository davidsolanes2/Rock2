import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';

import { Fromulario } from './fromulario.model';
import { FromularioService } from './fromulario.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-fromulario',
    templateUrl: './fromulario.component.html'
})
export class FromularioComponent implements OnInit, OnDestroy {

    fromulario: Fromulario = new Fromulario();

    currentAccount: any;
    eventSubscriber: Subscription;
    isSaving: Boolean;

    constructor(
        private fromularioService: FromularioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(
            this.fromularioService.create(this.fromulario));
    }

    clear() {
        this.fromulario = new Fromulario();
    }

    private subscribeToSaveResponse(result: Observable<Fromulario>) {
        result.subscribe((res: Fromulario) =>
        this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Fromulario) {
        this.eventManager.broadcast({ name: 'fromularioListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    ngOnInit() {

        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

    }

    ngOnDestroy() {

    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
