import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ValoracionArtist } from './valoracion-artist.model';
import { ValoracionArtistService } from './valoracion-artist.service';

@Component({
    selector: 'jhi-valoracion-artist-detail',
    templateUrl: './valoracion-artist-detail.component.html'
})
export class ValoracionArtistDetailComponent implements OnInit, OnDestroy {

    valoracionArtist: ValoracionArtist;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private valoracionArtistService: ValoracionArtistService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInValoracionArtists();
    }

    load(id) {
        this.valoracionArtistService.find(id).subscribe((valoracionArtist) => {
            this.valoracionArtist = valoracionArtist;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInValoracionArtists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'valoracionArtistListModification',
            (response) => this.load(this.valoracionArtist.id)
        );
    }
}
