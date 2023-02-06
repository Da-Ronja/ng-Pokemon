import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }
  
  constructor(
    private readonly trainerService: TrainerService,
    private router: Router
  ) {}

  logout(): void {
    this.trainerService.trainer = undefined;
    sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
