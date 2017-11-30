package com.rockbible3.service.dto;

import com.rockbible3.domain.Artist;
import lombok.Data;


    @Data

public class ValoracionArtistStats extends ValoracionStats{


    private Artist artist;


        public ValoracionArtistStats(Double avg, Integer max, Integer min, Artist artist) {
            super(avg, max, min);
            this.artist = artist;
        }
    }
