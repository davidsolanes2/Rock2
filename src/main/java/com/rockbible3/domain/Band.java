package com.rockbible3.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.rockbible3.domain.enumeration.Status;

/**
 * A Band.
 */
@Entity
@Table(name = "band")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Band implements Serializable {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    private Country country;

    @ManyToOne
    private Label label;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "band_genre",
               joinColumns = @JoinColumn(name="bands_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="genres_id", referencedColumnName="id"))
    private Set<Genre> genres = new HashSet<>();

    @OneToMany(mappedBy = "band")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Album> albums = new HashSet<>();

    @OneToMany(mappedBy = "band")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Artist> artists = new HashSet<>();

    @OneToMany(mappedBy = "band")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ValoracionBand> valoracions = new HashSet<>();

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

    public Band name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocationGoogleMaps() {
        return locationGoogleMaps;
    }

    public Band locationGoogleMaps(String locationGoogleMaps) {
        this.locationGoogleMaps = locationGoogleMaps;
        return this;
    }

    public void setLocationGoogleMaps(String locationGoogleMaps) {
        this.locationGoogleMaps = locationGoogleMaps;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Band latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLogitude() {
        return logitude;
    }

    public Band logitude(Double logitude) {
        this.logitude = logitude;
        return this;
    }

    public void setLogitude(Double logitude) {
        this.logitude = logitude;
    }

    public Status getStatus() {
        return status;
    }

    public Band status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Country getCountry() {
        return country;
    }

    public Band country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Label getLabel() {
        return label;
    }

    public Band label(Label label) {
        this.label = label;
        return this;
    }

    public void setLabel(Label label) {
        this.label = label;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public Band genres(Set<Genre> genres) {
        this.genres = genres;
        return this;
    }

    public Band addGenre(Genre genre) {
        this.genres.add(genre);
        genre.getBands().add(this);
        return this;
    }

    public Band removeGenre(Genre genre) {
        this.genres.remove(genre);
        genre.getBands().remove(this);
        return this;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public Band albums(Set<Album> albums) {
        this.albums = albums;
        return this;
    }

    public Band addAlbum(Album album) {
        this.albums.add(album);
        album.setBand(this);
        return this;
    }

    public Band removeAlbum(Album album) {
        this.albums.remove(album);
        album.setBand(null);
        return this;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }

    public Set<Artist> getArtists() {
        return artists;
    }

    public Band artists(Set<Artist> artists) {
        this.artists = artists;
        return this;
    }

    public Band addArtist(Artist artist) {
        this.artists.add(artist);
        artist.setBand(this);
        return this;
    }

    public Band removeArtist(Artist artist) {
        this.artists.remove(artist);
        artist.setBand(null);
        return this;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public Set<ValoracionBand> getValoracions() {
        return valoracions;
    }

    public Band valoracions(Set<ValoracionBand> valoracionBands) {
        this.valoracions = valoracionBands;
        return this;
    }

    public Band addValoracion(ValoracionBand valoracionBand) {
        this.valoracions.add(valoracionBand);
        valoracionBand.setBand(this);
        return this;
    }

    public Band removeValoracion(ValoracionBand valoracionBand) {
        this.valoracions.remove(valoracionBand);
        valoracionBand.setBand(null);
        return this;
    }

    public void setValoracions(Set<ValoracionBand> valoracionBands) {
        this.valoracions = valoracionBands;
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
        Band band = (Band) o;
        if (band.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), band.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Band{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", locationGoogleMaps='" + getLocationGoogleMaps() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", logitude='" + getLogitude() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
