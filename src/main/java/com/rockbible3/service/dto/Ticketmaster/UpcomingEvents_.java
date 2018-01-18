
package com.rockbible3.service.dto.Ticketmaster;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UpcomingEvents_ {

    @SerializedName("_total")
    @Expose
    private Integer total;
    @SerializedName("mfx-nl")
    @Expose
    private Integer mfxNl;
    @SerializedName("tmr")
    @Expose
    private Integer tmr;
    @SerializedName("ticketmaster")
    @Expose
    private Integer ticketmaster;
    @SerializedName("mfx-be")
    @Expose
    private Integer mfxBe;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getMfxNl() {
        return mfxNl;
    }

    public void setMfxNl(Integer mfxNl) {
        this.mfxNl = mfxNl;
    }

    public Integer getTmr() {
        return tmr;
    }

    public void setTmr(Integer tmr) {
        this.tmr = tmr;
    }

    public Integer getTicketmaster() {
        return ticketmaster;
    }

    public void setTicketmaster(Integer ticketmaster) {
        this.ticketmaster = ticketmaster;
    }

    public Integer getMfxBe() {
        return mfxBe;
    }

    public void setMfxBe(Integer mfxBe) {
        this.mfxBe = mfxBe;
    }

}
