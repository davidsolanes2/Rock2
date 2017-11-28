package com.rockbible3.web.rest;

import com.rockbible3.Rockbible3App;

import com.rockbible3.domain.ValoracionSong;
import com.rockbible3.repository.ValoracionSongRepository;
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
 * Test class for the ValoracionSongResource REST controller.
 *
 * @see ValoracionSongResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Rockbible3App.class)
public class ValoracionSongResourceIntTest {

    private static final Integer DEFAULT_PUNTUACION = 1;
    private static final Integer UPDATED_PUNTUACION = 2;

    private static final Boolean DEFAULT_LIKE = false;
    private static final Boolean UPDATED_LIKE = true;

    private static final ZonedDateTime DEFAULT_TIMESTAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIMESTAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ValoracionSongRepository valoracionSongRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restValoracionSongMockMvc;

    private ValoracionSong valoracionSong;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ValoracionSongResource valoracionSongResource = new ValoracionSongResource(valoracionSongRepository);
        this.restValoracionSongMockMvc = MockMvcBuilders.standaloneSetup(valoracionSongResource)
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
    public static ValoracionSong createEntity(EntityManager em) {
        ValoracionSong valoracionSong = new ValoracionSong()
            .puntuacion(DEFAULT_PUNTUACION)
            .like(DEFAULT_LIKE)
            .timestamp(DEFAULT_TIMESTAMP);
        return valoracionSong;
    }

    @Before
    public void initTest() {
        valoracionSong = createEntity(em);
    }

    @Test
    @Transactional
    public void createValoracionSong() throws Exception {
        int databaseSizeBeforeCreate = valoracionSongRepository.findAll().size();

        // Create the ValoracionSong
        restValoracionSongMockMvc.perform(post("/api/valoracion-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionSong)))
            .andExpect(status().isCreated());

        // Validate the ValoracionSong in the database
        List<ValoracionSong> valoracionSongList = valoracionSongRepository.findAll();
        assertThat(valoracionSongList).hasSize(databaseSizeBeforeCreate + 1);
        ValoracionSong testValoracionSong = valoracionSongList.get(valoracionSongList.size() - 1);
        assertThat(testValoracionSong.getPuntuacion()).isEqualTo(DEFAULT_PUNTUACION);
        assertThat(testValoracionSong.isLike()).isEqualTo(DEFAULT_LIKE);
        assertThat(testValoracionSong.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
    }

    @Test
    @Transactional
    public void createValoracionSongWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = valoracionSongRepository.findAll().size();

        // Create the ValoracionSong with an existing ID
        valoracionSong.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restValoracionSongMockMvc.perform(post("/api/valoracion-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionSong)))
            .andExpect(status().isBadRequest());

        // Validate the ValoracionSong in the database
        List<ValoracionSong> valoracionSongList = valoracionSongRepository.findAll();
        assertThat(valoracionSongList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllValoracionSongs() throws Exception {
        // Initialize the database
        valoracionSongRepository.saveAndFlush(valoracionSong);

        // Get all the valoracionSongList
        restValoracionSongMockMvc.perform(get("/api/valoracion-songs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(valoracionSong.getId().intValue())))
            .andExpect(jsonPath("$.[*].puntuacion").value(hasItem(DEFAULT_PUNTUACION)))
            .andExpect(jsonPath("$.[*].like").value(hasItem(DEFAULT_LIKE.booleanValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(sameInstant(DEFAULT_TIMESTAMP))));
    }

    @Test
    @Transactional
    public void getValoracionSong() throws Exception {
        // Initialize the database
        valoracionSongRepository.saveAndFlush(valoracionSong);

        // Get the valoracionSong
        restValoracionSongMockMvc.perform(get("/api/valoracion-songs/{id}", valoracionSong.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(valoracionSong.getId().intValue()))
            .andExpect(jsonPath("$.puntuacion").value(DEFAULT_PUNTUACION))
            .andExpect(jsonPath("$.like").value(DEFAULT_LIKE.booleanValue()))
            .andExpect(jsonPath("$.timestamp").value(sameInstant(DEFAULT_TIMESTAMP)));
    }

    @Test
    @Transactional
    public void getNonExistingValoracionSong() throws Exception {
        // Get the valoracionSong
        restValoracionSongMockMvc.perform(get("/api/valoracion-songs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateValoracionSong() throws Exception {
        // Initialize the database
        valoracionSongRepository.saveAndFlush(valoracionSong);
        int databaseSizeBeforeUpdate = valoracionSongRepository.findAll().size();

        // Update the valoracionSong
        ValoracionSong updatedValoracionSong = valoracionSongRepository.findOne(valoracionSong.getId());
        updatedValoracionSong
            .puntuacion(UPDATED_PUNTUACION)
            .like(UPDATED_LIKE)
            .timestamp(UPDATED_TIMESTAMP);

        restValoracionSongMockMvc.perform(put("/api/valoracion-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedValoracionSong)))
            .andExpect(status().isOk());

        // Validate the ValoracionSong in the database
        List<ValoracionSong> valoracionSongList = valoracionSongRepository.findAll();
        assertThat(valoracionSongList).hasSize(databaseSizeBeforeUpdate);
        ValoracionSong testValoracionSong = valoracionSongList.get(valoracionSongList.size() - 1);
        assertThat(testValoracionSong.getPuntuacion()).isEqualTo(UPDATED_PUNTUACION);
        assertThat(testValoracionSong.isLike()).isEqualTo(UPDATED_LIKE);
        assertThat(testValoracionSong.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingValoracionSong() throws Exception {
        int databaseSizeBeforeUpdate = valoracionSongRepository.findAll().size();

        // Create the ValoracionSong

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restValoracionSongMockMvc.perform(put("/api/valoracion-songs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(valoracionSong)))
            .andExpect(status().isCreated());

        // Validate the ValoracionSong in the database
        List<ValoracionSong> valoracionSongList = valoracionSongRepository.findAll();
        assertThat(valoracionSongList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteValoracionSong() throws Exception {
        // Initialize the database
        valoracionSongRepository.saveAndFlush(valoracionSong);
        int databaseSizeBeforeDelete = valoracionSongRepository.findAll().size();

        // Get the valoracionSong
        restValoracionSongMockMvc.perform(delete("/api/valoracion-songs/{id}", valoracionSong.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ValoracionSong> valoracionSongList = valoracionSongRepository.findAll();
        assertThat(valoracionSongList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ValoracionSong.class);
        ValoracionSong valoracionSong1 = new ValoracionSong();
        valoracionSong1.setId(1L);
        ValoracionSong valoracionSong2 = new ValoracionSong();
        valoracionSong2.setId(valoracionSong1.getId());
        assertThat(valoracionSong1).isEqualTo(valoracionSong2);
        valoracionSong2.setId(2L);
        assertThat(valoracionSong1).isNotEqualTo(valoracionSong2);
        valoracionSong1.setId(null);
        assertThat(valoracionSong1).isNotEqualTo(valoracionSong2);
    }
}
