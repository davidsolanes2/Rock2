package com.rockbible3.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CollectionsTicketMaster.
 */
@Entity
@Table(name = "collections_ticket_master")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CollectionsTicketMaster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_master_id")
    private String ticketMasterId;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketMasterId() {
        return ticketMasterId;
    }

    public CollectionsTicketMaster ticketMasterId(String ticketMasterId) {
        this.ticketMasterId = ticketMasterId;
        return this;
    }

    public void setTicketMasterId(String ticketMasterId) {
        this.ticketMasterId = ticketMasterId;
    }

    public User getUser() {
        return user;
    }

    public CollectionsTicketMaster user(User user) {
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
        CollectionsTicketMaster collectionsTicketMaster = (CollectionsTicketMaster) o;
        if (collectionsTicketMaster.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), collectionsTicketMaster.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CollectionsTicketMaster{" +
            "id=" + getId() +
            ", ticketMasterId='" + getTicketMasterId() + "'" +
            "}";
    }
}
