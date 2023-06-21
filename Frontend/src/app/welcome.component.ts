import { Component, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-welcome',
  template: `
    <p>
      welcome {{state.fullname}}
    </p>
  `,
  styles: [
  ]
})
export class WelcomeComponent {
   state = inject(AuthService).state();

}
