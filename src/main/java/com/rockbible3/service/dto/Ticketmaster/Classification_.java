
package com.rockbible3.service.dto.Ticketmaster;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Classification_ {

    @SerializedName("primary")
    @Expose
    private Boolean primary;
    @SerializedName("segment")
    @Expose
    private Segment_ segment;
    @SerializedName("genre")
    @Expose
    private Genre_ genre;
    @SerializedName("subGenre")
    @Expose
    private SubGenre_ subGenre;
    @SerializedName("type")
    @Expose
    private Type_ type;
    @SerializedName("subType")
    @Expose
    private SubType_ subType;

    public Boolean getPrimary() {
        return primary;
    }

    public void setPrimary(Boolean primary) {
        this.primary = primary;
    }

    public Segment_ getSegment() {
        return segment;
    }

    public void setSegment(Segment_ segment) {
        this.segment = segment;
    }

    public Genre_ getGenre() {
        return genre;
    }

    public void setGenre(Genre_ genre) {
        this.genre = genre;
    }

    public SubGenre_ getSubGenre() {
        return subGenre;
    }

    public void setSubGenre(SubGenre_ subGenre) {
        this.subGenre = subGenre;
    }

    public Type_ getType() {
        return type;
    }

    public void setType(Type_ type) {
        this.type = type;
    }

    public SubType_ getSubType() {
        return subType;
    }

    public void setSubType(SubType_ subType) {
        this.subType = subType;
    }

}
