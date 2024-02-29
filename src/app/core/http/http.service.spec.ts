import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG, AppConfig } from '@core/config';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    const mockAppConfig: AppConfig = {
      API_URL: 'http://mock-api-url.com',
      // ... other properties of AppConfig if needed
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule to the imports array
      providers: [HttpService, { provide: APP_CONFIG, useValue: mockAppConfig }],
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
