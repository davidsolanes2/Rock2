import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ValoracionBandComponent } from './valoracion-band.component';
import { ValoracionBandDetailComponent } from './valoracion-band-detail.component';
import { ValoracionBandPopupComponent } from './valoracion-band-dialog.component';
import { ValoracionBandDeletePopupComponent } from './valoracion-band-delete-dialog.component';

export const valoracionBandRoute: Routes = [
    {
        path: 'valoracion-band',
        component: ValoracionBandComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionBand.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'valoracion-band/:id',
        component: ValoracionBandDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionBand.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const valoracionBandPopupRoute: Routes = [
    {
        path: 'valoracion-band-new',
        component: ValoracionBandPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionBand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'valoracion-band/:id/edit',
        component: ValoracionBandPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionBand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'valoracion-band/:id/delete',
        component: ValoracionBandDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionBand.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
