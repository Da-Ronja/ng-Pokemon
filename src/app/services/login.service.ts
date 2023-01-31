import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Dependency Injection
  constructor(private readonly http: HttpClient) { }

  // Login
    public login(username: string): Observable<User>{
      return this.checkUsername(username)
        .pipe(
          switchMap((user: User | undefined)=>{
            if(user === undefined){
              return this.createUser(username);
            }
           return of(user);
          }),
          tap((user: User)=>{
            StorageUtil.storageSave<User>(storageKeys.User, user);
          })
        )
    }
  // Check if user exists
    private checkUsername(username: string):Observable<User | undefined>{
      return this.http.get<User[]>(`${apiUsers}?username=${username}`)
      .pipe(
        map((response:User[])=>response.pop())
      )
    }
  // If not user - create a User
  private createUser(username: string):Observable<User>{
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
    return this.http.post<User>(apiUsers, user, {
      headers
    })
  }

  // If User || Created User -> store User
}
