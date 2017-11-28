package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.domain.ValoracionBand;

import com.rockbible3.repository.ValoracionBandRepository;
import com.rockbible3.web.rest.errors.BadRequestAlertException;
import com.rockbible3.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ValoracionBand.
 */
@RestController
@RequestMapping("/api")
public class ValoracionBandResource {

    private final Logger log = LoggerFactory.getLogger(ValoracionBandResource.class);

    private static final String ENTITY_NAME = "valoracionBand";

    private final ValoracionBandRepository valoracionBandRepository;

    public ValoracionBandResource(ValoracionBandRepository valoracionBandRepository) {
        this.valoracionBandRepository = valoracionBandRepository;
    }

    /**
     * POST  /valoracion-bands : Create a new valoracionBand.
     *
     * @param valoracionBand the valoracionBand to create
     * @return the ResponseEntity with status 201 (Created) and with body the new valoracionBand, or with status 400 (Bad Request) if the valoracionBand has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/valoracion-bands")
    @Timed
    public ResponseEntity<ValoracionBand> createValoracionBand(@RequestBody ValoracionBand valoracionBand) throws URISyntaxException {
        log.debug("REST request to save ValoracionBand : {}", valoracionBand);
        if (valoracionBand.getId() != null) {
            throw new BadRequestAlertException("A new valoracionBand cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ValoracionBand result = valoracionBandRepository.save(valoracionBand);
        return ResponseEntity.created(new URI("/api/valoracion-bands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /valoracion-bands : Updates an existing valoracionBand.
     *
     * @param valoracionBand the valoracionBand to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated valoracionBand,
     * or with status 400 (Bad Request) if the valoracionBand is not valid,
     * or with status 500 (Internal Server Error) if the valoracionBand couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/valoracion-bands")
    @Timed
    public ResponseEntity<ValoracionBand> updateValoracionBand(@RequestBody ValoracionBand valoracionBand) throws URISyntaxException {
        log.debug("REST request to update ValoracionBand : {}", valoracionBand);
        if (valoracionBand.getId() == null) {
            return createValoracionBand(valoracionBand);
        }
        ValoracionBand result = valoracionBandRepository.save(valoracionBand);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, valoracionBand.getId().toString()))
            .body(result);
    }

    /**
     * GET  /valoracion-bands : get all the valoracionBands.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of valoracionBands in body
     */
    @GetMapping("/valoracion-bands")
    @Timed
    public List<ValoracionBand> getAllValoracionBands() {
        log.debug("REST request to get all ValoracionBands");
        return valoracionBandRepository.findAll();
        }

    /**
     * GET  /valoracion-bands/:id : get the "id" valoracionBand.
     *
     * @param id the id of the valoracionBand to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the valoracionBand, or with status 404 (Not Found)
     */
    @GetMapping("/valoracion-bands/{id}")
    @Timed
    public ResponseEntity<ValoracionBand> getValoracionBand(@PathVariable Long id) {
        log.debug("REST request to get ValoracionBand : {}", id);
        ValoracionBand valoracionBand = valoracionBandRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(valoracionBand));
    }

    /**
     * DELETE  /valoracion-bands/:id : delete the "id" valoracionBand.
     *
     * @param id the id of the valoracionBand to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/valoracion-bands/{id}")
    @Timed
    public ResponseEntity<Void> deleteValoracionBand(@PathVariable Long id) {
        log.debug("REST request to delete ValoracionBand : {}", id);
        valoracionBandRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
