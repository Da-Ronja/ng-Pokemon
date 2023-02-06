import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit{
  
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly trainerService: TrainerService
    ) {}
  ngOnInit(): void {
    if(this.trainerService.trainer)
    {
      this.router.navigateByUrl("/catalogue");
    }
  }

  handleLogin(): void {
    this.router.navigateByUrl("/catalogue");
  }

  get loading(): boolean {
    return this.loginService.loading;
  }
}
