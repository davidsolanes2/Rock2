import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import { Rockbible3AdminModule } from '../../admin/admin.module';
import {
    ValoracionBandService,
    ValoracionBandPopupService,
    ValoracionBandComponent,
    ValoracionBandDetailComponent,
    ValoracionBandDialogComponent,
    ValoracionBandPopupComponent,
    ValoracionBandDeletePopupComponent,
    ValoracionBandDeleteDialogComponent,
    valoracionBandRoute,
    valoracionBandPopupRoute,
} from './';

const ENTITY_STATES = [
    ...valoracionBandRoute,
    ...valoracionBandPopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        Rockbible3AdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ValoracionBandComponent,
        ValoracionBandDetailComponent,
        ValoracionBandDialogComponent,
        ValoracionBandDeleteDialogComponent,
        ValoracionBandPopupComponent,
        ValoracionBandDeletePopupComponent,
    ],
    entryComponents: [
        ValoracionBandComponent,
        ValoracionBandDialogComponent,
        ValoracionBandPopupComponent,
        ValoracionBandDeleteDialogComponent,
        ValoracionBandDeletePopupComponent,
    ],
    providers: [
        ValoracionBandService,
        ValoracionBandPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3ValoracionBandModule {}
