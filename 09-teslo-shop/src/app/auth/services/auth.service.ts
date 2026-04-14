import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse, User, UserRegister } from '@auth/interface/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

type AuthStatus = 'checking' | 'authenticated' |'not-authenticated'
const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => this.checkAuthStatus()
  });

  authStatus = computed<AuthStatus>(() => {
    if( this._authStatus() === 'checking') return this._authStatus();

    if( this._user() ) return 'authenticated';

    return 'not-authenticated';
  });

  user = computed<User| null>(() => this._user());
  token = computed<string | null>(() => this._token());
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  login(email:string, password: string): Observable<boolean>{
    return this.http.post<AuthResponse>(`${ baseUrl}/auth/login`, {
      email, password
    }).pipe(
      map( (response) => this.handleAuthSuccess(response) ),
      catchError( (error)=>  this.handleAuthError(error) )
    )
  }   

  checkAuthStatus():Observable<boolean>{
    
    const token = localStorage.getItem('token');
    if(!token) {
      this.logout();
      return of(false);
    }

    return this.http
      .get<AuthResponse>( `${baseUrl}/auth/check-status`,{
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      })
      .pipe(
        map( (response) => this.handleAuthSuccess(response) ),
        catchError( (error)=>  this.handleAuthError(error) )
      )
  }

  register(newUser: UserRegister):Observable<boolean>{
    const url = `${baseUrl}/auth/register`;
    console.log({url})
    return this.http
      .post<AuthResponse>(url, {
        body: newUser
      })
      .pipe(
        map( response => this.handleAuthSuccess(response)),
        catchError( response => of(false))
      );
  }

  logout():void {
    this._user.set(null);
    this._token.set(null);
    
    this._authStatus.set('not-authenticated')
    localStorage.removeItem('token');
    
  }

  private handleAuthSuccess( { user, token }:AuthResponse ):boolean{
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set('authenticated')
    console.log(user, user.roles.includes('admin'));
    localStorage.setItem('token', token);
    return true;
  } 

  private handleAuthError( error: any ): Observable<false>{
    this.logout();
    return of(false);
  }

}
