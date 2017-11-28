package com.rockbible3.web.rest;

import com.rockbible3.Rockbible3App;

import com.rockbible3.domain.ValoracionBand;
import com.rockbible3.repository.ValoracionBandRepository;
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
 * Test class for the ValoracionBandResource REST controller.
 *
 * @see ValoracionBandResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Rockbible3App.class)
public class ValoracionBandResourceIntTest {

    private static final Integer DEFAULT_PUNTUACION = 1;
    private static final Integer UPDATED_PUNTUACION = 2;

    private static final Boolean DEFAULT_LIKE = false;
    private static final Boolean UPDATED_LIKE = true;

    private static final ZonedDateTime DEFAULT_TIMESTAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIMESTAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ValoracionBandRepository valoracionBandRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restValoracionBandMockMvc;

    private ValoracionBand valoracionBand;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ValoracionBandResource valoracionBandResource = new ValoracionBandResource(valoracionBandRepository);
        this.restValoracionBandMockMvc = MockMvcBuilders.standaloneSetup(valoracionBandResource)
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
    public static ValoracionBand createEntity(EntityManager em) {
        ValoracionBand valoracionBand = new ValoracionBand()
            .puntuacion(DEFAULT_PUNTUACION)
            .like(DEFAULT_LIKE)
            .timestamp(DEFAULT_TIMESTAMP);
        return valoracionBand;
    }

    @Before
    public void initTest() {
        valoracionBand = createEntity(em);
    }

    @Test
    @Transactional
    public void createValoracionBand() throws Exception {
        int databaseSizeBeforeCreate = valoracionBandRepository.findAll().size();

        // Create the ValoracionBand
        restValoracionBandMockMvc.perform(post("/api/valoracion-bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionBand)))
            .andExpect(status().isCreated());

        // Validate the ValoracionBand in the database
        List<ValoracionBand> valoracionBandList = valoracionBandRepository.findAll();
        assertThat(valoracionBandList).hasSize(databaseSizeBeforeCreate + 1);
        ValoracionBand testValoracionBand = valoracionBandList.get(valoracionBandList.size() - 1);
        assertThat(testValoracionBand.getPuntuacion()).isEqualTo(DEFAULT_PUNTUACION);
        assertThat(testValoracionBand.isLike()).isEqualTo(DEFAULT_LIKE);
        assertThat(testValoracionBand.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
    }

    @Test
    @Transactional
    public void createValoracionBandWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = valoracionBandRepository.findAll().size();

        // Create the ValoracionBand with an existing ID
        valoracionBand.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restValoracionBandMockMvc.perform(post("/api/valoracion-bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionBand)))
            .andExpect(status().isBadRequest());

        // Validate the ValoracionBand in the database
        List<ValoracionBand> valoracionBandList = valoracionBandRepository.findAll();
        assertThat(valoracionBandList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllValoracionBands() throws Exception {
        // Initialize the database
        valoracionBandRepository.saveAndFlush(valoracionBand);

        // Get all the valoracionBandList
        restValoracionBandMockMvc.perform(get("/api/valoracion-bands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(valoracionBand.getId().intValue())))
            .andExpect(jsonPath("$.[*].puntuacion").value(hasItem(DEFAULT_PUNTUACION)))
            .andExpect(jsonPath("$.[*].like").value(hasItem(DEFAULT_LIKE.booleanValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(sameInstant(DEFAULT_TIMESTAMP))));
    }

    @Test
    @Transactional
    public void getValoracionBand() throws Exception {
        // Initialize the database
        valoracionBandRepository.saveAndFlush(valoracionBand);

        // Get the valoracionBand
        restValoracionBandMockMvc.perform(get("/api/valoracion-bands/{id}", valoracionBand.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(valoracionBand.getId().intValue()))
            .andExpect(jsonPath("$.puntuacion").value(DEFAULT_PUNTUACION))
            .andExpect(jsonPath("$.like").value(DEFAULT_LIKE.booleanValue()))
            .andExpect(jsonPath("$.timestamp").value(sameInstant(DEFAULT_TIMESTAMP)));
    }

    @Test
    @Transactional
    public void getNonExistingValoracionBand() throws Exception {
        // Get the valoracionBand
        restValoracionBandMockMvc.perform(get("/api/valoracion-bands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateValoracionBand() throws Exception {
        // Initialize the database
        valoracionBandRepository.saveAndFlush(valoracionBand);
        int databaseSizeBeforeUpdate = valoracionBandRepository.findAll().size();

        // Update the valoracionBand
        ValoracionBand updatedValoracionBand = valoracionBandRepository.findOne(valoracionBand.getId());
        updatedValoracionBand
            .puntuacion(UPDATED_PUNTUACION)
            .like(UPDATED_LIKE)
            .timestamp(UPDATED_TIMESTAMP);

        restValoracionBandMockMvc.perform(put("/api/valoracion-bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedValoracionBand)))
            .andExpect(status().isOk());

        // Validate the ValoracionBand in the database
        List<ValoracionBand> valoracionBandList = valoracionBandRepository.findAll();
        assertThat(valoracionBandList).hasSize(databaseSizeBeforeUpdate);
        ValoracionBand testValoracionBand = valoracionBandList.get(valoracionBandList.size() - 1);
        assertThat(testValoracionBand.getPuntuacion()).isEqualTo(UPDATED_PUNTUACION);
        assertThat(testValoracionBand.isLike()).isEqualTo(UPDATED_LIKE);
        assertThat(testValoracionBand.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingValoracionBand() throws Exception {
        int databaseSizeBeforeUpdate = valoracionBandRepository.findAll().size();

        // Create the ValoracionBand

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restValoracionBandMockMvc.perform(put("/api/valoracion-bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionBand)))
            .andExpect(status().isCreated());

        // Validate the ValoracionBand in the database
        List<ValoracionBand> valoracionBandList = valoracionBandRepository.findAll();
        assertThat(valoracionBandList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteValoracionBand() throws Exception {
        // Initialize the database
        valoracionBandRepository.saveAndFlush(valoracionBand);
        int databaseSizeBeforeDelete = valoracionBandRepository.findAll().size();

        // Get the valoracionBand
        restValoracionBandMockMvc.perform(delete("/api/valoracion-bands/{id}", valoracionBand.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ValoracionBand> valoracionBandList = valoracionBandRepository.findAll();
        assertThat(valoracionBandList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ValoracionBand.class);
        ValoracionBand valoracionBand1 = new ValoracionBand();
        valoracionBand1.setId(1L);
        ValoracionBand valoracionBand2 = new ValoracionBand();
        valoracionBand2.setId(valoracionBand1.getId());
        assertThat(valoracionBand1).isEqualTo(valoracionBand2);
        valoracionBand2.setId(2L);
        assertThat(valoracionBand1).isNotEqualTo(valoracionBand2);
        valoracionBand1.setId(null);
        assertThat(valoracionBand1).isNotEqualTo(valoracionBand2);
    }
}
