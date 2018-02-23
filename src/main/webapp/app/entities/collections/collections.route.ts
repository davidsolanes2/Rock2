import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CollectionsComponent } from './collections.component';
import { CollectionsDetailComponent } from './collections-detail.component';
import { CollectionsPopupComponent } from './collections-dialog.component';
import { CollectionsDeletePopupComponent } from './collections-delete-dialog.component';

export const collectionsRoute: Routes = [
    {
        path: 'collections',
        component: CollectionsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collections.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'collections/:id',
        component: CollectionsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collections.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const collectionsPopupRoute: Routes = [
    {
        path: 'collections-new',
        component: CollectionsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collections.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'collections/:id/edit',
        component: CollectionsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collections.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'collections/:id/delete',
        component: CollectionsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collections.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
