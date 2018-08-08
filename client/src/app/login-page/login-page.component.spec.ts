import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from "../shared/services/auth.service";
import { of } from "rxjs/index";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let auth: AuthService;
  let spy: jasmine.Spy;
  let token = {token: '123asdflk1234ljkasd'};

  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    auth = fixture.debugElement.injector.get(AuthService);
    spy = spyOn(auth, 'login').and.returnValue(of(token));

    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type="email"]'));
    passwordEl = fixture.debugElement.query(By.css('input[type="password"]'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Setting enabled to false disables the submit button', () => {
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('Entering email nd password loggedIn event', () => {
    passwordEl.nativeElement.value = '123321q';
    loginEl.nativeElement.value = 'test@mail.ru';
    submitEl.triggerEventHandler('click', null);
    // expect(component.form.value.email).toBe('test@mail.ru');
    // expect(component.form.value.password).toBe('123321q');
  });

  it('should call auth service', () => {
    component.onSubmit();
    expect(spy.calls.any()).toBeTruthy();
  });
});
