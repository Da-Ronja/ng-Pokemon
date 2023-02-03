import { HttpErrorResponse } from '@angular/common/http';
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

  // public loading: boolean = false;
  public isCaughtPokemon: boolean = false;
  @Input() pokemonName: string = "";


  get loading(): boolean {
    return this.catchPokemonService.loading;
  }

  constructor(
    private readonly catchPokemonService: CatchPokemonService,
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.isCaughtPokemon = this.trainerService.inCollection(this.pokemonName);
   }

  onCatch(): void {
    // add to trainer
    this.catchPokemonService.addToCollection(this.pokemonName)
      .subscribe({
        next: (trainer: Trainer) => {
          this.isCaughtPokemon = this.trainerService.inCollection(this.pokemonName)
        },
        error: (error: HttpErrorResponse) => {
          console.log('Error: ', error.message);
        }

      })



    // alert("You catch " + this.pokemonName + " pokemon!")
  }

}
