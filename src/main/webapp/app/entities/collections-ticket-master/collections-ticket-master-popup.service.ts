import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CollectionsTicketMaster } from './collections-ticket-master.model';
import { CollectionsTicketMasterService } from './collections-ticket-master.service';

@Injectable()
export class CollectionsTicketMasterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private collectionsTicketMasterService: CollectionsTicketMasterService

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
                this.collectionsTicketMasterService.find(id).subscribe((collectionsTicketMaster) => {
                    this.ngbModalRef = this.collectionsTicketMasterModalRef(component, collectionsTicketMaster);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.collectionsTicketMasterModalRef(component, new CollectionsTicketMaster());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    collectionsTicketMasterModalRef(component: Component, collectionsTicketMaster: CollectionsTicketMaster): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.collectionsTicketMaster = collectionsTicketMaster;
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
