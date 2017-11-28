import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ValoracionAlbum } from './valoracion-album.model';
import { ValoracionAlbumService } from './valoracion-album.service';

@Component({
    selector: 'jhi-valoracion-album-detail',
    templateUrl: './valoracion-album-detail.component.html'
})
export class ValoracionAlbumDetailComponent implements OnInit, OnDestroy {

    valoracionAlbum: ValoracionAlbum;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private valoracionAlbumService: ValoracionAlbumService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInValoracionAlbums();
    }

    load(id) {
        this.valoracionAlbumService.find(id).subscribe((valoracionAlbum) => {
            this.valoracionAlbum = valoracionAlbum;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInValoracionAlbums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'valoracionAlbumListModification',
            (response) => this.load(this.valoracionAlbum.id)
        );
    }
}
