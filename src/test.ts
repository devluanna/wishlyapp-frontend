// test.ts - Arquivo simplificado
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

beforeAll(() => {
  // Inicializa o ambiente de testes do Angular
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
  );
});

// Carrega todos os testes automaticamente
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().map(context);
