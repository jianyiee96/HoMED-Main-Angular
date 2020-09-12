import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  displayModal: boolean;

  showModalDialog() {
    this.displayModal = true;
  }

  clearUsername(username: HTMLInputElement){
    username.value = '';
  }

  clearPassword(password: HTMLInputElement){
    password.value = '';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
