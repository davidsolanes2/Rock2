import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ValoracionAlbum } from './valoracion-album.model';
import { ValoracionAlbumService } from './valoracion-album.service';

@Injectable()
export class ValoracionAlbumPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private valoracionAlbumService: ValoracionAlbumService

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
                this.valoracionAlbumService.find(id).subscribe((valoracionAlbum) => {
                    valoracionAlbum.timestamp = this.datePipe
                        .transform(valoracionAlbum.timestamp, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.valoracionAlbumModalRef(component, valoracionAlbum);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.valoracionAlbumModalRef(component, new ValoracionAlbum());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    valoracionAlbumModalRef(component: Component, valoracionAlbum: ValoracionAlbum): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.valoracionAlbum = valoracionAlbum;
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
