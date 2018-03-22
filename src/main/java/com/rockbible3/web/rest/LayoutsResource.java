package com.rockbible3.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rockbible3.web.rest.util.HeaderUtil;
import com.rockbible3.web.rest.util.PaginationUtil;
import com.rockbible3.web.rest.vm.SidebarLoadVM;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Layouts.
 */
@RestController
@RequestMapping("/api/layouts")
public class LayoutsResource {

    private final Logger log = LoggerFactory.getLogger(LayoutsResource.class);

    /**
     * GET  /sidebar : get sidebar.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the sidebarLoadVM, or with status 404 (Not Found)
     */

    public List<SidebarLoadVM> getAllSidebars(@RequestParam(required = false) String filter) {
        log.debug("REST request to get all Sidebars");
        return new ArrayList<>();
    }

}
