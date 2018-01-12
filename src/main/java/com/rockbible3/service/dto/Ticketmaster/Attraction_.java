
package com.rockbible3.service.dto.Ticketmaster;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Attraction_ {

    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("test")
    @Expose
    private Boolean test;
    @SerializedName("url")
    @Expose
    private String url;
    @SerializedName("locale")
    @Expose
    private String locale;
    @SerializedName("externalLinks")
    @Expose
    private ExternalLinks externalLinks;
    @SerializedName("images")
    @Expose
    private List<Image__> images = null;
    @SerializedName("classifications")
    @Expose
    private List<Classification_> classifications = null;
    @SerializedName("upcomingEvents")
    @Expose
    private UpcomingEvents_ upcomingEvents;
    @SerializedName("_links")
    @Expose
    private Links__ links;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getTest() {
        return test;
    }

    public void setTest(Boolean test) {
        this.test = test;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public ExternalLinks getExternalLinks() {
        return externalLinks;
    }

    public void setExternalLinks(ExternalLinks externalLinks) {
        this.externalLinks = externalLinks;
    }

    public List<Image__> getImages() {
        return images;
    }

    public void setImages(List<Image__> images) {
        this.images = images;
    }

    public List<Classification_> getClassifications() {
        return classifications;
    }

    public void setClassifications(List<Classification_> classifications) {
        this.classifications = classifications;
    }

    public UpcomingEvents_ getUpcomingEvents() {
        return upcomingEvents;
    }

    public void setUpcomingEvents(UpcomingEvents_ upcomingEvents) {
        this.upcomingEvents = upcomingEvents;
    }

    public Links__ getLinks() {
        return links;
    }

    public void setLinks(Links__ links) {
        this.links = links;
    }

}
