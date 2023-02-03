import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root'
})
export class CatchPokemonService {

  constructor(
    private readonly http: HttpClient,
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly trainerService: TrainerService
  ) { }

  // get by pokemon name

  public addToCollection(name: string): Observable<Trainer> {
    if (!this.trainerService.trainer) {
      throw new Error("addToCollection: There is no trainer");
    }

    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: Pokemon | undefined = this.pokemonCatalogueService.pokemonByName(name);

    if (!pokemon) {
      throw new Error("addToCollection: No pokemon with name: " + name);
    }

    if (this.trainerService.inCollection(name)) {
      this.trainerService.removeFromCollection(name);
    } else {
      this.trainerService.addCaughtPokemon(pokemon);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    })

    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      })
    )
  }
}