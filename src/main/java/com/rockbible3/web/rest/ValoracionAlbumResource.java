package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.domain.Album;
import com.rockbible3.domain.User;
import com.rockbible3.domain.ValoracionAlbum;
import com.rockbible3.repository.ValoracionAlbumRepository;
import com.rockbible3.service.dto.ValoracionAlbumStats;
import com.rockbible3.web.rest.errors.BadRequestAlertException;
import com.rockbible3.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ValoracionAlbum.
 */
@RestController
@RequestMapping("/api")
public class ValoracionAlbumResource {

    private final Logger log = LoggerFactory.getLogger(ValoracionAlbumResource.class);

    private static final String ENTITY_NAME = "valoracionAlbum";

    private final ValoracionAlbumRepository valoracionAlbumRepository;

    public ValoracionAlbumResource(ValoracionAlbumRepository valoracionAlbumRepository) {
        this.valoracionAlbumRepository = valoracionAlbumRepository;
    }

    /**
     * POST  /valoracion-albums : Create a new valoracionAlbum.
     *
     * @param valoracionAlbum the valoracionAlbum to create
     * @return the ResponseEntity with status 201 (Created) and with body the new valoracionAlbum, or with status 400 (Bad Request) if the valoracionAlbum has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/valoracion-albums")
    @Timed
    public ResponseEntity<ValoracionAlbum> createValoracionAlbum(@RequestBody ValoracionAlbum valoracionAlbum) throws URISyntaxException {
        log.debug("REST request to save ValoracionAlbum : {}", valoracionAlbum);
        if (valoracionAlbum.getId() != null) {
            throw new BadRequestAlertException("A new valoracionAlbum cannot already have an ID", ENTITY_NAME, "idexists");
        }

        valoracionAlbum.setTimestamp(ZonedDateTime.now());

        ValoracionAlbum result = valoracionAlbumRepository.save(valoracionAlbum);
        return ResponseEntity.created(new URI("/api/valoracion-albums/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /valoracion-albums : Updates an existing valoracionAlbum.
     *
     * @param valoracionAlbum the valoracionAlbum to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated valoracionAlbum,
     * or with status 400 (Bad Request) if the valoracionAlbum is not valid,
     * or with status 500 (Internal Server Error) if the valoracionAlbum couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/valoracion-albums")
    @Timed
    public ResponseEntity<ValoracionAlbum> updateValoracionAlbum(@RequestBody ValoracionAlbum valoracionAlbum) throws URISyntaxException {
        log.debug("REST request to update ValoracionAlbum : {}", valoracionAlbum);
        if (valoracionAlbum.getId() == null) {
            return createValoracionAlbum(valoracionAlbum);
        }
        ValoracionAlbum result = valoracionAlbumRepository.save(valoracionAlbum);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, valoracionAlbum.getId().toString()))
            .body(result);
    }

    /**
     * GET  /valoracion-albums : get all the valoracionAlbums.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of valoracionAlbums in body
     */
    @GetMapping("/valoracion-albums")
    @Timed
    public List<ValoracionAlbum> getAllValoracionAlbums() {
        log.debug("REST request to get all ValoracionAlbums");
        return valoracionAlbumRepository.findAll();
        }

    /**
     * GET  /valoracion-albums/:id : get the "id" valoracionAlbum.
     *
     * @param id the id of the valoracionAlbum to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the valoracionAlbum, or with status 404 (Not Found)
     */
    @GetMapping("/valoracion-albums/{id}")
    @Timed
    public ResponseEntity<ValoracionAlbum> getValoracionAlbum(@PathVariable Long id) {
        log.debug("REST request to get ValoracionAlbum : {}", id);
        ValoracionAlbum valoracionAlbum = valoracionAlbumRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(valoracionAlbum));
    }

    @GetMapping("/album-rating-stats/{id}")
    @Timed
    public ResponseEntity<ValoracionAlbumStats> getStatsAlbum(@PathVariable Long id) {

        ValoracionAlbumStats stats = valoracionAlbumRepository.findAlbumsStats(id);

        if (stats.getAlbum() == null) {
            stats = null;

        }
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stats));
    }


    /**
     * DELETE  /valoracion-albums/:id : delete the "id" valoracionAlbum.
     *
     * @param id the id of the valoracionAlbum to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/valoracion-albums/{id}")
    @Timed
    public ResponseEntity<Void> deleteValoracionAlbum(@PathVariable Long id) {
        log.debug("REST request to delete ValoracionAlbum : {}", id);
        valoracionAlbumRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
