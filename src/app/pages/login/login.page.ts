import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage{
  
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService
    ) {}

  handleLogin(): void {
    this.router.navigateByUrl("/catalogue");
  }

  get loading(): boolean {
    return this.loginService.loading;
  }
}
