import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ValoracionArtist } from './valoracion-artist.model';
import { ValoracionArtistService } from './valoracion-artist.service';

@Injectable()
export class ValoracionArtistPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private valoracionArtistService: ValoracionArtistService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.valoracionArtistService.find(id).subscribe((valoracionArtist) => {
                    valoracionArtist.timestamp = this.datePipe
                        .transform(valoracionArtist.timestamp, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.valoracionArtistModalRef(component, valoracionArtist);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.valoracionArtistModalRef(component, new ValoracionArtist());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    valoracionArtistModalRef(component: Component, valoracionArtist: ValoracionArtist): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.valoracionArtist = valoracionArtist;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
