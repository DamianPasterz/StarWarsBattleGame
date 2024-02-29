import { HttpErrorResponse } from '@angular/common/http';
import { emptyProps, props } from '@ngrx/store';

export const baseEvents = {
  Request: emptyProps(),
  Success: emptyProps(),
  Failure: props<{ error: HttpErrorResponse }>(),
};
