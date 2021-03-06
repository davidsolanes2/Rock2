
package com.rockbible3.service.dto.Napster;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class NapsterTracksDTO {

    @SerializedName("meta")
    @Expose
    private Meta meta;
    @SerializedName("tracks")
    @Expose
    private List<Track> tracks = null;

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

}
