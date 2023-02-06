import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(
    private readonly trainerService: TrainerService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }
  logout(): void {
    this.trainerService.trainer = undefined;
    sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
