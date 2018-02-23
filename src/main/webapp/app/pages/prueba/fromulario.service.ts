import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Fromulario } from './fromulario.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FromularioService {

    private resourceUrl = SERVER_API_URL + 'api/prueba/fromulario';

    constructor(private http: Http) { }

    create(fromulario: Fromulario): Observable<Fromulario> {
        const copy = this.convert(fromulario);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fromulario: Fromulario): Observable<Fromulario> {
        const copy = this.convert(fromulario);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
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
     * Convert a returned JSON object to Fromulario.
     */
    private convertItemFromServer(json: any): Fromulario {
        const entity: Fromulario = Object.assign(new Fromulario(), json);
        return entity;
    }

    /**
     * Convert a Fromulario to a JSON which can be sent to the server.
     */
    private convert(fromulario: Fromulario): Fromulario {
        const copy: Fromulario = Object.assign({}, fromulario);
        return copy;
    }
}
