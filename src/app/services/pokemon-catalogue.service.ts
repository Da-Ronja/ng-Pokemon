import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from "src/environments/environment";
import { Result, Pokemon } from '../models/pokemon.model';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  constructor(private readonly http: HttpClient) {
  }
  
  get pokemons(): Pokemon[] {
    return this._pokemon;
  }

  get error(): string {
    return this._error
  }

  get loading(): boolean {
    return this._loading
  }

  public findAllPokemons(): void {
    this._loading = true
    this.http.get<Result>(apiPokemon)
      .pipe(
        map((result: Result) => {
          return result.results
        }),
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemonResults: Pokemon[]) => {
          this._pokemon = pokemonResults.map((pokemon, index) => ({
            ...pokemon,
            url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
          }))
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}