package com.rockbible3.web.rest.vm;


import javax.validation.constraints.*;

/**
 * View Model Class to Save page fromulario.
 */

public class FromularioSaveVM{

@Pattern(regexp = "[a-d]")
    private String prueba;



    public String getPrueba() {
        return prueba;
    }

    public FromularioSaveVM prueba(String prueba) {
        this.prueba = prueba;
        return this;
    }

    public void setPrueba(String prueba) {
    this.prueba = prueba;
    }

    @Override
    public String toString() {
        return "FromularioSaveVM{" +
        
        ", prueba='" + getPrueba() + "'" +
        "}";
    }


// jhipster-needle-page-add-getters-setters - Jhipster will add getters and setters here, do not remove

}
