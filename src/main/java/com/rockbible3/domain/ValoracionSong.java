package com.rockbible3.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ValoracionSong.
 */
@Entity
@Table(name = "valoracion_song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ValoracionSong implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "puntuacion")
    private Integer puntuacion;

    @Column(name = "jhi_like")
    private Boolean like;

    @Column(name = "jhi_timestamp")
    private ZonedDateTime timestamp;

    @ManyToOne
    private Song song;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPuntuacion() {
        return puntuacion;
    }

    public ValoracionSong puntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
        return this;
    }

    public void setPuntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
    }

    public Boolean isLike() {
        return like;
    }

    public ValoracionSong like(Boolean like) {
        this.like = like;
        return this;
    }

    public void setLike(Boolean like) {
        this.like = like;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }

    public ValoracionSong timestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Song getSong() {
        return song;
    }

    public ValoracionSong song(Song song) {
        this.song = song;
        return this;
    }

    public void setSong(Song song) {
        this.song = song;
    }

    public User getUser() {
        return user;
    }

    public ValoracionSong user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        ValoracionSong valoracionSong = (ValoracionSong) o;
        if (valoracionSong.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), valoracionSong.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ValoracionSong{" +
            "id=" + getId() +
            ", puntuacion='" + getPuntuacion() + "'" +
            ", like='" + isLike() + "'" +
            ", timestamp='" + getTimestamp() + "'" +
            "}";
    }
}
