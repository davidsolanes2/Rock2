import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PhomeComponent } from './phome.component';

export const PagehomeRoute: Routes = [
    {
        path: 'pagehome-phome',
        component: PhomeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.pagehome-phome.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];
