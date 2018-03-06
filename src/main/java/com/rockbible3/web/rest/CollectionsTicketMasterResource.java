package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.domain.CollectionsTicketMaster;

import com.rockbible3.repository.CollectionsTicketMasterRepository;
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
 * REST controller for managing CollectionsTicketMaster.
 */
@RestController
@RequestMapping("/api")
public class CollectionsTicketMasterResource {

    private final Logger log = LoggerFactory.getLogger(CollectionsTicketMasterResource.class);

    private static final String ENTITY_NAME = "collectionsTicketMaster";

    private final CollectionsTicketMasterRepository collectionsTicketMasterRepository;

    public CollectionsTicketMasterResource(CollectionsTicketMasterRepository collectionsTicketMasterRepository) {
        this.collectionsTicketMasterRepository = collectionsTicketMasterRepository;
    }

    /**
     * POST  /collections-ticket-masters : Create a new collectionsTicketMaster.
     *
     * @param collectionsTicketMaster the collectionsTicketMaster to create
     * @return the ResponseEntity with status 201 (Created) and with body the new collectionsTicketMaster, or with status 400 (Bad Request) if the collectionsTicketMaster has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/collections-ticket-masters")
    @Timed
    public ResponseEntity<CollectionsTicketMaster> createCollectionsTicketMaster(@RequestBody CollectionsTicketMaster collectionsTicketMaster) throws URISyntaxException {
        log.debug("REST request to save CollectionsTicketMaster : {}", collectionsTicketMaster);
        if (collectionsTicketMaster.getId() != null) {
            throw new BadRequestAlertException("A new collectionsTicketMaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CollectionsTicketMaster result = collectionsTicketMasterRepository.save(collectionsTicketMaster);
        return ResponseEntity.created(new URI("/api/collections-ticket-masters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /collections-ticket-masters : Updates an existing collectionsTicketMaster.
     *
     * @param collectionsTicketMaster the collectionsTicketMaster to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated collectionsTicketMaster,
     * or with status 400 (Bad Request) if the collectionsTicketMaster is not valid,
     * or with status 500 (Internal Server Error) if the collectionsTicketMaster couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/collections-ticket-masters")
    @Timed
    public ResponseEntity<CollectionsTicketMaster> updateCollectionsTicketMaster(@RequestBody CollectionsTicketMaster collectionsTicketMaster) throws URISyntaxException {
        log.debug("REST request to update CollectionsTicketMaster : {}", collectionsTicketMaster);
        if (collectionsTicketMaster.getId() == null) {
            return createCollectionsTicketMaster(collectionsTicketMaster);
        }
        CollectionsTicketMaster result = collectionsTicketMasterRepository.save(collectionsTicketMaster);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, collectionsTicketMaster.getId().toString()))
            .body(result);
    }

    /**
     * GET  /collections-ticket-masters : get all the collectionsTicketMasters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of collectionsTicketMasters in body
     */
    @GetMapping("/collections-ticket-masters")
    @Timed
    public List<CollectionsTicketMaster> getAllCollectionsTicketMasters() {
        log.debug("REST request to get all CollectionsTicketMasters");
        return collectionsTicketMasterRepository.findAll();
        }

    /**
     * GET  /collections-ticket-masters/:id : get the "id" collectionsTicketMaster.
     *
     * @param id the id of the collectionsTicketMaster to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the collectionsTicketMaster, or with status 404 (Not Found)
     */
    @GetMapping("/collections-ticket-masters/{id}")
    @Timed
    public ResponseEntity<CollectionsTicketMaster> getCollectionsTicketMaster(@PathVariable Long id) {
        log.debug("REST request to get CollectionsTicketMaster : {}", id);
        CollectionsTicketMaster collectionsTicketMaster = collectionsTicketMasterRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(collectionsTicketMaster));
    }

    /**
     * DELETE  /collections-ticket-masters/:id : delete the "id" collectionsTicketMaster.
     *
     * @param id the id of the collectionsTicketMaster to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/collections-ticket-masters/{id}")
    @Timed
    public ResponseEntity<Void> deleteCollectionsTicketMaster(@PathVariable Long id) {
        log.debug("REST request to delete CollectionsTicketMaster : {}", id);
        collectionsTicketMasterRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
