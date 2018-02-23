import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Rockbible3PruebaModule } from './prueba/prueba.module';
/* jhipster-needle-add-pageset-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Rockbible3PruebaModule,
        /* jhipster-needle-add-pageset-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3PageSetsModule {}
