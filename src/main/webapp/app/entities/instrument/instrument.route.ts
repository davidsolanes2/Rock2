import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { InstrumentComponent } from './instrument.component';
import { InstrumentDetailComponent } from './instrument-detail.component';
import { InstrumentPopupComponent } from './instrument-dialog.component';
import { InstrumentDeletePopupComponent } from './instrument-delete-dialog.component';

export const instrumentRoute: Routes = [
    {
        path: 'instrument',
        component: InstrumentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.instrument.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'instrument/:id',
        component: InstrumentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.instrument.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const instrumentPopupRoute: Routes = [
    {
        path: 'instrument-new',
        component: InstrumentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.instrument.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'instrument/:id/edit',
        component: InstrumentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.instrument.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'instrument/:id/delete',
        component: InstrumentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.instrument.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
