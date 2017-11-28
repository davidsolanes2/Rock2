import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import {
    LabelService,
    LabelPopupService,
    LabelComponent,
    LabelDetailComponent,
    LabelDialogComponent,
    LabelPopupComponent,
    LabelDeletePopupComponent,
    LabelDeleteDialogComponent,
    labelRoute,
    labelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...labelRoute,
    ...labelPopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LabelComponent,
        LabelDetailComponent,
        LabelDialogComponent,
        LabelDeleteDialogComponent,
        LabelPopupComponent,
        LabelDeletePopupComponent,
    ],
    entryComponents: [
        LabelComponent,
        LabelDialogComponent,
        LabelPopupComponent,
        LabelDeleteDialogComponent,
        LabelDeletePopupComponent,
    ],
    providers: [
        LabelService,
        LabelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3LabelModule {}
