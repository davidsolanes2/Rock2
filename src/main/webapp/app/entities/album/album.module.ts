import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import {
    AlbumService,
    AlbumPopupService,
    AlbumComponent,
    AlbumDetailComponent,
    AlbumDialogComponent,
    AlbumPopupComponent,
    AlbumDeletePopupComponent,
    AlbumDeleteDialogComponent,
    albumRoute,
    albumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...albumRoute,
    ...albumPopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AlbumComponent,
        AlbumDetailComponent,
        AlbumDialogComponent,
        AlbumDeleteDialogComponent,
        AlbumPopupComponent,
        AlbumDeletePopupComponent,
    ],
    entryComponents: [
        AlbumComponent,
        AlbumDialogComponent,
        AlbumPopupComponent,
        AlbumDeleteDialogComponent,
        AlbumDeletePopupComponent,
    ],
    providers: [
        AlbumService,
        AlbumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3AlbumModule {}
