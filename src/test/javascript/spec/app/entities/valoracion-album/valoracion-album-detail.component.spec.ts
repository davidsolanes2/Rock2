/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ValoracionAlbumDetailComponent } from '../../../../../../main/webapp/app/entities/valoracion-album/valoracion-album-detail.component';
import { ValoracionAlbumService } from '../../../../../../main/webapp/app/entities/valoracion-album/valoracion-album.service';
import { ValoracionAlbum } from '../../../../../../main/webapp/app/entities/valoracion-album/valoracion-album.model';

describe('Component Tests', () => {

    describe('ValoracionAlbum Management Detail Component', () => {
        let comp: ValoracionAlbumDetailComponent;
        let fixture: ComponentFixture<ValoracionAlbumDetailComponent>;
        let service: ValoracionAlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [ValoracionAlbumDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ValoracionAlbumService,
                    JhiEventManager
                ]
            }).overrideTemplate(ValoracionAlbumDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValoracionAlbumDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValoracionAlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ValoracionAlbum(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.valoracionAlbum).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
