
package com.rockbible3.service.dto.MusixMatch;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PrimaryGenres {

    @SerializedName("music_genre_list")
    @Expose
    private List<MusicGenreList> musicGenreList = null;

    public List<MusicGenreList> getMusicGenreList() {
        return musicGenreList;
    }

    public void setMusicGenreList(List<MusicGenreList> musicGenreList) {
        this.musicGenreList = musicGenreList;
    }

}
