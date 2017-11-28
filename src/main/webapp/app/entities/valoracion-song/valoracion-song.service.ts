import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ValoracionSong } from './valoracion-song.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ValoracionSongService {

    private resourceUrl = SERVER_API_URL + 'api/valoracion-songs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(valoracionSong: ValoracionSong): Observable<ValoracionSong> {
        const copy = this.convert(valoracionSong);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(valoracionSong: ValoracionSong): Observable<ValoracionSong> {
        const copy = this.convert(valoracionSong);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ValoracionSong> {
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
     * Convert a returned JSON object to ValoracionSong.
     */
    private convertItemFromServer(json: any): ValoracionSong {
        const entity: ValoracionSong = Object.assign(new ValoracionSong(), json);
        entity.timestamp = this.dateUtils
            .convertDateTimeFromServer(json.timestamp);
        return entity;
    }

    /**
     * Convert a ValoracionSong to a JSON which can be sent to the server.
     */
    private convert(valoracionSong: ValoracionSong): ValoracionSong {
        const copy: ValoracionSong = Object.assign({}, valoracionSong);

        copy.timestamp = this.dateUtils.toDate(valoracionSong.timestamp);
        return copy;
    }
}
