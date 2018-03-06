import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import { Rockbible3AdminModule } from '../../admin/admin.module';
import {
    CollectionsTicketMasterService,
    CollectionsTicketMasterPopupService,
    CollectionsTicketMasterComponent,
    CollectionsTicketMasterDetailComponent,
    CollectionsTicketMasterDialogComponent,
    CollectionsTicketMasterPopupComponent,
    CollectionsTicketMasterDeletePopupComponent,
    CollectionsTicketMasterDeleteDialogComponent,
    collectionsTicketMasterRoute,
    collectionsTicketMasterPopupRoute,
} from './';

const ENTITY_STATES = [
    ...collectionsTicketMasterRoute,
    ...collectionsTicketMasterPopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        Rockbible3AdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CollectionsTicketMasterComponent,
        CollectionsTicketMasterDetailComponent,
        CollectionsTicketMasterDialogComponent,
        CollectionsTicketMasterDeleteDialogComponent,
        CollectionsTicketMasterPopupComponent,
        CollectionsTicketMasterDeletePopupComponent,
    ],
    entryComponents: [
        CollectionsTicketMasterComponent,
        CollectionsTicketMasterDialogComponent,
        CollectionsTicketMasterPopupComponent,
        CollectionsTicketMasterDeleteDialogComponent,
        CollectionsTicketMasterDeletePopupComponent,
    ],
    providers: [
        CollectionsTicketMasterService,
        CollectionsTicketMasterPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3CollectionsTicketMasterModule {}
