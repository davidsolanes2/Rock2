package com.rockbible3.service.dto;

import com.rockbible3.domain.Song;
import lombok.Data;

@Data

public class ValoracionSongStats extends ValoracionStats{

    private Song song;

    public ValoracionSongStats(Double avg, Integer max, Integer min, Song song) {
        super(avg, max, min);
        this.song = song;
    }
}
