
package com.rockbible3.service.dto.Ticketmaster;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Ada {

    @SerializedName("adaPhones")
    @Expose
    private String adaPhones;
    @SerializedName("adaCustomCopy")
    @Expose
    private String adaCustomCopy;
    @SerializedName("adaHours")
    @Expose
    private String adaHours;

    public String getAdaPhones() {
        return adaPhones;
    }

    public void setAdaPhones(String adaPhones) {
        this.adaPhones = adaPhones;
    }

    public String getAdaCustomCopy() {
        return adaCustomCopy;
    }

    public void setAdaCustomCopy(String adaCustomCopy) {
        this.adaCustomCopy = adaCustomCopy;
    }

    public String getAdaHours() {
        return adaHours;
    }

    public void setAdaHours(String adaHours) {
        this.adaHours = adaHours;
    }

}
