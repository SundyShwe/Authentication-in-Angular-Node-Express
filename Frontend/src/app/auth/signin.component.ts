import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { IState, IUser } from '../Types/types';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-signin',
  template: `
    <div class="container">
        <form [formGroup]="myForm">
            <input type="text" placeholder="Email" formControlName="email"/> 
            <input type="password" placeholder="Password" formControlName="password"/>
            <button (click)="onClick()">Submit</button>
        </form>
    </div>
  `,
  styles: [
  ]
})
export class SigninComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private subscription !: Subscription;

    myForm = inject(FormBuilder).nonNullable.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
    })
    get email(){return this.myForm.get('email') as FormControl}
    get password(){return this.myForm.get('password') as FormControl}

    onClick(){
        const data = {email: this.email.value, password:this.password.value};
        this.subscription = this.authService.signIn(data).subscribe(response => {
            if(response.success){
              //decode jwt
              const decoded = jwt_decode(response.data) as IState;
              const new_state = {...decoded, jwt: response.data};
              //set state
              this.authService.state.set(new_state);
              localStorage.setItem('APP_STATE',JSON.stringify(new_state));
              //navigate to welcome page
              this.router.navigate([''])
            }
            else{
              console.log('Error Signing In :'+response.data);
            }
        });
    }
    ngOnDestroy(){
      if(this.subscription) this.subscription.unsubscribe();
    }
}
