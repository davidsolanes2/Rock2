package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.domain.Collections;

import com.rockbible3.repository.CollectionsRepository;
import com.rockbible3.repository.UserRepository;
import com.rockbible3.security.SecurityUtils;
import com.rockbible3.web.rest.errors.BadRequestAlertException;
import com.rockbible3.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.*;
import java.util.stream.Collectors;

/**
 * REST controller for managing Collections.
 */
@RestController
@RequestMapping("/api")
public class CollectionsResource {

    private final Logger log = LoggerFactory.getLogger(CollectionsResource.class);

    private static final String ENTITY_NAME = "collections";

    private final CollectionsRepository collectionsRepository;

    @Autowired
    private UserRepository userRepository;

    public CollectionsResource(CollectionsRepository collectionsRepository) {
        this.collectionsRepository = collectionsRepository;
    }

    /**
     * POST  /collections : Create a new collections.
     *
     * @param collections the collections to create
     * @return the ResponseEntity with status 201 (Created) and with body the new collections, or with status 400 (Bad Request) if the collections has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/collections")
    @Timed
    public ResponseEntity<Collections> createCollections(@RequestBody Collections collections) throws URISyntaxException {
        log.debug("REST request to save Collections : {}", collections);
        if (collections.getId() != null) {
            throw new BadRequestAlertException("A new collections cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Collections result = collectionsRepository.save(collections);
        return ResponseEntity.created(new URI("/api/collections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/collections/songs/{idNapster:.+}")
    @Timed
    public ResponseEntity<Collections> likeCollections(@PathVariable String idNapster) throws URISyntaxException {
        log.debug("REST request to Like a Song : {}", idNapster);

        Collections collections = new Collections();
        collections.setNapsterId(idNapster);
        collections.setType("song");
        collections.setUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get());

        Collections result = collectionsRepository.save(collections);

        return ResponseEntity.created(new URI("/api/collections/songs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /collections : Updates an existing collections.
     *
     * @param collections the collections to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated collections,
     * or with status 400 (Bad Request) if the collections is not valid,
     * or with status 500 (Internal Server Error) if the collections couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/collections")
    @Timed
    public ResponseEntity<Collections> updateCollections(@RequestBody Collections collections) throws URISyntaxException {
        log.debug("REST request to update Collections : {}", collections);
        if (collections.getId() == null) {
            return createCollections(collections);
        }
        Collections result = collectionsRepository.save(collections);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, collections.getId().toString()))
            .body(result);
    }

    /**
     * GET  /collections : get all the collections.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of collections in body
     */
    @GetMapping("/collections")
    @Timed
    public List<Collections> getAllCollections() {
        log.debug("REST request to get all Collections");
        return collectionsRepository.findAll();
    }

    /**
     * GET  /collections/:id : get the "id" collections.
     *
     * @param id the id of the collections to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the collections, or with status 404 (Not Found)
     */
    @GetMapping("/collections/{id}")
    @Timed
    public ResponseEntity<Collections> getCollections(@PathVariable Long id) {
        log.debug("REST request to get Collections : {}", id);
        Collections collections = collectionsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(collections));
    }

    @GetMapping("/collections/NapsterbyUser")
    @Timed
    public ResponseEntity<List<Collections>> getCollectionsNapsterbyUser() {
        log.debug("REST request to get Collections : {}");
        List<Collections> collections = collectionsRepository.findAllByUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get());
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(collections));
    }

    @GetMapping("/collections/topSongs/liked")
    @Timed
    public List<Collections> getTopSongLikedbyUser(@RequestParam("ids") String ids) {
        log.debug("REST request to get all Collections");
        return collectionsRepository.
            findByNapsterIdInAndUserLogin(
                Arrays.asList(ids.split(",")), SecurityUtils.getCurrentUserLogin())
            .stream()
            .collect(Collectors.toList());
    }

    /**
     * DELETE  /collections/:id : delete the "id" collections.
     *
     * @param id the id of the collections to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/collections/{id}")
    @Timed
    public ResponseEntity<Void> deleteCollections(@PathVariable Long id) {
        log.debug("REST request to delete Collections : {}", id);
        collectionsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @DeleteMapping("/collections/{idNapster:.+}")
    @Timed
    public ResponseEntity<Void> deleteCollectionsNapster(@PathVariable Long idNapster) {
        log.debug("REST request to delete Collections Napster : {}", idNapster);
        List<Collections> collection = collectionsRepository.findByUserAndNapsterId(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).get(), idNapster.toString());
        collectionsRepository.delete(collection.get(0));
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, idNapster.toString())).build();
    }
}
