import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptNgZone,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
} from '@nativescript/angular';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import './masonkit';
import { DOCUMENT } from '@angular/common';

/**
 * Disable zone by setting this to true
 * Then also adjust polyfills.ts (see note there)
 */
const EXPERIMENTAL_ZONELESS = false;

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        { provide: DOCUMENT, useValue: {} },
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        EXPERIMENTAL_ZONELESS
          ? provideExperimentalZonelessChangeDetection()
          : provideNativeScriptNgZone(),
      ],
    });
  },
});
