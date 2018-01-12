
package com.rockbible3.service.dto.Ticketmaster;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Sales {

    @SerializedName("public")
    @Expose
    private Public _public;
    @SerializedName("presales")
    @Expose
    private List<Presale> presales = null;

    public Public getPublic() {
        return _public;
    }

    public void setPublic(Public _public) {
        this._public = _public;
    }

    public List<Presale> getPresales() {
        return presales;
    }

    public void setPresales(List<Presale> presales) {
        this.presales = presales;
    }

}
