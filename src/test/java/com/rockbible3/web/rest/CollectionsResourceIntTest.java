package com.rockbible3.web.rest;

import com.rockbible3.Rockbible3App;

import com.rockbible3.domain.Collections;
import com.rockbible3.repository.CollectionsRepository;
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
 * Test class for the CollectionsResource REST controller.
 *
 * @see CollectionsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Rockbible3App.class)
public class CollectionsResourceIntTest {

    private static final String DEFAULT_TRACK_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRACK_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CONCERT_ID = "AAAAAAAAAA";
    private static final String UPDATED_CONCERT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ARTIST_ID = "AAAAAAAAAA";
    private static final String UPDATED_ARTIST_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private CollectionsRepository collectionsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCollectionsMockMvc;

    private Collections collections;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CollectionsResource collectionsResource = new CollectionsResource(collectionsRepository);
        this.restCollectionsMockMvc = MockMvcBuilders.standaloneSetup(collectionsResource)
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
    public static Collections createEntity(EntityManager em) {
        Collections collections = new Collections()
            .trackId(DEFAULT_TRACK_ID)
            .concertId(DEFAULT_CONCERT_ID)
            .artistId(DEFAULT_ARTIST_ID)
            .type(DEFAULT_TYPE);
        return collections;
    }

    @Before
    public void initTest() {
        collections = createEntity(em);
    }

    @Test
    @Transactional
    public void createCollections() throws Exception {
        int databaseSizeBeforeCreate = collectionsRepository.findAll().size();

        // Create the Collections
        restCollectionsMockMvc.perform(post("/api/collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collections)))
            .andExpect(status().isCreated());

        // Validate the Collections in the database
        List<Collections> collectionsList = collectionsRepository.findAll();
        assertThat(collectionsList).hasSize(databaseSizeBeforeCreate + 1);
        Collections testCollections = collectionsList.get(collectionsList.size() - 1);
        assertThat(testCollections.getTrackId()).isEqualTo(DEFAULT_TRACK_ID);
        assertThat(testCollections.getConcertId()).isEqualTo(DEFAULT_CONCERT_ID);
        assertThat(testCollections.getArtistId()).isEqualTo(DEFAULT_ARTIST_ID);
        assertThat(testCollections.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createCollectionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = collectionsRepository.findAll().size();

        // Create the Collections with an existing ID
        collections.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCollectionsMockMvc.perform(post("/api/collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collections)))
            .andExpect(status().isBadRequest());

        // Validate the Collections in the database
        List<Collections> collectionsList = collectionsRepository.findAll();
        assertThat(collectionsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCollections() throws Exception {
        // Initialize the database
        collectionsRepository.saveAndFlush(collections);

        // Get all the collectionsList
        restCollectionsMockMvc.perform(get("/api/collections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(collections.getId().intValue())))
            .andExpect(jsonPath("$.[*].trackId").value(hasItem(DEFAULT_TRACK_ID.toString())))
            .andExpect(jsonPath("$.[*].concertId").value(hasItem(DEFAULT_CONCERT_ID.toString())))
            .andExpect(jsonPath("$.[*].artistId").value(hasItem(DEFAULT_ARTIST_ID.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getCollections() throws Exception {
        // Initialize the database
        collectionsRepository.saveAndFlush(collections);

        // Get the collections
        restCollectionsMockMvc.perform(get("/api/collections/{id}", collections.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(collections.getId().intValue()))
            .andExpect(jsonPath("$.trackId").value(DEFAULT_TRACK_ID.toString()))
            .andExpect(jsonPath("$.concertId").value(DEFAULT_CONCERT_ID.toString()))
            .andExpect(jsonPath("$.artistId").value(DEFAULT_ARTIST_ID.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCollections() throws Exception {
        // Get the collections
        restCollectionsMockMvc.perform(get("/api/collections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCollections() throws Exception {
        // Initialize the database
        collectionsRepository.saveAndFlush(collections);
        int databaseSizeBeforeUpdate = collectionsRepository.findAll().size();

        // Update the collections
        Collections updatedCollections = collectionsRepository.findOne(collections.getId());
        updatedCollections
            .trackId(UPDATED_TRACK_ID)
            .concertId(UPDATED_CONCERT_ID)
            .artistId(UPDATED_ARTIST_ID)
            .type(UPDATED_TYPE);

        restCollectionsMockMvc.perform(put("/api/collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCollections)))
            .andExpect(status().isOk());

        // Validate the Collections in the database
        List<Collections> collectionsList = collectionsRepository.findAll();
        assertThat(collectionsList).hasSize(databaseSizeBeforeUpdate);
        Collections testCollections = collectionsList.get(collectionsList.size() - 1);
        assertThat(testCollections.getTrackId()).isEqualTo(UPDATED_TRACK_ID);
        assertThat(testCollections.getConcertId()).isEqualTo(UPDATED_CONCERT_ID);
        assertThat(testCollections.getArtistId()).isEqualTo(UPDATED_ARTIST_ID);
        assertThat(testCollections.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCollections() throws Exception {
        int databaseSizeBeforeUpdate = collectionsRepository.findAll().size();

        // Create the Collections

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCollectionsMockMvc.perform(put("/api/collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collections)))
            .andExpect(status().isCreated());

        // Validate the Collections in the database
        List<Collections> collectionsList = collectionsRepository.findAll();
        assertThat(collectionsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCollections() throws Exception {
        // Initialize the database
        collectionsRepository.saveAndFlush(collections);
        int databaseSizeBeforeDelete = collectionsRepository.findAll().size();

        // Get the collections
        restCollectionsMockMvc.perform(delete("/api/collections/{id}", collections.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Collections> collectionsList = collectionsRepository.findAll();
        assertThat(collectionsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Collections.class);
        Collections collections1 = new Collections();
        collections1.setId(1L);
        Collections collections2 = new Collections();
        collections2.setId(collections1.getId());
        assertThat(collections1).isEqualTo(collections2);
        collections2.setId(2L);
        assertThat(collections1).isNotEqualTo(collections2);
        collections1.setId(null);
        assertThat(collections1).isNotEqualTo(collections2);
    }
}
