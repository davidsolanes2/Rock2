import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FromularioComponent } from './fromulario.component';
export const PruebaRoute: Routes = [
    {
        path: 'prueba-fromulario',
        component: FromularioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rockbible3App.prueba-fromulario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];
