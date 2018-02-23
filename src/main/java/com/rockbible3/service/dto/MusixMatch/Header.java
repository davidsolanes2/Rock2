
package com.rockbible3.service.dto.MusixMatch;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Header {

    @SerializedName("status_code")
    @Expose
    private Integer statusCode;
    @SerializedName("execute_time")
    @Expose
    private Double executeTime;
    @SerializedName("available")
    @Expose
    private Integer available;

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public Double getExecuteTime() {
        return executeTime;
    }

    public void setExecuteTime(Double executeTime) {
        this.executeTime = executeTime;
    }

    public Integer getAvailable() {
        return available;
    }

    public void setAvailable(Integer available) {
        this.available = available;
    }

}
