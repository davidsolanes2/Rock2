import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import { Rockbible3AdminModule } from '../../admin/admin.module';
import {
    ValoracionSongService,
    ValoracionSongPopupService,
    ValoracionSongComponent,
    ValoracionSongDetailComponent,
    ValoracionSongDialogComponent,
    ValoracionSongPopupComponent,
    ValoracionSongDeletePopupComponent,
    ValoracionSongDeleteDialogComponent,
    valoracionSongRoute,
    valoracionSongPopupRoute,
} from './';

const ENTITY_STATES = [
    ...valoracionSongRoute,
    ...valoracionSongPopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        Rockbible3AdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ValoracionSongComponent,
        ValoracionSongDetailComponent,
        ValoracionSongDialogComponent,
        ValoracionSongDeleteDialogComponent,
        ValoracionSongPopupComponent,
        ValoracionSongDeletePopupComponent,
    ],
    entryComponents: [
        ValoracionSongComponent,
        ValoracionSongDialogComponent,
        ValoracionSongPopupComponent,
        ValoracionSongDeleteDialogComponent,
        ValoracionSongDeletePopupComponent,
    ],
    providers: [
        ValoracionSongService,
        ValoracionSongPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3ValoracionSongModule {}
