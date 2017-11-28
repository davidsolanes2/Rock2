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
 * A Song.
 */
@Entity
@Table(name = "song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private Album album;

    @OneToMany(mappedBy = "song")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ValoracionSong> valoracions = new HashSet<>();

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

    public Song name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Song description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Album getAlbum() {
        return album;
    }

    public Song album(Album album) {
        this.album = album;
        return this;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Set<ValoracionSong> getValoracions() {
        return valoracions;
    }

    public Song valoracions(Set<ValoracionSong> valoracionSongs) {
        this.valoracions = valoracionSongs;
        return this;
    }

    public Song addValoracion(ValoracionSong valoracionSong) {
        this.valoracions.add(valoracionSong);
        valoracionSong.setSong(this);
        return this;
    }

    public Song removeValoracion(ValoracionSong valoracionSong) {
        this.valoracions.remove(valoracionSong);
        valoracionSong.setSong(null);
        return this;
    }

    public void setValoracions(Set<ValoracionSong> valoracionSongs) {
        this.valoracions = valoracionSongs;
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
        Song song = (Song) o;
        if (song.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), song.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
