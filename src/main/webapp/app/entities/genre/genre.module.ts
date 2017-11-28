import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import {
    GenreService,
    GenrePopupService,
    GenreComponent,
    GenreDetailComponent,
    GenreDialogComponent,
    GenrePopupComponent,
    GenreDeletePopupComponent,
    GenreDeleteDialogComponent,
    genreRoute,
    genrePopupRoute,
} from './';

const ENTITY_STATES = [
    ...genreRoute,
    ...genrePopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        GenreComponent,
        GenreDetailComponent,
        GenreDialogComponent,
        GenreDeleteDialogComponent,
        GenrePopupComponent,
        GenreDeletePopupComponent,
    ],
    entryComponents: [
        GenreComponent,
        GenreDialogComponent,
        GenrePopupComponent,
        GenreDeleteDialogComponent,
        GenreDeletePopupComponent,
    ],
    providers: [
        GenreService,
        GenrePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3GenreModule {}
