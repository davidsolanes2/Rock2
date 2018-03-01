import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Pages } from './pages.model';
import { createRequestOption } from '../../shared';

export type PagesResponseType = HttpResponse<Pages>;
export type PagesArrayResponseType = HttpResponse<Pages[]>;

@Injectable()
export class PagesService {

    private resourceUrl = SERVER_API_URL + 'api/pageconciertos/pages';

    constructor(private http: HttpClient) { }

    create(pages: Pages): Observable<PagesResponseType> {
        const copy = this.convert(pages);
        return this.http.post<Pages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: PagesResponseType) => this.convertResponse(res));
    }

    update(pages: Pages): Observable<PagesResponseType> {
        const copy = this.convert(pages);
        return this.http.put<Pages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: PagesResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<PagesResponseType> {
        const options = createRequestOption(req);
        return this.http.get<Pages>(this.resourceUrl, { observe: 'response' })
            .map((res: PagesResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: PagesResponseType): PagesResponseType {
        const body: Pages = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: PagesArrayResponseType): PagesArrayResponseType {
        const jsonResponse: Pages[] = res.body;
        const body: Pages[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Pages.
     */
    private convertItemFromServer(json: any): Pages {
        const copy: Pages = Object.assign(new Pages(), json);
        return copy;
    }

    /**
     * Convert a Pages to a JSON which can be sent to the server.
     */
    private convert(pages: Pages): Pages {
        const copy: Pages = Object.assign({}, pages);
        return copy;
    }
}
