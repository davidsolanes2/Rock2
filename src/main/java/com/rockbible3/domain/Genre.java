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
 * A Genre.
 */
@Entity
@Table(name = "genre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Genre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "genre")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Song> songs = new HashSet<>();

    @ManyToMany(mappedBy = "genres")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Band> bands = new HashSet<>();

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

    public Genre name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public Genre songs(Set<Song> songs) {
        this.songs = songs;
        return this;
    }

    public Genre addSong(Song song) {
        this.songs.add(song);
        song.setGenre(this);
        return this;
    }

    public Genre removeSong(Song song) {
        this.songs.remove(song);
        song.setGenre(null);
        return this;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public Set<Band> getBands() {
        return bands;
    }

    public Genre bands(Set<Band> bands) {
        this.bands = bands;
        return this;
    }

    public Genre addBand(Band band) {
        this.bands.add(band);
        band.getGenres().add(this);
        return this;
    }

    public Genre removeBand(Band band) {
        this.bands.remove(band);
        band.getGenres().remove(this);
        return this;
    }

    public void setBands(Set<Band> bands) {
        this.bands = bands;
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
        Genre genre = (Genre) o;
        if (genre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), genre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Genre{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
