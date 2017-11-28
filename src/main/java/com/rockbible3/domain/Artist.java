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

import com.rockbible3.domain.enumeration.Sex;

import com.rockbible3.domain.enumeration.Status;

/**
 * A Artist.
 */
@Entity
@Table(name = "artist")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Artist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexo")
    private Sex sexo;

    @Column(name = "born")
    private LocalDate born;

    @Column(name = "death_date")
    private LocalDate deathDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    private Band band;

    @ManyToOne
    private Country country;

    @ManyToOne
    private Label label;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "artist_instrument",
               joinColumns = @JoinColumn(name="artists_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="instruments_id", referencedColumnName="id"))
    private Set<Instrument> instruments = new HashSet<>();

    @OneToMany(mappedBy = "artist")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ValoracionArtist> valoracions = new HashSet<>();

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

    public Artist name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Sex getSexo() {
        return sexo;
    }

    public Artist sexo(Sex sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(Sex sexo) {
        this.sexo = sexo;
    }

    public LocalDate getBorn() {
        return born;
    }

    public Artist born(LocalDate born) {
        this.born = born;
        return this;
    }

    public void setBorn(LocalDate born) {
        this.born = born;
    }

    public LocalDate getDeathDate() {
        return deathDate;
    }

    public Artist deathDate(LocalDate deathDate) {
        this.deathDate = deathDate;
        return this;
    }

    public void setDeathDate(LocalDate deathDate) {
        this.deathDate = deathDate;
    }

    public Status getStatus() {
        return status;
    }

    public Artist status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Band getBand() {
        return band;
    }

    public Artist band(Band band) {
        this.band = band;
        return this;
    }

    public void setBand(Band band) {
        this.band = band;
    }

    public Country getCountry() {
        return country;
    }

    public Artist country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Label getLabel() {
        return label;
    }

    public Artist label(Label label) {
        this.label = label;
        return this;
    }

    public void setLabel(Label label) {
        this.label = label;
    }

    public Set<Instrument> getInstruments() {
        return instruments;
    }

    public Artist instruments(Set<Instrument> instruments) {
        this.instruments = instruments;
        return this;
    }

    public Artist addInstrument(Instrument instrument) {
        this.instruments.add(instrument);
        instrument.getArtists().add(this);
        return this;
    }

    public Artist removeInstrument(Instrument instrument) {
        this.instruments.remove(instrument);
        instrument.getArtists().remove(this);
        return this;
    }

    public void setInstruments(Set<Instrument> instruments) {
        this.instruments = instruments;
    }

    public Set<ValoracionArtist> getValoracions() {
        return valoracions;
    }

    public Artist valoracions(Set<ValoracionArtist> valoracionArtists) {
        this.valoracions = valoracionArtists;
        return this;
    }

    public Artist addValoracion(ValoracionArtist valoracionArtist) {
        this.valoracions.add(valoracionArtist);
        valoracionArtist.setArtist(this);
        return this;
    }

    public Artist removeValoracion(ValoracionArtist valoracionArtist) {
        this.valoracions.remove(valoracionArtist);
        valoracionArtist.setArtist(null);
        return this;
    }

    public void setValoracions(Set<ValoracionArtist> valoracionArtists) {
        this.valoracions = valoracionArtists;
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
        Artist artist = (Artist) o;
        if (artist.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), artist.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Artist{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", born='" + getBorn() + "'" +
            ", deathDate='" + getDeathDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
