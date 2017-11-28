import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ValoracionBand } from './valoracion-band.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ValoracionBandService {

    private resourceUrl = SERVER_API_URL + 'api/valoracion-bands';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(valoracionBand: ValoracionBand): Observable<ValoracionBand> {
        const copy = this.convert(valoracionBand);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(valoracionBand: ValoracionBand): Observable<ValoracionBand> {
        const copy = this.convert(valoracionBand);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ValoracionBand> {
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
     * Convert a returned JSON object to ValoracionBand.
     */
    private convertItemFromServer(json: any): ValoracionBand {
        const entity: ValoracionBand = Object.assign(new ValoracionBand(), json);
        entity.timestamp = this.dateUtils
            .convertDateTimeFromServer(json.timestamp);
        return entity;
    }

    /**
     * Convert a ValoracionBand to a JSON which can be sent to the server.
     */
    private convert(valoracionBand: ValoracionBand): ValoracionBand {
        const copy: ValoracionBand = Object.assign({}, valoracionBand);

        copy.timestamp = this.dateUtils.toDate(valoracionBand.timestamp);
        return copy;
    }
}
