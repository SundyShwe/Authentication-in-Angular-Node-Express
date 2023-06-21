import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { addTokenInterceptor } from './auth/add-token.interceptor';
import { authGuard } from './auth/auth.guard';

const boostrap = function(authService : AuthService){
  return()=>{
    const state = localStorage.getItem('APP_STATE');
    if(state){
      authService.state.set(JSON.parse(state));
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path : '',component : WelcomeComponent, title: 'Welcome to My App', canActivate: [authGuard]},
      {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
      {path : '**', redirectTo : ''}
    ])
  ],
  providers: [provideHttpClient(withInterceptors([addTokenInterceptor])),
    {provide: APP_INITIALIZER,
      multi: true,
      useFactory: boostrap,
      deps: [AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
