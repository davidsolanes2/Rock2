import {AfterViewInit, Component, ElementRef, OnInit, Renderer} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {JhiEventManager, JhiLanguageService} from 'ng-jhipster';

import {LoginService} from './login.service';
import {StateStorageService} from '../auth/state-storage.service';
import {Register} from "../../account/register/register.service";
import {EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE} from "../index";

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html',
    styleUrls: [
        'login.css'
    ]
})
export class JhiLoginModalComponent implements OnInit, AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    registerAccount: any;
    errors: string;
    success: boolean;
    confirmPassword: string;
    errorEmailExists: string;
    errorUserExists: string;
    doNotMatch: string;
    error: string;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        public activeModal: NgbActiveModal,
        private languageService: JhiLanguageService,
        private registerService: Register
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
    }
    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['pagehome-phome']);
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            this.router.navigate(['pagehome-phome']);

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }



    register() {
        this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    registerForm() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.languageService.getCurrent().then((key) => {
                this.registerAccount.langKey = key;
                this.registerService.save(this.registerAccount).subscribe(() => {
                    this.success = true;
                }, (response) => this.processError(response));
            });
        }
    }
    requestResetPassword() {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
    private processError(response) {
        this.success = null;
        if (response.status === 400 && response.json().type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.json().type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
