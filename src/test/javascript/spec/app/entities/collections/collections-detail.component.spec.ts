/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CollectionsDetailComponent } from '../../../../../../main/webapp/app/entities/collections/collections-detail.component';
import { CollectionsService } from '../../../../../../main/webapp/app/entities/collections/collections.service';
import { Collections } from '../../../../../../main/webapp/app/entities/collections/collections.model';

describe('Component Tests', () => {

    describe('Collections Management Detail Component', () => {
        let comp: CollectionsDetailComponent;
        let fixture: ComponentFixture<CollectionsDetailComponent>;
        let service: CollectionsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [CollectionsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CollectionsService,
                    JhiEventManager
                ]
            }).overrideTemplate(CollectionsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CollectionsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CollectionsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Collections(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.collections).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
