package com.rockbible3.web.rest;

import com.rockbible3.Rockbible3App;

import com.rockbible3.domain.CollectionsTicketMaster;
import com.rockbible3.repository.CollectionsTicketMasterRepository;
import com.rockbible3.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.rockbible3.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CollectionsTicketMasterResource REST controller.
 *
 * @see CollectionsTicketMasterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Rockbible3App.class)
public class CollectionsTicketMasterResourceIntTest {

    private static final String DEFAULT_TICKET_MASTER_ID = "AAAAAAAAAA";
    private static final String UPDATED_TICKET_MASTER_ID = "BBBBBBBBBB";

    @Autowired
    private CollectionsTicketMasterRepository collectionsTicketMasterRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCollectionsTicketMasterMockMvc;

    private CollectionsTicketMaster collectionsTicketMaster;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CollectionsTicketMasterResource collectionsTicketMasterResource = new CollectionsTicketMasterResource(collectionsTicketMasterRepository);
        this.restCollectionsTicketMasterMockMvc = MockMvcBuilders.standaloneSetup(collectionsTicketMasterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CollectionsTicketMaster createEntity(EntityManager em) {
        CollectionsTicketMaster collectionsTicketMaster = new CollectionsTicketMaster()
            .ticketMasterId(DEFAULT_TICKET_MASTER_ID);
        return collectionsTicketMaster;
    }

    @Before
    public void initTest() {
        collectionsTicketMaster = createEntity(em);
    }

    @Test
    @Transactional
    public void createCollectionsTicketMaster() throws Exception {
        int databaseSizeBeforeCreate = collectionsTicketMasterRepository.findAll().size();

        // Create the CollectionsTicketMaster
        restCollectionsTicketMasterMockMvc.perform(post("/api/collections-ticket-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collectionsTicketMaster)))
            .andExpect(status().isCreated());

        // Validate the CollectionsTicketMaster in the database
        List<CollectionsTicketMaster> collectionsTicketMasterList = collectionsTicketMasterRepository.findAll();
        assertThat(collectionsTicketMasterList).hasSize(databaseSizeBeforeCreate + 1);
        CollectionsTicketMaster testCollectionsTicketMaster = collectionsTicketMasterList.get(collectionsTicketMasterList.size() - 1);
        assertThat(testCollectionsTicketMaster.getTicketMasterId()).isEqualTo(DEFAULT_TICKET_MASTER_ID);
    }

    @Test
    @Transactional
    public void createCollectionsTicketMasterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = collectionsTicketMasterRepository.findAll().size();

        // Create the CollectionsTicketMaster with an existing ID
        collectionsTicketMaster.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCollectionsTicketMasterMockMvc.perform(post("/api/collections-ticket-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collectionsTicketMaster)))
            .andExpect(status().isBadRequest());

        // Validate the CollectionsTicketMaster in the database
        List<CollectionsTicketMaster> collectionsTicketMasterList = collectionsTicketMasterRepository.findAll();
        assertThat(collectionsTicketMasterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCollectionsTicketMasters() throws Exception {
        // Initialize the database
        collectionsTicketMasterRepository.saveAndFlush(collectionsTicketMaster);

        // Get all the collectionsTicketMasterList
        restCollectionsTicketMasterMockMvc.perform(get("/api/collections-ticket-masters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(collectionsTicketMaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].ticketMasterId").value(hasItem(DEFAULT_TICKET_MASTER_ID.toString())));
    }

    @Test
    @Transactional
    public void getCollectionsTicketMaster() throws Exception {
        // Initialize the database
        collectionsTicketMasterRepository.saveAndFlush(collectionsTicketMaster);

        // Get the collectionsTicketMaster
        restCollectionsTicketMasterMockMvc.perform(get("/api/collections-ticket-masters/{id}", collectionsTicketMaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(collectionsTicketMaster.getId().intValue()))
            .andExpect(jsonPath("$.ticketMasterId").value(DEFAULT_TICKET_MASTER_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCollectionsTicketMaster() throws Exception {
        // Get the collectionsTicketMaster
        restCollectionsTicketMasterMockMvc.perform(get("/api/collections-ticket-masters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCollectionsTicketMaster() throws Exception {
        // Initialize the database
        collectionsTicketMasterRepository.saveAndFlush(collectionsTicketMaster);
        int databaseSizeBeforeUpdate = collectionsTicketMasterRepository.findAll().size();

        // Update the collectionsTicketMaster
        CollectionsTicketMaster updatedCollectionsTicketMaster = collectionsTicketMasterRepository.findOne(collectionsTicketMaster.getId());
        updatedCollectionsTicketMaster
            .ticketMasterId(UPDATED_TICKET_MASTER_ID);

        restCollectionsTicketMasterMockMvc.perform(put("/api/collections-ticket-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCollectionsTicketMaster)))
            .andExpect(status().isOk());

        // Validate the CollectionsTicketMaster in the database
        List<CollectionsTicketMaster> collectionsTicketMasterList = collectionsTicketMasterRepository.findAll();
        assertThat(collectionsTicketMasterList).hasSize(databaseSizeBeforeUpdate);
        CollectionsTicketMaster testCollectionsTicketMaster = collectionsTicketMasterList.get(collectionsTicketMasterList.size() - 1);
        assertThat(testCollectionsTicketMaster.getTicketMasterId()).isEqualTo(UPDATED_TICKET_MASTER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingCollectionsTicketMaster() throws Exception {
        int databaseSizeBeforeUpdate = collectionsTicketMasterRepository.findAll().size();

        // Create the CollectionsTicketMaster

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCollectionsTicketMasterMockMvc.perform(put("/api/collections-ticket-masters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collectionsTicketMaster)))
            .andExpect(status().isCreated());

        // Validate the CollectionsTicketMaster in the database
        List<CollectionsTicketMaster> collectionsTicketMasterList = collectionsTicketMasterRepository.findAll();
        assertThat(collectionsTicketMasterList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCollectionsTicketMaster() throws Exception {
        // Initialize the database
        collectionsTicketMasterRepository.saveAndFlush(collectionsTicketMaster);
        int databaseSizeBeforeDelete = collectionsTicketMasterRepository.findAll().size();

        // Get the collectionsTicketMaster
        restCollectionsTicketMasterMockMvc.perform(delete("/api/collections-ticket-masters/{id}", collectionsTicketMaster.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CollectionsTicketMaster> collectionsTicketMasterList = collectionsTicketMasterRepository.findAll();
        assertThat(collectionsTicketMasterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CollectionsTicketMaster.class);
        CollectionsTicketMaster collectionsTicketMaster1 = new CollectionsTicketMaster();
        collectionsTicketMaster1.setId(1L);
        CollectionsTicketMaster collectionsTicketMaster2 = new CollectionsTicketMaster();
        collectionsTicketMaster2.setId(collectionsTicketMaster1.getId());
        assertThat(collectionsTicketMaster1).isEqualTo(collectionsTicketMaster2);
        collectionsTicketMaster2.setId(2L);
        assertThat(collectionsTicketMaster1).isNotEqualTo(collectionsTicketMaster2);
        collectionsTicketMaster1.setId(null);
        assertThat(collectionsTicketMaster1).isNotEqualTo(collectionsTicketMaster2);
    }
}
