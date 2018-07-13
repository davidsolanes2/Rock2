package com.rockbible3.service.dto;

import com.rockbible3.domain.Artist;




public class ValoracionArtistStats extends ValoracionStats{


    private Artist artist;



        public ValoracionArtistStats(Artist artist, Double avg, Integer max, Integer min) {
            super(avg, max, min);
            this.artist = artist;
        }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }
}
