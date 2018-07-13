package com.rockbible3.service.dto;


import com.rockbible3.domain.Album;

    public class ValoracionAlbumStats extends ValoracionStats{

        private Album album;

        public ValoracionAlbumStats(Album album, Double avg, Integer max, Integer min) {
            super(avg, max, min);
            this.album = album;
        }

        public Album getAlbum() {
            return album;
        }

        public void setAlbum(Album album) {
            this.album = album;
        }
    }
