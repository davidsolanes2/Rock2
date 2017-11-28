import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SongComponent } from './song.component';
import { SongDetailComponent } from './song-detail.component';
import { SongPopupComponent } from './song-dialog.component';
import { SongDeletePopupComponent } from './song-delete-dialog.component';

export const songRoute: Routes = [
    {
        path: 'song',
        component: SongComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.song.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'song/:id',
        component: SongDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.song.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const songPopupRoute: Routes = [
    {
        path: 'song-new',
        component: SongPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.song.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'song/:id/edit',
        component: SongPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.song.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'song/:id/delete',
        component: SongDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.song.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
