/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { Rockbible3TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SongDetailComponent } from '../../../../../../main/webapp/app/entities/song/song-detail.component';
import { SongService } from '../../../../../../main/webapp/app/entities/song/song.service';
import { Song } from '../../../../../../main/webapp/app/entities/song/song.model';

describe('Component Tests', () => {

    describe('Song Management Detail Component', () => {
        let comp: SongDetailComponent;
        let fixture: ComponentFixture<SongDetailComponent>;
        let service: SongService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Rockbible3TestModule],
                declarations: [SongDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SongService,
                    JhiEventManager
                ]
            }).overrideTemplate(SongDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SongDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SongService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Song(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.song).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
