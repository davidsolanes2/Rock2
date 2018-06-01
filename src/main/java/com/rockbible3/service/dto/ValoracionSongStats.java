package com.rockbible3.service.dto;

import com.rockbible3.domain.Song;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ValoracionSongStats extends ValoracionStats{

    private Song song;

    public ValoracionSongStats(Song song, Double avg, Integer max, Integer min) {
        super(avg, max, min);
        this.song = song;
    }
}
