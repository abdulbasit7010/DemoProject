import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      
    ],
    declarations: [
      AuthService
    ],
    providers:[
      CookieService
    ]
  }).compileComponents());

  // it('should be created', () => {
  //   const service: AuthService = TestBed.get(AuthService);
  //   expect(service).toBeTruthy();
  // });
});
