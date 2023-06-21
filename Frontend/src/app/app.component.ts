import { Component, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Initial_State } from './Types/types';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <header class="bg-info text-white p-3 mb-3">
      <nav class="navbar">
        <div *ngIf="authService.state().jwt ; else Login">
        <a [routerLink]="['']" class="mr-3">Home</a>
        <button (click)="signOut()">Sign Out</button>
        </div>
      </nav>
    </header>
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
     <router-outlet/>
    </div>
    <footer class="bg-info text-white fixed-bottom text-center p-3 mt-3">This is Footer</footer>
    <ng-template #Login>
    <div>
          <a [routerLink]="['auth','signin']">Sign In </a>
          <a [routerLink]="['auth','signup']">Sign Up</a>
        </div>
    </ng-template>
  `,
  styles: ['nav a {margin-right:15px;}']
})
export class AppComponent {
  title = 'My App';
  authService = inject(AuthService);
  private router = inject(Router)

  signOut(){
      //clear states
      localStorage.clear();
      this.authService.state.set(Initial_State);
      this.router.navigate(['','auth','signin']);
  }

}
