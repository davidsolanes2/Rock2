import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PagesComponent } from './pages.component';
import {AlbumDetailComponent} from "../../entities/album/album-detail.component";
export const PagesongRoute: Routes = [
    {
        path: 'pagesong-pages',
        component: PagesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.pagesong-pages.home.title'
        },
        canActivate: [UserRouteAccessService]
    },{
        path: 'pagesong-pages/:artistId',
        component: PagesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.pagesong-pages.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
