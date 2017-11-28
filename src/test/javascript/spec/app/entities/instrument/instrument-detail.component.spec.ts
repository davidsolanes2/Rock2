/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { InstrumentDetailComponent } from '../../../../../../main/webapp/app/entities/instrument/instrument-detail.component';
import { InstrumentService } from '../../../../../../main/webapp/app/entities/instrument/instrument.service';
import { Instrument } from '../../../../../../main/webapp/app/entities/instrument/instrument.model';

describe('Component Tests', () => {

    describe('Instrument Management Detail Component', () => {
        let comp: InstrumentDetailComponent;
        let fixture: ComponentFixture<InstrumentDetailComponent>;
        let service: InstrumentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [InstrumentDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    InstrumentService,
                    JhiEventManager
                ]
            }).overrideTemplate(InstrumentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InstrumentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InstrumentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Instrument(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.instrument).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
