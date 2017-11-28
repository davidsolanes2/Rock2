import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ValoracionAlbumComponent } from './valoracion-album.component';
import { ValoracionAlbumDetailComponent } from './valoracion-album-detail.component';
import { ValoracionAlbumPopupComponent } from './valoracion-album-dialog.component';
import { ValoracionAlbumDeletePopupComponent } from './valoracion-album-delete-dialog.component';

export const valoracionAlbumRoute: Routes = [
    {
        path: 'valoracion-album',
        component: ValoracionAlbumComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'valoracion-album/:id',
        component: ValoracionAlbumDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const valoracionAlbumPopupRoute: Routes = [
    {
        path: 'valoracion-album-new',
        component: ValoracionAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'valoracion-album/:id/edit',
        component: ValoracionAlbumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'valoracion-album/:id/delete',
        component: ValoracionAlbumDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.valoracionAlbum.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
