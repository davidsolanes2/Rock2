import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Band } from './band.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BandService {

    private resourceUrl = SERVER_API_URL + 'api/bands';

    constructor(private http: Http) { }

    create(band: Band): Observable<Band> {
        const copy = this.convert(band);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(band: Band): Observable<Band> {
        const copy = this.convert(band);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Band> {
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
     * Convert a returned JSON object to Band.
     */
    private convertItemFromServer(json: any): Band {
        const entity: Band = Object.assign(new Band(), json);
        return entity;
    }

    /**
     * Convert a Band to a JSON which can be sent to the server.
     */
    private convert(band: Band): Band {
        const copy: Band = Object.assign({}, band);
        return copy;
    }
}
