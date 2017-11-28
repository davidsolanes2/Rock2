/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BandDetailComponent } from '../../../../../../main/webapp/app/entities/band/band-detail.component';
import { BandService } from '../../../../../../main/webapp/app/entities/band/band.service';
import { Band } from '../../../../../../main/webapp/app/entities/band/band.model';

describe('Component Tests', () => {

    describe('Band Management Detail Component', () => {
        let comp: BandDetailComponent;
        let fixture: ComponentFixture<BandDetailComponent>;
        let service: BandService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [BandDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BandService,
                    JhiEventManager
                ]
            }).overrideTemplate(BandDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BandDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BandService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Band(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.band).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
