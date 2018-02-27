import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Phome } from './phome.model';
import { createRequestOption } from '../../shared';

export type PhomeResponseType = HttpResponse<Phome>;
export type PhomeArrayResponseType = HttpResponse<Phome[]>;

@Injectable()
export class PhomeService {

    private resourceUrl = SERVER_API_URL + 'api/pagehome/phome';

    constructor(private http: HttpClient) { }

    create(phome: Phome): Observable<PhomeResponseType> {
        const copy = this.convert(phome);
        return this.http.post<Phome>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: PhomeResponseType) => this.convertResponse(res));
    }

    update(phome: Phome): Observable<PhomeResponseType> {
        const copy = this.convert(phome);
        return this.http.put<Phome>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: PhomeResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<PhomeResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Phome>(this.resourceUrl, { observe: 'response' })
            .map((res: PhomeResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: PhomeResponseType): PhomeResponseType {
        const body: Phome = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: PhomeArrayResponseType): PhomeArrayResponseType {
        const jsonResponse: Phome[] = res.body;
        const body: Phome[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Phome.
     */
    private convertItemFromServer(json: any): Phome {
        const copy: Phome = Object.assign(new Phome(), json);
        return copy;
    }

    /**
     * Convert a Phome to a JSON which can be sent to the server.
     */
    private convert(phome: Phome): Phome {
        const copy: Phome = Object.assign({}, phome);
        return copy;
    }
}
