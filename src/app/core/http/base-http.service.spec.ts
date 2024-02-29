import { TestBed } from '@angular/core/testing';
import { BaseHttpService, ErrorTypes } from './base-http.service';

describe('BaseHttpService', () => {
  let service: BaseHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseHttpService],
    });
    service = TestBed.inject(BaseHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle errors and assign type', (done) => {
    const errorMessage = 'HTTP_ERROR';
    const error = new Error(errorMessage);
    const result = service.handleError(error);
    result.subscribe(
      () => fail('Expected an error'),
      (err) => {
        expect(err.message).toBe(errorMessage);
        expect(err.type).toBe(ErrorTypes.HTTP_ERROR);
        done();
      }
    );
  });
  it('should parse query params correctly', () => {
    const params = { param1: 'value1', param2: 'value2' };
    const queryParams = service.parseQueryParams(params);
    expect(queryParams.get('param1')).toBe('value1');
    expect(queryParams.get('param2')).toBe('value2');
  });
});
