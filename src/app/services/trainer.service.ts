import { Injectable } from '@angular/core';
import { storageKeys } from '../enum/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil} from '../utils/storage.Utils';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  // keep track of login trainer
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  get pokemonCollection(): Pokemon[] | undefined {
    return this._trainer?.pokemon;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(storageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() { 
    this._trainer = StorageUtil.storageRead<Trainer>(storageKeys.Trainer);

  }

  public inCollection(name: string) {
    if (this._trainer) {
      return Boolean(this._trainer?.pokemon.find((pokemon: Pokemon) => pokemon.name === name))
    }
    return false
  }
}
