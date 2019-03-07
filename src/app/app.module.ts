import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import * as components from '@/components';
import { getClassesOfAnnotations } from '@/helpers';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';

import { CKEditorModule } from 'ng2-ckeditor';

registerLocaleData(en);

@NgModule({
  declarations: [
    ...getClassesOfAnnotations<Component>(components, 'Component').map(({ clazz }) => clazz),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CKEditorModule,
  ],
  entryComponents: [
    components.LoginRegisterModalComponent,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [components.AppComponent],
})
export class AppModule { }
