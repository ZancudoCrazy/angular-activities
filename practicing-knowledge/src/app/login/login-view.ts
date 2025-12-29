import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from './components/login-form';

@Component({
  imports: [LoginFormComponent],
  templateUrl: './login-view.html',
  styleUrls: ['./login-view.css'],
})
export class LoginViewComponent { }
