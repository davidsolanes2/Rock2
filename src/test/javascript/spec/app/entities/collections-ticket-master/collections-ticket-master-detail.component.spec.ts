/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CollectionsTicketMasterDetailComponent } from '../../../../../../main/webapp/app/entities/collections-ticket-master/collections-ticket-master-detail.component';
import { CollectionsTicketMasterService } from '../../../../../../main/webapp/app/entities/collections-ticket-master/collections-ticket-master.service';
import { CollectionsTicketMaster } from '../../../../../../main/webapp/app/entities/collections-ticket-master/collections-ticket-master.model';

describe('Component Tests', () => {

    describe('CollectionsTicketMaster Management Detail Component', () => {
        let comp: CollectionsTicketMasterDetailComponent;
        let fixture: ComponentFixture<CollectionsTicketMasterDetailComponent>;
        let service: CollectionsTicketMasterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [CollectionsTicketMasterDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CollectionsTicketMasterService,
                    JhiEventManager
                ]
            }).overrideTemplate(CollectionsTicketMasterDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CollectionsTicketMasterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CollectionsTicketMasterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CollectionsTicketMaster(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.collectionsTicketMaster).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
