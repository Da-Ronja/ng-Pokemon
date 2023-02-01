import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const {apiTrainers} = environment;
const{apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Dependency Injection
  constructor(private readonly http: HttpClient) { }

  // Login
    public login(username: string): Observable<Trainer>{
      return this.checkUsername(username)
        .pipe(
          switchMap((user: Trainer | undefined)=>{
            if(user === undefined){
              return this.createUser(username);
            }
           return of(user);
          }),
          tap((user: Trainer)=>{
            StorageUtil.storageSave<Trainer>(storageKeys.User, user);
          })
        )
    }
  // Check if user exists
    private checkUsername(username: string):Observable<Trainer | undefined>{
      return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(
        map((response:Trainer[])=>response.pop())
      )
    }
  // If not user - create a User
  private createUser(username: string):Observable<Trainer>{
    // user
    const user = {
      username,
      favourites: []
    };
    //headers -> API key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });
    // Post - Create items on the Server
    return this.http.post<Trainer>(apiTrainers, user, {
      headers
    })
  }

  // If User || Created User -> store User
}
