import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { CollectionsTicketMaster } from './collections-ticket-master.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CollectionsTicketMasterService {

    private resourceUrl = SERVER_API_URL + 'api/collections-ticket-masters';

    constructor(private http: Http) { }

    create(collectionsTicketMaster: CollectionsTicketMaster): Observable<CollectionsTicketMaster> {
        const copy = this.convert(collectionsTicketMaster);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(collectionsTicketMaster: CollectionsTicketMaster): Observable<CollectionsTicketMaster> {
        const copy = this.convert(collectionsTicketMaster);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CollectionsTicketMaster> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to CollectionsTicketMaster.
     */
    private convertItemFromServer(json: any): CollectionsTicketMaster {
        const entity: CollectionsTicketMaster = Object.assign(new CollectionsTicketMaster(), json);
        return entity;
    }

    /**
     * Convert a CollectionsTicketMaster to a JSON which can be sent to the server.
     */
    private convert(collectionsTicketMaster: CollectionsTicketMaster): CollectionsTicketMaster {
        const copy: CollectionsTicketMaster = Object.assign({}, collectionsTicketMaster);
        return copy;
    }
}
