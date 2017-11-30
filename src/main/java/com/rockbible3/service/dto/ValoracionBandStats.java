package com.rockbible3.service.dto;

import com.rockbible3.domain.Band;
import lombok.Data;

@Data

public class ValoracionBandStats extends ValoracionStats {

    private Band band;


    public ValoracionBandStats(Double avg, Integer max, Integer min, Band band) {
        super(avg, max, min);
        this.band = band;
    }
}
