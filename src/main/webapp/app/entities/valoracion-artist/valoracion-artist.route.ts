import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ValoracionArtistComponent } from './valoracion-artist.component';
import { ValoracionArtistDetailComponent } from './valoracion-artist-detail.component';
import { ValoracionArtistPopupComponent } from './valoracion-artist-dialog.component';
import { ValoracionArtistDeletePopupComponent } from './valoracion-artist-delete-dialog.component';

export const valoracionArtistRoute: Routes = [
    {
        path: 'valoracion-artist',
        component: ValoracionArtistComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionArtist.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'valoracion-artist/:id',
        component: ValoracionArtistDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionArtist.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const valoracionArtistPopupRoute: Routes = [
    {
        path: 'valoracion-artist-new',
        component: ValoracionArtistPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionArtist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'valoracion-artist/:id/edit',
        component: ValoracionArtistPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionArtist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'valoracion-artist/:id/delete',
        component: ValoracionArtistDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionArtist.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
