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

  it('should get token from login', inject([AuthService, HttpTestingController], (service: AuthService, backend: HttpTestingController) => {
    const token = {token: 'l21l3kjrl1k3jfl1kj3flk1j3fl1k3hgj'};
    const user: User = {email: 'test@mail.com', password: '123321q'};
    // Send user in login
    service.login(user).subscribe(user => expect(user).toEqual(token));
    // Send mock request
    backend.expectOne({method: 'POST', url: '/api/login'}).flush(token);
  }));

});
