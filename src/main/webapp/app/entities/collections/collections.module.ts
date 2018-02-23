import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import { Rockbible3AdminModule } from '../../admin/admin.module';
import {
    CollectionsService,
    CollectionsPopupService,
    CollectionsComponent,
    CollectionsDetailComponent,
    CollectionsDialogComponent,
    CollectionsPopupComponent,
    CollectionsDeletePopupComponent,
    CollectionsDeleteDialogComponent,
    collectionsRoute,
    collectionsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...collectionsRoute,
    ...collectionsPopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        Rockbible3AdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CollectionsComponent,
        CollectionsDetailComponent,
        CollectionsDialogComponent,
        CollectionsDeleteDialogComponent,
        CollectionsPopupComponent,
        CollectionsDeletePopupComponent,
    ],
    entryComponents: [
        CollectionsComponent,
        CollectionsDialogComponent,
        CollectionsPopupComponent,
        CollectionsDeleteDialogComponent,
        CollectionsDeletePopupComponent,
    ],
    providers: [
        CollectionsService,
        CollectionsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3CollectionsModule {}
