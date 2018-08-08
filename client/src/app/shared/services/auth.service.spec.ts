import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from './auth.service';
import { User } from "../interfaces";

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return token = null without auth', inject([AuthService], (service) => {
    expect(service.getToken).toEqual(null);
  }));

  it('should get token from login',
    inject([AuthService, HttpTestingController],
      (service: AuthService, backend: HttpTestingController) => {
        const token = {token: 'l21l3kjrl1k3jfl1kj3flk1j3fl1k3hgj'};
        const user: User = {email: 'test@mail.com', password: '123321q'};
        service.login(user).subscribe(user => expect(user).toEqual(token));
        backend.expectOne({method: 'POST', url: '/api/login'}).flush(token);
      }));

  it('should get user from register',
    inject([AuthService, HttpTestingController],
      (service: AuthService, backend: HttpTestingController) => {
        const user: User = {email: 'test@test.com', password: '123321q'};
        service.register(user).subscribe(user => expect(user).toEqual(user));
        backend.expectOne({method: 'POST', url: '/api/register'}).flush(user);
      }));
});
