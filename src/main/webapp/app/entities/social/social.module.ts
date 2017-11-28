import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rockbible3SharedModule } from '../../shared';
import {
    SocialService,
    SocialPopupService,
    SocialComponent,
    SocialDetailComponent,
    SocialDialogComponent,
    SocialPopupComponent,
    SocialDeletePopupComponent,
    SocialDeleteDialogComponent,
    socialRoute,
    socialPopupRoute,
} from './';

const ENTITY_STATES = [
    ...socialRoute,
    ...socialPopupRoute,
];

@NgModule({
    imports: [
        Rockbible3SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SocialComponent,
        SocialDetailComponent,
        SocialDialogComponent,
        SocialDeleteDialogComponent,
        SocialPopupComponent,
        SocialDeletePopupComponent,
    ],
    entryComponents: [
        SocialComponent,
        SocialDialogComponent,
        SocialPopupComponent,
        SocialDeleteDialogComponent,
        SocialDeletePopupComponent,
    ],
    providers: [
        SocialService,
        SocialPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3SocialModule {}
