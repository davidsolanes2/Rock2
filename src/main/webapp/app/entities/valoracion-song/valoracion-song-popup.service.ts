import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ValoracionSong } from './valoracion-song.model';
import { ValoracionSongService } from './valoracion-song.service';

@Injectable()
export class ValoracionSongPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private valoracionSongService: ValoracionSongService

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
                this.valoracionSongService.find(id).subscribe((valoracionSong) => {
                    valoracionSong.timestamp = this.datePipe
                        .transform(valoracionSong.timestamp, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.valoracionSongModalRef(component, valoracionSong);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.valoracionSongModalRef(component, new ValoracionSong());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    valoracionSongModalRef(component: Component, valoracionSong: ValoracionSong): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.valoracionSong = valoracionSong;
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
