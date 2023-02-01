import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from "src/environments/environment";
import { storageKeys } from '../enum/storage-keys.enum';
import { Result, Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.Utils';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemonResults: Result[] = [];
  private _error: string = "";
  private _loading: boolean = false;


  get pokemonResults(): Result[] {
    return this._pokemonResults;
  }

  set pokemonResults(pokemonResults: Result[]) {
    StorageUtil.storageSave<Result[]>(storageKeys.Pokemons, pokemonResults)
    this._pokemonResults = pokemonResults;
  }

  get error(): string {
    return this._error
  }

  get loading(): boolean {
    return this._loading
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(): void {
    this._loading = true;
    this.http.get<Result[]>(apiPokemon)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
      .subscribe({
        next: (pokemonResults: Result[]) => {
          this._pokemonResults = pokemonResults;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}
