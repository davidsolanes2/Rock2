/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ValoracionSongDetailComponent } from '../../../../../../main/webapp/app/entities/valoracion-song/valoracion-song-detail.component';
import { ValoracionSongService } from '../../../../../../main/webapp/app/entities/valoracion-song/valoracion-song.service';
import { ValoracionSong } from '../../../../../../main/webapp/app/entities/valoracion-song/valoracion-song.model';

describe('Component Tests', () => {

    describe('ValoracionSong Management Detail Component', () => {
        let comp: ValoracionSongDetailComponent;
        let fixture: ComponentFixture<ValoracionSongDetailComponent>;
        let service: ValoracionSongService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [ValoracionSongDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ValoracionSongService,
                    JhiEventManager
                ]
            }).overrideTemplate(ValoracionSongDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ValoracionSongDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ValoracionSongService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ValoracionSong(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.valoracionSong).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
