package com.rockbible3.service.dto;

import com.rockbible3.domain.Band;
import lombok.Data;

@Data

public class ValoracionBandStats extends ValoracionStats {

    private Band band;


    public ValoracionBandStats(Band band, Double avg, Integer max, Integer min) {
        super(avg, max, min);
        this.band = band;
    }
}
