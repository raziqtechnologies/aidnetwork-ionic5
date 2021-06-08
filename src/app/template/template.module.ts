import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TemplatePage } from './template.page';
import { DynamicFormModule } from '../dynamicform/dynamic-form.module';

const routes: Routes = [
  {
    path: '',
    component: TemplatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicFormModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TemplatePage]
})
export class TemplatePageModule {}
