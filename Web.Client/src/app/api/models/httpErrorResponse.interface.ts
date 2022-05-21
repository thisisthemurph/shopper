import { HttpErrorResponse } from '@angular/common/http';

export interface InnerHttpErrorResponse {
  title: string;
  status: number;
  traceId: string;
  errors: {
    [key: string]: string[];
  };
}

export interface StandardHttpErrorResponse extends HttpErrorResponse {
  error: string | InnerHttpErrorResponse;
}
