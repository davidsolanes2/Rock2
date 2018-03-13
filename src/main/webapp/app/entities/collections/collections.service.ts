import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Collections } from './collections.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CollectionsService {

    private resourceUrl = SERVER_API_URL + 'api/collections';

    constructor(private http: Http) { }

    create(collections: Collections): Observable<Collections> {
        const copy = this.convert(collections);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    like(idNapster: string): Observable<Collections> {
        return this.http.post(this.resourceUrl + '/songs/' + idNapster, '').map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    listar(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl + '/NapsterbyUser')
            .map((res: Response) => this.convertResponse(res));
    }

    update(collections: Collections): Observable<Collections> {
        const copy = this.convert(collections);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Collections> {
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
     * Convert a returned JSON object to Collections.
     */
    private convertItemFromServer(json: any): Collections {
        const entity: Collections = Object.assign(new Collections(), json);
        return entity;
    }

    /**
     * Convert a Collections to a JSON which can be sent to the server.
     */
    private convert(collections: Collections): Collections {
        const copy: Collections = Object.assign({}, collections);
        return copy;
    }
}
