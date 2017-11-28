import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BandComponent } from './band.component';
import { BandDetailComponent } from './band-detail.component';
import { BandPopupComponent } from './band-dialog.component';
import { BandDeletePopupComponent } from './band-delete-dialog.component';

export const bandRoute: Routes = [
    {
        path: 'band',
        component: BandComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.band.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'band/:id',
        component: BandDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.band.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bandPopupRoute: Routes = [
    {
        path: 'band-new',
        component: BandPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.band.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'band/:id/edit',
        component: BandPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.band.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'band/:id/delete',
        component: BandDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.band.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
