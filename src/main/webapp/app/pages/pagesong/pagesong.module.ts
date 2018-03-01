import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import {
    PagesService,
    PagesComponent,
    PagesongRoute,
} from './';

const PAGE_SET_STATES = [
    ...PagesongRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        RouterModule.forRoot(PAGE_SET_STATES, { useHash: true })
    ],
    declarations: [
    PagesComponent,
],
    entryComponents: [
    PagesComponent,
],
    providers: [
    PagesService,
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class Rockbible3PagesongModule {}
