package com.rockbible3.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Country.
 */
@Entity
@Table(name = "country")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Country implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "location_google_maps")
    private String locationGoogleMaps;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "logitude")
    private Double logitude;

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Band> bands = new HashSet<>();

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Artist> artists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Country name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocationGoogleMaps() {
        return locationGoogleMaps;
    }

    public Country locationGoogleMaps(String locationGoogleMaps) {
        this.locationGoogleMaps = locationGoogleMaps;
        return this;
    }

    public void setLocationGoogleMaps(String locationGoogleMaps) {
        this.locationGoogleMaps = locationGoogleMaps;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Country latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLogitude() {
        return logitude;
    }

    public Country logitude(Double logitude) {
        this.logitude = logitude;
        return this;
    }

    public void setLogitude(Double logitude) {
        this.logitude = logitude;
    }

    public Set<Band> getBands() {
        return bands;
    }

    public Country bands(Set<Band> bands) {
        this.bands = bands;
        return this;
    }

    public Country addBand(Band band) {
        this.bands.add(band);
        band.setCountry(this);
        return this;
    }

    public Country removeBand(Band band) {
        this.bands.remove(band);
        band.setCountry(null);
        return this;
    }

    public void setBands(Set<Band> bands) {
        this.bands = bands;
    }

    public Set<Artist> getArtists() {
        return artists;
    }

    public Country artists(Set<Artist> artists) {
        this.artists = artists;
        return this;
    }

    public Country addArtist(Artist artist) {
        this.artists.add(artist);
        artist.setCountry(this);
        return this;
    }

    public Country removeArtist(Artist artist) {
        this.artists.remove(artist);
        artist.setCountry(null);
        return this;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Country country = (Country) o;
        if (country.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), country.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Country{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", locationGoogleMaps='" + getLocationGoogleMaps() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", logitude='" + getLogitude() + "'" +
            "}";
    }
}
