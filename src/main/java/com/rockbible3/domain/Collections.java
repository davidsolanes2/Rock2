package com.rockbible3.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Collections.
 */
@Entity
@Table(name = "collections")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Collections implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "napster_id")
    private String napsterId;

    @Column(name = "jhi_type")
    private String type;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNapsterId() {
        return napsterId;
    }

    public Collections napsterId(String napsterId) {
        this.napsterId = napsterId;
        return this;
    }

    public void setNapsterId(String napsterId) {
        this.napsterId = napsterId;
    }

    public String getType() {
        return type;
    }

    public Collections type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public Collections user(User user) {
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
        Collections collections = (Collections) o;
        if (collections.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), collections.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Collections{" +
            "id=" + getId() +
            ", napsterId='" + getNapsterId() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
