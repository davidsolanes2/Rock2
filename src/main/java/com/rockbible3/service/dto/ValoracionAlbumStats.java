package com.rockbible3.service.dto;


import com.rockbible3.domain.Album;
import lombok.Data;

    @Data
    public class ValoracionAlbumStats extends ValoracionStats{

        private Album album;

        public ValoracionAlbumStats(Album album, Double avg, Integer max, Integer min) {
            super(avg, max, min);
            this.album = album;
        }


    }
