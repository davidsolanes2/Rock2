import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ValoracionBand } from './valoracion-band.model';
import { ValoracionBandService } from './valoracion-band.service';

@Injectable()
export class ValoracionBandPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private valoracionBandService: ValoracionBandService

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
                this.valoracionBandService.find(id).subscribe((valoracionBand) => {
                    valoracionBand.timestamp = this.datePipe
                        .transform(valoracionBand.timestamp, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.valoracionBandModalRef(component, valoracionBand);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.valoracionBandModalRef(component, new ValoracionBand());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    valoracionBandModalRef(component: Component, valoracionBand: ValoracionBand): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.valoracionBand = valoracionBand;
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
