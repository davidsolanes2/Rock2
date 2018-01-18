
package com.rockbible3.service.dto.Ticketmaster;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class ExternalLinks {

    @SerializedName("youtube")
    @Expose
    private List<Youtube> youtube = null;
    @SerializedName("twitter")
    @Expose
    private List<Twitter> twitter = null;
    @SerializedName("lastfm")
    @Expose
    private List<Lastfm> lastfm = null;
    @SerializedName("facebook")
    @Expose
    private List<Facebook> facebook = null;
    @SerializedName("wiki")
    @Expose
    private List<Wiki> wiki = null;
    @SerializedName("instagram")
    @Expose
    private List<Instagram> instagram = null;
    @SerializedName("musicbrainz")
    @Expose
    private List<Musicbrainz> musicbrainz = null;
    @SerializedName("homepage")
    @Expose
    private List<Homepage> homepage = null;

    public List<Youtube> getYoutube() {
        return youtube;
    }

    public void setYoutube(List<Youtube> youtube) {
        this.youtube = youtube;
    }

    public List<Twitter> getTwitter() {
        return twitter;
    }

    public void setTwitter(List<Twitter> twitter) {
        this.twitter = twitter;
    }

    public List<Lastfm> getLastfm() {
        return lastfm;
    }

    public void setLastfm(List<Lastfm> lastfm) {
        this.lastfm = lastfm;
    }

    public List<Facebook> getFacebook() {
        return facebook;
    }

    public void setFacebook(List<Facebook> facebook) {
        this.facebook = facebook;
    }

    public List<Wiki> getWiki() {
        return wiki;
    }

    public void setWiki(List<Wiki> wiki) {
        this.wiki = wiki;
    }

    public List<Instagram> getInstagram() {
        return instagram;
    }

    public void setInstagram(List<Instagram> instagram) {
        this.instagram = instagram;
    }

    public List<Musicbrainz> getMusicbrainz() {
        return musicbrainz;
    }

    public void setMusicbrainz(List<Musicbrainz> musicbrainz) {
        this.musicbrainz = musicbrainz;
    }

    public List<Homepage> getHomepage() {
        return homepage;
    }

    public void setHomepage(List<Homepage> homepage) {
        this.homepage = homepage;
    }

}
