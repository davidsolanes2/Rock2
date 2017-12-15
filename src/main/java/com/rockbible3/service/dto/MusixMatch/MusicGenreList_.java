
package com.rockbible3.service.dto.MusixMatch;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class MusicGenreList_ {

    @SerializedName("music_genre")
    @Expose
    private MusicGenre_ musicGenre;

    public MusicGenre_ getMusicGenre() {
        return musicGenre;
    }

    public void setMusicGenre(MusicGenre_ musicGenre) {
        this.musicGenre = musicGenre;
    }

}
