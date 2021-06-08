import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditUserPage } from './edit-user.page';

import { MatSelectModule, MatCheckboxModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: EditUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditUserPage]
})
export class EditUserPageModule {}
