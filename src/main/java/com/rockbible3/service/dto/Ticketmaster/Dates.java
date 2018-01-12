
package com.rockbible3.service.dto.Ticketmaster;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Dates {

    @SerializedName("start")
    @Expose
    private Start start;
    @SerializedName("timezone")
    @Expose
    private String timezone;
    @SerializedName("status")
    @Expose
    private Status status;
    @SerializedName("spanMultipleDays")
    @Expose
    private Boolean spanMultipleDays;

    public Start getStart() {
        return start;
    }

    public void setStart(Start start) {
        this.start = start;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Boolean getSpanMultipleDays() {
        return spanMultipleDays;
    }

    public void setSpanMultipleDays(Boolean spanMultipleDays) {
        this.spanMultipleDays = spanMultipleDays;
    }

}
