import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import { Rockbible3AdminModule } from '../../admin/admin.module';
import {
    ValoracionAlbumService,
    ValoracionAlbumPopupService,
    ValoracionAlbumComponent,
    ValoracionAlbumDetailComponent,
    ValoracionAlbumDialogComponent,
    ValoracionAlbumPopupComponent,
    ValoracionAlbumDeletePopupComponent,
    ValoracionAlbumDeleteDialogComponent,
    valoracionAlbumRoute,
    valoracionAlbumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...valoracionAlbumRoute,
    ...valoracionAlbumPopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        Rockbible3AdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ValoracionAlbumComponent,
        ValoracionAlbumDetailComponent,
        ValoracionAlbumDialogComponent,
        ValoracionAlbumDeleteDialogComponent,
        ValoracionAlbumPopupComponent,
        ValoracionAlbumDeletePopupComponent,
    ],
    entryComponents: [
        ValoracionAlbumComponent,
        ValoracionAlbumDialogComponent,
        ValoracionAlbumPopupComponent,
        ValoracionAlbumDeleteDialogComponent,
        ValoracionAlbumDeletePopupComponent,
    ],
    providers: [
        ValoracionAlbumService,
        ValoracionAlbumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3ValoracionAlbumModule {}
