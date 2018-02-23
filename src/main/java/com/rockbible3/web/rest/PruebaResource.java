package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.web.rest.util.HeaderUtil;
import com.rockbible3.web.rest.util.PaginationUtil;
import com.rockbible3.web.rest.vm.FromularioSaveVM;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Prueba.
 */
@RestController
@RequestMapping("/api/prueba")
public class PruebaResource {

    private final Logger log = LoggerFactory.getLogger(PruebaResource.class);

    /**
     * POST  /fromulario : Save fromulario.
     *
     * @param fromularioSaveVM the fromulario to save
     * @return the ResponseEntity with status 201 (Created) and with body the new FromularioSaveVM, or with status 400 (Bad Request) if the fromulario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fromulario")
    @Timed
    public ResponseEntity postFromulario(@RequestBody FromularioSaveVM fromularioSaveVM) throws URISyntaxException {
        log.debug("REST request to save FromularioSaveVM : {}", fromularioSaveVM);
        //TODO please code the save of page data.
        return ResponseEntity.ok().build();
    }

}
