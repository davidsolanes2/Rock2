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
 * A Album.
 */
@Entity
@Table(name = "album")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "num_songs")
    private Integer numSongs;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @ManyToOne
    private Band band;

    @OneToMany(mappedBy = "album")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Song> songs = new HashSet<>();

    @OneToMany(mappedBy = "album")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ValoracionAlbum> valoracions = new HashSet<>();

    @ManyToMany(mappedBy = "albums")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserExt> users = new HashSet<>();

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

    public Album name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumSongs() {
        return numSongs;
    }

    public Album numSongs(Integer numSongs) {
        this.numSongs = numSongs;
        return this;
    }

    public void setNumSongs(Integer numSongs) {
        this.numSongs = numSongs;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public Album releaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Band getBand() {
        return band;
    }

    public Album band(Band band) {
        this.band = band;
        return this;
    }

    public void setBand(Band band) {
        this.band = band;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public Album songs(Set<Song> songs) {
        this.songs = songs;
        return this;
    }

    public Album addSong(Song song) {
        this.songs.add(song);
        song.setAlbum(this);
        return this;
    }

    public Album removeSong(Song song) {
        this.songs.remove(song);
        song.setAlbum(null);
        return this;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }

    public Set<ValoracionAlbum> getValoracions() {
        return valoracions;
    }

    public Album valoracions(Set<ValoracionAlbum> valoracionAlbums) {
        this.valoracions = valoracionAlbums;
        return this;
    }

    public Album addValoracion(ValoracionAlbum valoracionAlbum) {
        this.valoracions.add(valoracionAlbum);
        valoracionAlbum.setAlbum(this);
        return this;
    }

    public Album removeValoracion(ValoracionAlbum valoracionAlbum) {
        this.valoracions.remove(valoracionAlbum);
        valoracionAlbum.setAlbum(null);
        return this;
    }

    public void setValoracions(Set<ValoracionAlbum> valoracionAlbums) {
        this.valoracions = valoracionAlbums;
    }

    public Set<UserExt> getUsers() {
        return users;
    }

    public Album users(Set<UserExt> userExts) {
        this.users = userExts;
        return this;
    }

    public Album addUser(UserExt userExt) {
        this.users.add(userExt);
        userExt.getAlbums().add(this);
        return this;
    }

    public Album removeUser(UserExt userExt) {
        this.users.remove(userExt);
        userExt.getAlbums().remove(this);
        return this;
    }

    public void setUsers(Set<UserExt> userExts) {
        this.users = userExts;
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
        Album album = (Album) o;
        if (album.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), album.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Album{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", numSongs='" + getNumSongs() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            "}";
    }
}
