import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import {
    FromularioService,
    FromularioComponent,
    PruebaRoute,
} from './';

const PAGE_SET_STATES = [
    ...PruebaRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        RouterModule.forRoot(PAGE_SET_STATES, { useHash: true })
    ],
    declarations: [
    FromularioComponent,
],
    entryComponents: [
    FromularioComponent,
],
    providers: [
    FromularioService,
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class Rockbible3PruebaModule {}
