import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ValoracionArtist } from './valoracion-artist.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ValoracionArtistService {

    private resourceUrl = SERVER_API_URL + 'api/valoracion-artists';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(valoracionArtist: ValoracionArtist): Observable<ValoracionArtist> {
        const copy = this.convert(valoracionArtist);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(valoracionArtist: ValoracionArtist): Observable<ValoracionArtist> {
        const copy = this.convert(valoracionArtist);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ValoracionArtist> {
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
     * Convert a returned JSON object to ValoracionArtist.
     */
    private convertItemFromServer(json: any): ValoracionArtist {
        const entity: ValoracionArtist = Object.assign(new ValoracionArtist(), json);
        entity.timestamp = this.dateUtils
            .convertDateTimeFromServer(json.timestamp);
        return entity;
    }

    /**
     * Convert a ValoracionArtist to a JSON which can be sent to the server.
     */
    private convert(valoracionArtist: ValoracionArtist): ValoracionArtist {
        const copy: ValoracionArtist = Object.assign({}, valoracionArtist);

        copy.timestamp = this.dateUtils.toDate(valoracionArtist.timestamp);
        return copy;
    }
}
