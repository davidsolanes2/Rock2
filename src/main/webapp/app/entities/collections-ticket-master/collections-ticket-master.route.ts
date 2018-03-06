import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CollectionsTicketMasterComponent } from './collections-ticket-master.component';
import { CollectionsTicketMasterDetailComponent } from './collections-ticket-master-detail.component';
import { CollectionsTicketMasterPopupComponent } from './collections-ticket-master-dialog.component';
import { CollectionsTicketMasterDeletePopupComponent } from './collections-ticket-master-delete-dialog.component';

export const collectionsTicketMasterRoute: Routes = [
    {
        path: 'collections-ticket-master',
        component: CollectionsTicketMasterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collectionsTicketMaster.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'collections-ticket-master/:id',
        component: CollectionsTicketMasterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collectionsTicketMaster.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const collectionsTicketMasterPopupRoute: Routes = [
    {
        path: 'collections-ticket-master-new',
        component: CollectionsTicketMasterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collectionsTicketMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'collections-ticket-master/:id/edit',
        component: CollectionsTicketMasterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collectionsTicketMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'collections-ticket-master/:id/delete',
        component: CollectionsTicketMasterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.collectionsTicketMaster.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
