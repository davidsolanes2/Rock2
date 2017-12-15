
package com.rockbible3.service.dto.MusixMatch;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Body {

    @SerializedName("track_list")
    @Expose
    private List<TrackList> trackList = null;

    public List<TrackList> getTrackList() {
        return trackList;
    }

    public void setTrackList(List<TrackList> trackList) {
        this.trackList = trackList;
    }

}
