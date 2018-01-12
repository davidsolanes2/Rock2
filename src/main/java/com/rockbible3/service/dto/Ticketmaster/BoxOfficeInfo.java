
package com.rockbible3.service.dto.Ticketmaster;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class BoxOfficeInfo {

    @SerializedName("phoneNumberDetail")
    @Expose
    private String phoneNumberDetail;
    @SerializedName("openHoursDetail")
    @Expose
    private String openHoursDetail;
    @SerializedName("acceptedPaymentDetail")
    @Expose
    private String acceptedPaymentDetail;
    @SerializedName("willCallDetail")
    @Expose
    private String willCallDetail;

    public String getPhoneNumberDetail() {
        return phoneNumberDetail;
    }

    public void setPhoneNumberDetail(String phoneNumberDetail) {
        this.phoneNumberDetail = phoneNumberDetail;
    }

    public String getOpenHoursDetail() {
        return openHoursDetail;
    }

    public void setOpenHoursDetail(String openHoursDetail) {
        this.openHoursDetail = openHoursDetail;
    }

    public String getAcceptedPaymentDetail() {
        return acceptedPaymentDetail;
    }

    public void setAcceptedPaymentDetail(String acceptedPaymentDetail) {
        this.acceptedPaymentDetail = acceptedPaymentDetail;
    }

    public String getWillCallDetail() {
        return willCallDetail;
    }

    public void setWillCallDetail(String willCallDetail) {
        this.willCallDetail = willCallDetail;
    }

}
