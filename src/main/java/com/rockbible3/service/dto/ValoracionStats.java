package com.rockbible3.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

//Genera getters, setters, etc...
@Data

//Genera constructor con todos los parametros
@AllArgsConstructor

public class ValoracionStats {


    private Double avg;
    private Integer max;
    private Integer min;
}
