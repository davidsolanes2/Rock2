package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.domain.ValoracionSong;

import com.rockbible3.repository.ValoracionSongRepository;
import com.rockbible3.service.dto.ValoracionSongStats;
import com.rockbible3.web.rest.errors.BadRequestAlertException;
import com.rockbible3.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ValoracionSong.
 */
@RestController
@RequestMapping("/api")
public class ValoracionSongResource {

    private final Logger log = LoggerFactory.getLogger(ValoracionSongResource.class);

    private static final String ENTITY_NAME = "valoracionSong";

    private final ValoracionSongRepository valoracionSongRepository;

    public ValoracionSongResource(ValoracionSongRepository valoracionSongRepository) {
        this.valoracionSongRepository = valoracionSongRepository;
    }

    /**
     * POST  /valoracion-songs : Create a new valoracionSong.
     *
     * @param valoracionSong the valoracionSong to create
     * @return the ResponseEntity with status 201 (Created) and with body the new valoracionSong, or with status 400 (Bad Request) if the valoracionSong has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/valoracion-songs")
    @Timed
    public ResponseEntity<ValoracionSong> createValoracionSong(@RequestBody ValoracionSong valoracionSong) throws URISyntaxException {
        log.debug("REST request to save ValoracionSong : {}", valoracionSong);
        if (valoracionSong.getId() != null) {
            throw new BadRequestAlertException("A new valoracionSong cannot already have an ID", ENTITY_NAME, "idexists");
        }

        valoracionSong.setTimestamp(ZonedDateTime.now());

        ValoracionSong result = valoracionSongRepository.save(valoracionSong);
        return ResponseEntity.created(new URI("/api/valoracion-songs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /valoracion-songs : Updates an existing valoracionSong.
     *
     * @param valoracionSong the valoracionSong to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated valoracionSong,
     * or with status 400 (Bad Request) if the valoracionSong is not valid,
     * or with status 500 (Internal Server Error) if the valoracionSong couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/valoracion-songs")
    @Timed
    public ResponseEntity<ValoracionSong> updateValoracionSong(@RequestBody ValoracionSong valoracionSong) throws URISyntaxException {
        log.debug("REST request to update ValoracionSong : {}", valoracionSong);
        if (valoracionSong.getId() == null) {
            return createValoracionSong(valoracionSong);
        }
        ValoracionSong result = valoracionSongRepository.save(valoracionSong);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, valoracionSong.getId().toString()))
            .body(result);
    }

    /**
     * GET  /valoracion-songs : get all the valoracionSongs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of valoracionSongs in body
     */
    @GetMapping("/valoracion-songs")
    @Timed
    public List<ValoracionSong> getAllValoracionSongs() {
        log.debug("REST request to get all ValoracionSongs");
        return valoracionSongRepository.findAll();
        }

    /**
     * GET  /valoracion-songs/:id : get the "id" valoracionSong.
     *
     * @param id the id of the valoracionSong to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the valoracionSong, or with status 404 (Not Found)
     */
    @GetMapping("/valoracion-songs/{id}")
    @Timed
    public ResponseEntity<ValoracionSong> getValoracionSong(@PathVariable Long id) {
        log.debug("REST request to get ValoracionSong : {}", id);
        ValoracionSong valoracionSong = valoracionSongRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(valoracionSong));
    }

    @GetMapping("/song-rating-stats/{id}")
    @Timed
    public ResponseEntity<ValoracionSongStats> getStatsSong(@PathVariable Long id) {

        ValoracionSongStats stats = valoracionSongRepository.findSongsStats(id);

        if (stats.getSong() == null) {
            stats = null;

        }
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stats));
    }

    /**
     * DELETE  /valoracion-songs/:id : delete the "id" valoracionSong.
     *
     * @param id the id of the valoracionSong to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/valoracion-songs/{id}")
    @Timed
    public ResponseEntity<Void> deleteValoracionSong(@PathVariable Long id) {
        log.debug("REST request to delete ValoracionSong : {}", id);
        valoracionSongRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
