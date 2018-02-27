package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.web.rest.vm.PhomeLoadVM;
import com.rockbible3.web.rest.vm.PhomeSaveVM;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Optional;

/**
 * REST controller for managing Pagehome.
 */
@RestController
@RequestMapping("/api/pagehome")
public class PagehomeResource {

    private final Logger log = LoggerFactory.getLogger(PagehomeResource.class);

    /**
     * POST  /phome : Save phome.
     *
     * @param phomeSaveVM the phome to save
     * @return the ResponseEntity with status 201 (Created) and with body the new PhomeSaveVM, or with status 400 (Bad Request) if the phome has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/phome")
    @Timed
    public ResponseEntity postPhome(@RequestBody PhomeSaveVM phomeSaveVM) throws URISyntaxException {
        log.debug("REST request to save PhomeSaveVM : {}", phomeSaveVM);
        //TODO please code the save of page data.
        return ResponseEntity.ok().build();
    }
    /**
     * GET  /phome : get phome.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the phomeLoadVM, or with status 404 (Not Found)
     */
    @GetMapping("/phome")
    @Timed
    public ResponseEntity<PhomeLoadVM> getPhome() {
        log.debug("REST request to get PhomeLoadVM");
        PhomeLoadVM phomeLoadVM = null;
        //TODO please code the load referential data or any utils data to load the page.
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(phomeLoadVM));
    }


}
