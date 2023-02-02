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
  private _pokemon: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  constructor(private readonly http: HttpClient) { 
    this._pokemonResults = StorageUtil.storageRead<Result[]>(storageKeys.Pokemons) || [];
  }

  get pokemonResults(): Result[] {
    return this._pokemonResults;
  }
  get pokemons(): Pokemon[] {
    return this._pokemon;
  }

  set pokemonResults(pokemonResults: Result[]) {
    StorageUtil.storageSave<Result[]>(storageKeys.Pokemons, pokemonResults)
    this._pokemonResults = pokemonResults;
  }
  // set pokemons(pokemons: Pokemon[]) {
  //   StorageUtil.storageSave<Pokemon[]>(storageKeys.Pokemons, pokemons)
  //   this.pokemons = pokemons;
  // }


  get error(): string {
    return this._error
  }

  get loading(): boolean {
    return this._loading
  }

  // constructor(private readonly http: HttpClient) { }

  public findAllPokemons(): void {
    if (this._pokemonResults.length) {
            return;
          }
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
          // this._pokemon = pokemonResults.results;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}



// export class PokemonCatalogueService {

//   // private _pokemonResults: Result[] = [];
//   private _pokemonResults: Pokemon[] = [];
//   private _error: string = "";
//   private _loading: boolean = false;

//   constructor(private readonly http: HttpClient) { 
//     this._pokemonResults = StorageUtil.storageRead<Pokemon[]>(storageKeys.Pokemons) || [];
//   }

//   get pokemonResults(): Pokemon[] {
//     return this._pokemonResults;
//   }

//   set pokemonResults(pokemonResults: Pokemon[]) {
//     StorageUtil.storageSave<Pokemon[]>(storageKeys.Pokemons, pokemonResults)
//     this._pokemonResults = pokemonResults;
//   }

//   get error(): string {
//     return this._error
//   }

//   get loading(): boolean {
//     return this._loading
//   }

//   // constructor(private readonly http: HttpClient) { }

//   public findAllPokemons(): void {
//     if (this._pokemonResults.length) {
//       return;
//     }
//     this._loading = true;
//     this.http.get<Result[]>(apiPokemon)
//     .pipe(
//       finalize(() => {
//         this._loading = false;
//       })
//     )
//       .subscribe({
//         next: (pokemonResults: Result[]) => {
//           this._pokemonResults = pokemonResults.map(result => result.results);
//         },
//         error: (error: HttpErrorResponse) => {
//           this._error = error.message;
//         }
//       })
//   }
// }