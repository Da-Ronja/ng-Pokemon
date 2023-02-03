import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';
import { TrainerService } from 'src/app/services/trainer.service';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();
  @Input() loading: boolean = false;

 constructor( 
  private readonly loginService: LoginService,
  private readonly trainerServicee: TrainerService
  ) {}

 public loginSubmit(loginForm: NgForm): void {
  // username!
  const {username} = loginForm.value;
 
  this.loginService.login(username)
  .subscribe({
    next: (trainer: Trainer) => {
      this.trainerServicee.trainer = trainer;
      this.login.emit();
    },
    error: () => {

    }
  })
 }
}


