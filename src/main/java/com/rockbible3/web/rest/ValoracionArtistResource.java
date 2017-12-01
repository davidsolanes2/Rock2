package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.domain.ValoracionArtist;

import com.rockbible3.repository.ValoracionArtistRepository;
import com.rockbible3.service.dto.ValoracionArtistStats;
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
 * REST controller for managing ValoracionArtist.
 */
@RestController
@RequestMapping("/api")
public class ValoracionArtistResource {

    private final Logger log = LoggerFactory.getLogger(ValoracionArtistResource.class);

    private static final String ENTITY_NAME = "valoracionArtist";

    private final ValoracionArtistRepository valoracionArtistRepository;

    public ValoracionArtistResource(ValoracionArtistRepository valoracionArtistRepository) {
        this.valoracionArtistRepository = valoracionArtistRepository;
    }

    /**
     * POST  /valoracion-artists : Create a new valoracionArtist.
     *
     * @param valoracionArtist the valoracionArtist to create
     * @return the ResponseEntity with status 201 (Created) and with body the new valoracionArtist, or with status 400 (Bad Request) if the valoracionArtist has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/valoracion-artists")
    @Timed
    public ResponseEntity<ValoracionArtist> createValoracionArtist(@RequestBody ValoracionArtist valoracionArtist) throws URISyntaxException {
        log.debug("REST request to save ValoracionArtist : {}", valoracionArtist);
        if (valoracionArtist.getId() != null) {
            throw new BadRequestAlertException("A new valoracionArtist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ValoracionArtist result = valoracionArtistRepository.save(valoracionArtist);
        return ResponseEntity.created(new URI("/api/valoracion-artists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /valoracion-artists : Updates an existing valoracionArtist.
     *
     * @param valoracionArtist the valoracionArtist to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated valoracionArtist,
     * or with status 400 (Bad Request) if the valoracionArtist is not valid,
     * or with status 500 (Internal Server Error) if the valoracionArtist couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/valoracion-artists")
    @Timed
    public ResponseEntity<ValoracionArtist> updateValoracionArtist(@RequestBody ValoracionArtist valoracionArtist) throws URISyntaxException {
        log.debug("REST request to update ValoracionArtist : {}", valoracionArtist);
        if (valoracionArtist.getId() == null) {
            return createValoracionArtist(valoracionArtist);
        }
        ValoracionArtist result = valoracionArtistRepository.save(valoracionArtist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, valoracionArtist.getId().toString()))
            .body(result);
    }

    /**
     * GET  /valoracion-artists : get all the valoracionArtists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of valoracionArtists in body
     */
    @GetMapping("/valoracion-artists")
    @Timed
    public List<ValoracionArtist> getAllValoracionArtists() {
        log.debug("REST request to get all ValoracionArtists");
        return valoracionArtistRepository.findAll();
        }

    /**
     * GET  /valoracion-artists/:id : get the "id" valoracionArtist.
     *
     * @param id the id of the valoracionArtist to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the valoracionArtist, or with status 404 (Not Found)
     */
    @GetMapping("/valoracion-artists/{id}")
    @Timed
    public ResponseEntity<ValoracionArtist> getValoracionArtist(@PathVariable Long id) {
        log.debug("REST request to get ValoracionArtist : {}", id);
        ValoracionArtist valoracionArtist = valoracionArtistRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(valoracionArtist));
    }

    @GetMapping("/artist-rating-stats/{id}")
    @Timed
    public ResponseEntity<ValoracionArtistStats> getStatsArtist(@PathVariable Long id){

        ValoracionArtistStats stats = valoracionArtistRepository.findArtistsStats(id);

        if (stats.getArtist() == null){
            stats = null;
        }
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stats));
    }

    /**
     * DELETE  /valoracion-artists/:id : delete the "id" valoracionArtist.
     *
     * @param id the id of the valoracionArtist to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/valoracion-artists/{id}")
    @Timed
    public ResponseEntity<Void> deleteValoracionArtist(@PathVariable Long id) {
        log.debug("REST request to delete ValoracionArtist : {}", id);
        valoracionArtistRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
