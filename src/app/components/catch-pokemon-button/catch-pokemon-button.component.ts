import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchPokemonService } from 'src/app/services/catch-pokemon.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent implements OnInit {

  public loading: boolean = false;
  public isCaughtPokemon: boolean = false;
  public showTrainerButton: boolean = false;
  @Input() pokemonName: string = "";

  constructor(
    private readonly catchPokemonService: CatchPokemonService,
    private readonly trainerService: TrainerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isCaughtPokemon = this.trainerService.inCollection(this.pokemonName);
    // shown button dependend on page
    const currentPage = this.router.url;

    if (currentPage === '/trainer') {
      this.showTrainerButton = true;
    } else {
      this.showTrainerButton = false;
    }
  }

  onCatch(): void {
    this.loading = true;
    // add to trainer
    this.catchPokemonService.addToCollection(this.pokemonName)
      .subscribe({
        next: (trainer: Trainer) => {
          
          this.isCaughtPokemon = this.trainerService.inCollection(this.pokemonName)
          this.loading = true;
          window.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          console.log('Error: ', error.message);
        }
      })
      
  }
}
