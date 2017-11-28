/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ValoracionBandDetailComponent } from '../../../../../../main/webapp/app/entities/valoracion-band/valoracion-band-detail.component';
import { ValoracionBandService } from '../../../../../../main/webapp/app/entities/valoracion-band/valoracion-band.service';
import { ValoracionBand } from '../../../../../../main/webapp/app/entities/valoracion-band/valoracion-band.model';

describe('Component Tests', () => {

    describe('ValoracionBand Management Detail Component', () => {
        let comp: ValoracionBandDetailComponent;
        let fixture: ComponentFixture<ValoracionBandDetailComponent>;
        let service: ValoracionBandService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [ValoracionBandDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ValoracionBandService,
                    JhiEventManager
                ]
            }).overrideTemplate(ValoracionBandDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValoracionBandDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValoracionBandService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ValoracionBand(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.valoracionBand).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
