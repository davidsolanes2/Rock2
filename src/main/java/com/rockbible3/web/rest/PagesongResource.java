package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.web.rest.util.HeaderUtil;
import com.rockbible3.web.rest.util.PaginationUtil;
import com.rockbible3.web.rest.vm.PagesSaveVM;
import com.rockbible3.web.rest.vm.PagesLoadVM;
import io.swagger.annotations.ApiParam;
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
 * REST controller for managing Pagesong.
 */
@RestController
@RequestMapping("/api/pagesong")
public class PagesongResource {

    private final Logger log = LoggerFactory.getLogger(PagesongResource.class);

    /**
     * POST  /pages : Save pages.
     *
     * @param pagesSaveVM the pages to save
     * @return the ResponseEntity with status 201 (Created) and with body the new PagesSaveVM, or with status 400 (Bad Request) if the pages has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pages")
    @Timed
    public ResponseEntity postPages(@RequestBody PagesSaveVM pagesSaveVM) throws URISyntaxException {
        log.debug("REST request to save PagesSaveVM : {}", pagesSaveVM);
        //TODO please code the save of page data.
        return ResponseEntity.ok().build();
    }
    /**
     * GET  /pages : get pages.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the pagesLoadVM, or with status 404 (Not Found)
     */
    @GetMapping("/pages")
    @Timed
    public ResponseEntity<PagesLoadVM> getPages() {
        log.debug("REST request to get PagesLoadVM");
        PagesLoadVM pagesLoadVM = null;
        //TODO please code the load referential data or any utils data to load the page.
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pagesLoadVM));
    }


}
