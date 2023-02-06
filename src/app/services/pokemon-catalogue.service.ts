import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from "src/environments/environment";
import { storageKeys } from '../enum/storage-keys.enum';
import { Result, Pokemon } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.Utils';

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
    const storedPokemon = StorageUtil.storageRead<Pokemon[]>(storageKeys.Pokemons) || []

    if (storedPokemon?.length > 0) {
      this._pokemon = storedPokemon
      this._loading = false;
      return
    }
    this.http.get<Result>(apiPokemon)
      .pipe(
        map((result: Result) => {
          return result.results
        })
      )
      .subscribe({
        next: (pokemonResults: Pokemon[]) => {
          this._pokemon = pokemonResults.map((pokemon, index) => ({
            ...pokemon,
            url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
          }));
          StorageUtil.storageSave<Pokemon[]>(storageKeys.Pokemons, this._pokemon);
          this._loading = false;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public pokemonByName(name: string): Pokemon | undefined {
    return this._pokemon.find((pokemon: Pokemon) => pokemon.name == name)
  }

}