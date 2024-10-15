import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";

export const appConfig : ApplicationConfig = {
  providers : [
    provideZoneChangeDetection({ eventCoalescing : true }),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideRouter(routes),
    { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true },
  ]
};
