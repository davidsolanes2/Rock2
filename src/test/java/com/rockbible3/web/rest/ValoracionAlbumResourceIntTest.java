package com.rockbible3.web.rest;

import com.rockbible3.Rockbible3App;

import com.rockbible3.domain.ValoracionAlbum;
import com.rockbible3.repository.ValoracionAlbumRepository;
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
 * Test class for the ValoracionAlbumResource REST controller.
 *
 * @see ValoracionAlbumResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Rockbible3App.class)
public class ValoracionAlbumResourceIntTest {

    private static final Integer DEFAULT_PUNTUACION = 1;
    private static final Integer UPDATED_PUNTUACION = 2;

    private static final Boolean DEFAULT_LIKE = false;
    private static final Boolean UPDATED_LIKE = true;

    private static final ZonedDateTime DEFAULT_TIMESTAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIMESTAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ValoracionAlbumRepository valoracionAlbumRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restValoracionAlbumMockMvc;

    private ValoracionAlbum valoracionAlbum;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ValoracionAlbumResource valoracionAlbumResource = new ValoracionAlbumResource(valoracionAlbumRepository);
        this.restValoracionAlbumMockMvc = MockMvcBuilders.standaloneSetup(valoracionAlbumResource)
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
    public static ValoracionAlbum createEntity(EntityManager em) {
        ValoracionAlbum valoracionAlbum = new ValoracionAlbum()
            .puntuacion(DEFAULT_PUNTUACION)
            .like(DEFAULT_LIKE)
            .timestamp(DEFAULT_TIMESTAMP);
        return valoracionAlbum;
    }

    @Before
    public void initTest() {
        valoracionAlbum = createEntity(em);
    }

    @Test
    @Transactional
    public void createValoracionAlbum() throws Exception {
        int databaseSizeBeforeCreate = valoracionAlbumRepository.findAll().size();

        // Create the ValoracionAlbum
        restValoracionAlbumMockMvc.perform(post("/api/valoracion-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionAlbum)))
            .andExpect(status().isCreated());

        // Validate the ValoracionAlbum in the database
        List<ValoracionAlbum> valoracionAlbumList = valoracionAlbumRepository.findAll();
        assertThat(valoracionAlbumList).hasSize(databaseSizeBeforeCreate + 1);
        ValoracionAlbum testValoracionAlbum = valoracionAlbumList.get(valoracionAlbumList.size() - 1);
        assertThat(testValoracionAlbum.getPuntuacion()).isEqualTo(DEFAULT_PUNTUACION);
        assertThat(testValoracionAlbum.isLike()).isEqualTo(DEFAULT_LIKE);
        assertThat(testValoracionAlbum.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
    }

    @Test
    @Transactional
    public void createValoracionAlbumWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = valoracionAlbumRepository.findAll().size();

        // Create the ValoracionAlbum with an existing ID
        valoracionAlbum.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restValoracionAlbumMockMvc.perform(post("/api/valoracion-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionAlbum)))
            .andExpect(status().isBadRequest());

        // Validate the ValoracionAlbum in the database
        List<ValoracionAlbum> valoracionAlbumList = valoracionAlbumRepository.findAll();
        assertThat(valoracionAlbumList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllValoracionAlbums() throws Exception {
        // Initialize the database
        valoracionAlbumRepository.saveAndFlush(valoracionAlbum);

        // Get all the valoracionAlbumList
        restValoracionAlbumMockMvc.perform(get("/api/valoracion-albums?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(valoracionAlbum.getId().intValue())))
            .andExpect(jsonPath("$.[*].puntuacion").value(hasItem(DEFAULT_PUNTUACION)))
            .andExpect(jsonPath("$.[*].like").value(hasItem(DEFAULT_LIKE.booleanValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(sameInstant(DEFAULT_TIMESTAMP))));
    }

    @Test
    @Transactional
    public void getValoracionAlbum() throws Exception {
        // Initialize the database
        valoracionAlbumRepository.saveAndFlush(valoracionAlbum);

        // Get the valoracionAlbum
        restValoracionAlbumMockMvc.perform(get("/api/valoracion-albums/{id}", valoracionAlbum.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(valoracionAlbum.getId().intValue()))
            .andExpect(jsonPath("$.puntuacion").value(DEFAULT_PUNTUACION))
            .andExpect(jsonPath("$.like").value(DEFAULT_LIKE.booleanValue()))
            .andExpect(jsonPath("$.timestamp").value(sameInstant(DEFAULT_TIMESTAMP)));
    }

    @Test
    @Transactional
    public void getNonExistingValoracionAlbum() throws Exception {
        // Get the valoracionAlbum
        restValoracionAlbumMockMvc.perform(get("/api/valoracion-albums/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateValoracionAlbum() throws Exception {
        // Initialize the database
        valoracionAlbumRepository.saveAndFlush(valoracionAlbum);
        int databaseSizeBeforeUpdate = valoracionAlbumRepository.findAll().size();

        // Update the valoracionAlbum
        ValoracionAlbum updatedValoracionAlbum = valoracionAlbumRepository.findOne(valoracionAlbum.getId());
        updatedValoracionAlbum
            .puntuacion(UPDATED_PUNTUACION)
            .like(UPDATED_LIKE)
            .timestamp(UPDATED_TIMESTAMP);

        restValoracionAlbumMockMvc.perform(put("/api/valoracion-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedValoracionAlbum)))
            .andExpect(status().isOk());

        // Validate the ValoracionAlbum in the database
        List<ValoracionAlbum> valoracionAlbumList = valoracionAlbumRepository.findAll();
        assertThat(valoracionAlbumList).hasSize(databaseSizeBeforeUpdate);
        ValoracionAlbum testValoracionAlbum = valoracionAlbumList.get(valoracionAlbumList.size() - 1);
        assertThat(testValoracionAlbum.getPuntuacion()).isEqualTo(UPDATED_PUNTUACION);
        assertThat(testValoracionAlbum.isLike()).isEqualTo(UPDATED_LIKE);
        assertThat(testValoracionAlbum.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingValoracionAlbum() throws Exception {
        int databaseSizeBeforeUpdate = valoracionAlbumRepository.findAll().size();

        // Create the ValoracionAlbum

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restValoracionAlbumMockMvc.perform(put("/api/valoracion-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionAlbum)))
            .andExpect(status().isCreated());

        // Validate the ValoracionAlbum in the database
        List<ValoracionAlbum> valoracionAlbumList = valoracionAlbumRepository.findAll();
        assertThat(valoracionAlbumList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteValoracionAlbum() throws Exception {
        // Initialize the database
        valoracionAlbumRepository.saveAndFlush(valoracionAlbum);
        int databaseSizeBeforeDelete = valoracionAlbumRepository.findAll().size();

        // Get the valoracionAlbum
        restValoracionAlbumMockMvc.perform(delete("/api/valoracion-albums/{id}", valoracionAlbum.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ValoracionAlbum> valoracionAlbumList = valoracionAlbumRepository.findAll();
        assertThat(valoracionAlbumList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ValoracionAlbum.class);
        ValoracionAlbum valoracionAlbum1 = new ValoracionAlbum();
        valoracionAlbum1.setId(1L);
        ValoracionAlbum valoracionAlbum2 = new ValoracionAlbum();
        valoracionAlbum2.setId(valoracionAlbum1.getId());
        assertThat(valoracionAlbum1).isEqualTo(valoracionAlbum2);
        valoracionAlbum2.setId(2L);
        assertThat(valoracionAlbum1).isNotEqualTo(valoracionAlbum2);
        valoracionAlbum1.setId(null);
        assertThat(valoracionAlbum1).isNotEqualTo(valoracionAlbum2);
    }
}
