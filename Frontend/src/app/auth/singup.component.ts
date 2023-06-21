import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { IUser } from '../Types/types';

@Component({
  selector: 'app-singup',
  template: `
    <div class="container">
        <form [formGroup]="myForm">
            <input type="text" placeholder="FullName" formControlName="fullname"/> 
            <input type="text" placeholder="Email" formControlName="email"/> 
            <input type="password" placeholder="Password" formControlName="password"/>
            <button (click)="onClick()">Submit</button>
        </form>
    </div>
  `,
  styles: [
  ]
})
export class SingupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private subscription !: Subscription;

    myForm = inject(FormBuilder).nonNullable.group({
      fullname : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
    })
    get fullname(){return this.myForm.get('fullname') as FormControl}
    get email(){return this.myForm.get('email') as FormControl}
    get password(){return this.myForm.get('password') as FormControl}

    ngOnDestroy(){
      if(this.subscription) this.subscription.unsubscribe();
    }
    onClick(){
      const data = this.myForm.value as IUser;
      this.subscription = this.authService.signUp(data).subscribe(resp=>{
        if(resp.success){
            //navigate to sign in page
            this.router.navigate(['','auth','signin']);
        }
        else{
          console.log("Error Registration : "+ resp.data);
        }
      })

    }    

}
