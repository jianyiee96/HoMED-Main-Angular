import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Serviceman } from 'src/app/classes/serviceman/serviceman';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
	
  	setToken(token: string){
		sessionStorage.token = token
  	}

  	getToken(): string {
		return sessionStorage.token;
	 }
	 
	getSecuredHttpOptions() {
		return {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Id': this.getCurrentServiceman().servicemanId.toString(),
					'Token': sessionStorage.token
				}
			)
		}
	}
	

  	getIsLogin(): boolean {
		if (sessionStorage.isLogin == "true") {
			return true
		}
		else {
			return false
		}
	}

	setIsLogin(isLogin: boolean): void {
		sessionStorage.isLogin = isLogin
	}

	getCurrentServiceman(): Serviceman {
		return JSON.parse(sessionStorage.currentServiceman)
	}


	setCurrentServiceman(currentServiceman: Serviceman): void {
		sessionStorage.currentServiceman = JSON.stringify(currentServiceman)
	}

	getEmail(): string {
		return sessionStorage.email
	}

	setEmail(email: string): void {
		sessionStorage.email = email
	}

	getPassword(): string {
		return sessionStorage.password
	}

	setPassword(password: string): void {
		sessionStorage.password = password
  	}

  
}
