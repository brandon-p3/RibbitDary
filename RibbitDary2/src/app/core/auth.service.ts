import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({ 
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated: boolean = false; // Estado de autenticación

    constructor() {}

    // Devuelve un observable que emite el estado de autenticación
    getAuthToken(): Observable<boolean> {
        return of(this.isAuthenticated);
    }

    // Establece el estado de autenticación
    setAuthToken(auth: boolean): void {
        this.isAuthenticated = auth;
    }
}
