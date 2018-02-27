import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import {
    PhomeService,
    PhomeComponent,
    PagehomeRoute,
} from './';

const PAGE_SET_STATES = [
    ...PagehomeRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        RouterModule.forRoot(PAGE_SET_STATES, { useHash: true })
    ],
    declarations: [
    PhomeComponent,
],
    entryComponents: [
    PhomeComponent,
],
    providers: [
    PhomeService,
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class Rockbible3PagehomeModule {}
