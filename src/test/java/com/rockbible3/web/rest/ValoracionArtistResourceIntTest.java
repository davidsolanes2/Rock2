package com.rockbible3.web.rest;

import com.rockbible3.Rockbible3App;

import com.rockbible3.domain.ValoracionArtist;
import com.rockbible3.repository.ValoracionArtistRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.rockbible3.web.rest.TestUtil.sameInstant;
import static com.rockbible3.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ValoracionArtistResource REST controller.
 *
 * @see ValoracionArtistResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Rockbible3App.class)
public class ValoracionArtistResourceIntTest {

    private static final Integer DEFAULT_PUNTUACION = 1;
    private static final Integer UPDATED_PUNTUACION = 2;

    private static final Boolean DEFAULT_LIKE = false;
    private static final Boolean UPDATED_LIKE = true;

    private static final ZonedDateTime DEFAULT_TIMESTAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIMESTAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ValoracionArtistRepository valoracionArtistRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restValoracionArtistMockMvc;

    private ValoracionArtist valoracionArtist;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ValoracionArtistResource valoracionArtistResource = new ValoracionArtistResource(valoracionArtistRepository);
        this.restValoracionArtistMockMvc = MockMvcBuilders.standaloneSetup(valoracionArtistResource)
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
    public static ValoracionArtist createEntity(EntityManager em) {
        ValoracionArtist valoracionArtist = new ValoracionArtist()
            .puntuacion(DEFAULT_PUNTUACION)
            .like(DEFAULT_LIKE)
            .timestamp(DEFAULT_TIMESTAMP);
        return valoracionArtist;
    }

    @Before
    public void initTest() {
        valoracionArtist = createEntity(em);
    }

    @Test
    @Transactional
    public void createValoracionArtist() throws Exception {
        int databaseSizeBeforeCreate = valoracionArtistRepository.findAll().size();

        // Create the ValoracionArtist
        restValoracionArtistMockMvc.perform(post("/api/valoracion-artists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionArtist)))
            .andExpect(status().isCreated());

        // Validate the ValoracionArtist in the database
        List<ValoracionArtist> valoracionArtistList = valoracionArtistRepository.findAll();
        assertThat(valoracionArtistList).hasSize(databaseSizeBeforeCreate + 1);
        ValoracionArtist testValoracionArtist = valoracionArtistList.get(valoracionArtistList.size() - 1);
        assertThat(testValoracionArtist.getPuntuacion()).isEqualTo(DEFAULT_PUNTUACION);
        assertThat(testValoracionArtist.isLike()).isEqualTo(DEFAULT_LIKE);
        assertThat(testValoracionArtist.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
    }

    @Test
    @Transactional
    public void createValoracionArtistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = valoracionArtistRepository.findAll().size();

        // Create the ValoracionArtist with an existing ID
        valoracionArtist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restValoracionArtistMockMvc.perform(post("/api/valoracion-artists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionArtist)))
            .andExpect(status().isBadRequest());

        // Validate the ValoracionArtist in the database
        List<ValoracionArtist> valoracionArtistList = valoracionArtistRepository.findAll();
        assertThat(valoracionArtistList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllValoracionArtists() throws Exception {
        // Initialize the database
        valoracionArtistRepository.saveAndFlush(valoracionArtist);

        // Get all the valoracionArtistList
        restValoracionArtistMockMvc.perform(get("/api/valoracion-artists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(valoracionArtist.getId().intValue())))
            .andExpect(jsonPath("$.[*].puntuacion").value(hasItem(DEFAULT_PUNTUACION)))
            .andExpect(jsonPath("$.[*].like").value(hasItem(DEFAULT_LIKE.booleanValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(sameInstant(DEFAULT_TIMESTAMP))));
    }

    @Test
    @Transactional
    public void getValoracionArtist() throws Exception {
        // Initialize the database
        valoracionArtistRepository.saveAndFlush(valoracionArtist);

        // Get the valoracionArtist
        restValoracionArtistMockMvc.perform(get("/api/valoracion-artists/{id}", valoracionArtist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(valoracionArtist.getId().intValue()))
            .andExpect(jsonPath("$.puntuacion").value(DEFAULT_PUNTUACION))
            .andExpect(jsonPath("$.like").value(DEFAULT_LIKE.booleanValue()))
            .andExpect(jsonPath("$.timestamp").value(sameInstant(DEFAULT_TIMESTAMP)));
    }

    @Test
    @Transactional
    public void getNonExistingValoracionArtist() throws Exception {
        // Get the valoracionArtist
        restValoracionArtistMockMvc.perform(get("/api/valoracion-artists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateValoracionArtist() throws Exception {
        // Initialize the database
        valoracionArtistRepository.saveAndFlush(valoracionArtist);
        int databaseSizeBeforeUpdate = valoracionArtistRepository.findAll().size();

        // Update the valoracionArtist
        ValoracionArtist updatedValoracionArtist = valoracionArtistRepository.findOne(valoracionArtist.getId());
        updatedValoracionArtist
            .puntuacion(UPDATED_PUNTUACION)
            .like(UPDATED_LIKE)
            .timestamp(UPDATED_TIMESTAMP);

        restValoracionArtistMockMvc.perform(put("/api/valoracion-artists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedValoracionArtist)))
            .andExpect(status().isOk());

        // Validate the ValoracionArtist in the database
        List<ValoracionArtist> valoracionArtistList = valoracionArtistRepository.findAll();
        assertThat(valoracionArtistList).hasSize(databaseSizeBeforeUpdate);
        ValoracionArtist testValoracionArtist = valoracionArtistList.get(valoracionArtistList.size() - 1);
        assertThat(testValoracionArtist.getPuntuacion()).isEqualTo(UPDATED_PUNTUACION);
        assertThat(testValoracionArtist.isLike()).isEqualTo(UPDATED_LIKE);
        assertThat(testValoracionArtist.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingValoracionArtist() throws Exception {
        int databaseSizeBeforeUpdate = valoracionArtistRepository.findAll().size();

        // Create the ValoracionArtist

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restValoracionArtistMockMvc.perform(put("/api/valoracion-artists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionArtist)))
            .andExpect(status().isCreated());

        // Validate the ValoracionArtist in the database
        List<ValoracionArtist> valoracionArtistList = valoracionArtistRepository.findAll();
        assertThat(valoracionArtistList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteValoracionArtist() throws Exception {
        // Initialize the database
        valoracionArtistRepository.saveAndFlush(valoracionArtist);
        int databaseSizeBeforeDelete = valoracionArtistRepository.findAll().size();

        // Get the valoracionArtist
        restValoracionArtistMockMvc.perform(delete("/api/valoracion-artists/{id}", valoracionArtist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ValoracionArtist> valoracionArtistList = valoracionArtistRepository.findAll();
        assertThat(valoracionArtistList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ValoracionArtist.class);
        ValoracionArtist valoracionArtist1 = new ValoracionArtist();
        valoracionArtist1.setId(1L);
        ValoracionArtist valoracionArtist2 = new ValoracionArtist();
        valoracionArtist2.setId(valoracionArtist1.getId());
        assertThat(valoracionArtist1).isEqualTo(valoracionArtist2);
        valoracionArtist2.setId(2L);
        assertThat(valoracionArtist1).isNotEqualTo(valoracionArtist2);
        valoracionArtist1.setId(null);
        assertThat(valoracionArtist1).isNotEqualTo(valoracionArtist2);
    }
}
