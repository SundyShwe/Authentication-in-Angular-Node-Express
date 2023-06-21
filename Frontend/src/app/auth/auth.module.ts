import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SingupComponent } from './singup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SigninComponent,
    SingupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'signin', component: SigninComponent, title:"Sign In"},
      {path: 'signup', component: SingupComponent, title:"Register"},
    ])
  ]
})
export class AuthModule { }
