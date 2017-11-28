import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ValoracionSongComponent } from './valoracion-song.component';
import { ValoracionSongDetailComponent } from './valoracion-song-detail.component';
import { ValoracionSongPopupComponent } from './valoracion-song-dialog.component';
import { ValoracionSongDeletePopupComponent } from './valoracion-song-delete-dialog.component';

export const valoracionSongRoute: Routes = [
    {
        path: 'valoracion-song',
        component: ValoracionSongComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionSong.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'valoracion-song/:id',
        component: ValoracionSongDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionSong.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const valoracionSongPopupRoute: Routes = [
    {
        path: 'valoracion-song-new',
        component: ValoracionSongPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionSong.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'valoracion-song/:id/edit',
        component: ValoracionSongPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionSong.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'valoracion-song/:id/delete',
        component: ValoracionSongDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionSong.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
