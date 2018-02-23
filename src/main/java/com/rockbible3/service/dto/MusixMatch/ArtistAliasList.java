
package com.rockbible3.service.dto.MusixMatch;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ArtistAliasList {

    @SerializedName("artist_alias")
    @Expose
    private String artistAlias;

    public String getArtistAlias() {
        return artistAlias;
    }

    public void setArtistAlias(String artistAlias) {
        this.artistAlias = artistAlias;
    }

}
