import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Rockbible3CountryModule } from './country/country.module';
import { Rockbible3GenreModule } from './genre/genre.module';
import { Rockbible3AlbumModule } from './album/album.module';
import { Rockbible3SongModule } from './song/song.module';
import { Rockbible3ArtistModule } from './artist/artist.module';
import { Rockbible3BandModule } from './band/band.module';
import { Rockbible3SocialModule } from './social/social.module';
import { Rockbible3InstrumentModule } from './instrument/instrument.module';
import { Rockbible3LabelModule } from './label/label.module';
import { Rockbible3UserExtModule } from './user-ext/user-ext.module';
import { Rockbible3ValoracionAlbumModule } from './valoracion-album/valoracion-album.module';
import { Rockbible3ValoracionSongModule } from './valoracion-song/valoracion-song.module';
import { Rockbible3ValoracionArtistModule } from './valoracion-artist/valoracion-artist.module';
import { Rockbible3ValoracionBandModule } from './valoracion-band/valoracion-band.module';
import { Rockbible3CollectionsModule } from './collections/collections.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Rockbible3CountryModule,
        Rockbible3GenreModule,
        Rockbible3AlbumModule,
        Rockbible3SongModule,
        Rockbible3ArtistModule,
        Rockbible3BandModule,
        Rockbible3SocialModule,
        Rockbible3InstrumentModule,
        Rockbible3LabelModule,
        Rockbible3UserExtModule,
        Rockbible3ValoracionAlbumModule,
        Rockbible3ValoracionSongModule,
        Rockbible3ValoracionArtistModule,
        Rockbible3ValoracionBandModule,
        Rockbible3CollectionsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Rockbible3EntityModule {}
