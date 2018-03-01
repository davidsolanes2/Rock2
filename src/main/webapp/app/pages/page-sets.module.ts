import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Rockbible3PageartistModule } from './pageartist/pageartist.module';
import { Rockbible3PageconciertosModule } from './pageconciertos/pageconciertos.module';
import { Rockbible3PagehomeModule } from './pagehome/pagehome.module';
import { Rockbible3PagesongModule } from './pagesong/pagesong.module';
import { Rockbible3PruebaModule } from './prueba/prueba.module';
import { Rockbible3PageregisterModule } from './pageregister/pageregister.module';
/* jhipster-needle-add-pageset-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Rockbible3PageartistModule,
        Rockbible3PageconciertosModule,
        Rockbible3PagehomeModule,
        Rockbible3PagesongModule,
        Rockbible3PruebaModule,
        Rockbible3PageregisterModule,
        /* jhipster-needle-add-pageset-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3PageSetsModule {}
