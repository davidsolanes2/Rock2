/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ValoracionArtistDetailComponent } from '../../../../../../main/webapp/app/entities/valoracion-artist/valoracion-artist-detail.component';
import { ValoracionArtistService } from '../../../../../../main/webapp/app/entities/valoracion-artist/valoracion-artist.service';
import { ValoracionArtist } from '../../../../../../main/webapp/app/entities/valoracion-artist/valoracion-artist.model';

describe('Component Tests', () => {

    describe('ValoracionArtist Management Detail Component', () => {
        let comp: ValoracionArtistDetailComponent;
        let fixture: ComponentFixture<ValoracionArtistDetailComponent>;
        let service: ValoracionArtistService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [ValoracionArtistDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ValoracionArtistService,
                    JhiEventManager
                ]
            }).overrideTemplate(ValoracionArtistDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValoracionArtistDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValoracionArtistService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ValoracionArtist(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.valoracionArtist).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
