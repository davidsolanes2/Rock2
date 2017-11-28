package com.rockbible3.web.rest;

import com.rockbible3.Rockbible3App;

import com.rockbible3.domain.Band;
import com.rockbible3.repository.BandRepository;
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

import com.rockbible3.domain.enumeration.Status;
/**
 * Test class for the BandResource REST controller.
 *
 * @see BandResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Rockbible3App.class)
public class BandResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION_GOOGLE_MAPS = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_GOOGLE_MAPS = "BBBBBBBBBB";

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    private static final Double DEFAULT_LOGITUDE = 1D;
    private static final Double UPDATED_LOGITUDE = 2D;

    private static final Status DEFAULT_STATUS = Status.ACTIVO;
    private static final Status UPDATED_STATUS = Status.DESCANSO;

    @Autowired
    private BandRepository bandRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBandMockMvc;

    private Band band;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BandResource bandResource = new BandResource(bandRepository);
        this.restBandMockMvc = MockMvcBuilders.standaloneSetup(bandResource)
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
    public static Band createEntity(EntityManager em) {
        Band band = new Band()
            .name(DEFAULT_NAME)
            .locationGoogleMaps(DEFAULT_LOCATION_GOOGLE_MAPS)
            .latitude(DEFAULT_LATITUDE)
            .logitude(DEFAULT_LOGITUDE)
            .status(DEFAULT_STATUS);
        return band;
    }

    @Before
    public void initTest() {
        band = createEntity(em);
    }

    @Test
    @Transactional
    public void createBand() throws Exception {
        int databaseSizeBeforeCreate = bandRepository.findAll().size();

        // Create the Band
        restBandMockMvc.perform(post("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(band)))
            .andExpect(status().isCreated());

        // Validate the Band in the database
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeCreate + 1);
        Band testBand = bandList.get(bandList.size() - 1);
        assertThat(testBand.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBand.getLocationGoogleMaps()).isEqualTo(DEFAULT_LOCATION_GOOGLE_MAPS);
        assertThat(testBand.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testBand.getLogitude()).isEqualTo(DEFAULT_LOGITUDE);
        assertThat(testBand.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createBandWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bandRepository.findAll().size();

        // Create the Band with an existing ID
        band.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBandMockMvc.perform(post("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(band)))
            .andExpect(status().isBadRequest());

        // Validate the Band in the database
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBands() throws Exception {
        // Initialize the database
        bandRepository.saveAndFlush(band);

        // Get all the bandList
        restBandMockMvc.perform(get("/api/bands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(band.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].locationGoogleMaps").value(hasItem(DEFAULT_LOCATION_GOOGLE_MAPS.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].logitude").value(hasItem(DEFAULT_LOGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getBand() throws Exception {
        // Initialize the database
        bandRepository.saveAndFlush(band);

        // Get the band
        restBandMockMvc.perform(get("/api/bands/{id}", band.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(band.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.locationGoogleMaps").value(DEFAULT_LOCATION_GOOGLE_MAPS.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.logitude").value(DEFAULT_LOGITUDE.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBand() throws Exception {
        // Get the band
        restBandMockMvc.perform(get("/api/bands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBand() throws Exception {
        // Initialize the database
        bandRepository.saveAndFlush(band);
        int databaseSizeBeforeUpdate = bandRepository.findAll().size();

        // Update the band
        Band updatedBand = bandRepository.findOne(band.getId());
        updatedBand
            .name(UPDATED_NAME)
            .locationGoogleMaps(UPDATED_LOCATION_GOOGLE_MAPS)
            .latitude(UPDATED_LATITUDE)
            .logitude(UPDATED_LOGITUDE)
            .status(UPDATED_STATUS);

        restBandMockMvc.perform(put("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBand)))
            .andExpect(status().isOk());

        // Validate the Band in the database
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeUpdate);
        Band testBand = bandList.get(bandList.size() - 1);
        assertThat(testBand.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBand.getLocationGoogleMaps()).isEqualTo(UPDATED_LOCATION_GOOGLE_MAPS);
        assertThat(testBand.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testBand.getLogitude()).isEqualTo(UPDATED_LOGITUDE);
        assertThat(testBand.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingBand() throws Exception {
        int databaseSizeBeforeUpdate = bandRepository.findAll().size();

        // Create the Band

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBandMockMvc.perform(put("/api/bands")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(band)))
            .andExpect(status().isCreated());

        // Validate the Band in the database
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBand() throws Exception {
        // Initialize the database
        bandRepository.saveAndFlush(band);
        int databaseSizeBeforeDelete = bandRepository.findAll().size();

        // Get the band
        restBandMockMvc.perform(delete("/api/bands/{id}", band.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Band> bandList = bandRepository.findAll();
        assertThat(bandList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Band.class);
        Band band1 = new Band();
        band1.setId(1L);
        Band band2 = new Band();
        band2.setId(band1.getId());
        assertThat(band1).isEqualTo(band2);
        band2.setId(2L);
        assertThat(band1).isNotEqualTo(band2);
        band1.setId(null);
        assertThat(band1).isNotEqualTo(band2);
    }
}
