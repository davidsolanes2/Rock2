package com.rockbible3.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Label.
 */
@Entity
@Table(name = "label")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Label implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "foundationdate")
    private LocalDate foundationdate;

    @OneToMany(mappedBy = "label")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Band> bands = new HashSet<>();

    @OneToMany(mappedBy = "label")
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

    public Label name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getFoundationdate() {
        return foundationdate;
    }

    public Label foundationdate(LocalDate foundationdate) {
        this.foundationdate = foundationdate;
        return this;
    }

    public void setFoundationdate(LocalDate foundationdate) {
        this.foundationdate = foundationdate;
    }

    public Set<Band> getBands() {
        return bands;
    }

    public Label bands(Set<Band> bands) {
        this.bands = bands;
        return this;
    }

    public Label addBand(Band band) {
        this.bands.add(band);
        band.setLabel(this);
        return this;
    }

    public Label removeBand(Band band) {
        this.bands.remove(band);
        band.setLabel(null);
        return this;
    }

    public void setBands(Set<Band> bands) {
        this.bands = bands;
    }

    public Set<Artist> getArtists() {
        return artists;
    }

    public Label artists(Set<Artist> artists) {
        this.artists = artists;
        return this;
    }

    public Label addArtist(Artist artist) {
        this.artists.add(artist);
        artist.setLabel(this);
        return this;
    }

    public Label removeArtist(Artist artist) {
        this.artists.remove(artist);
        artist.setLabel(null);
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
        Label label = (Label) o;
        if (label.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), label.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Label{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", foundationdate='" + getFoundationdate() + "'" +
            "}";
    }
}
