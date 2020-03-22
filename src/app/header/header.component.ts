import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  login:String;
  password:String;


  async resetar(){

    let resetar = await axios.post('http://191.186.131.226:7000/sorteador/resetar',
                                      {login:this.login,password:this.password}).catch(e =>{
                                        alert("Login ou senha incorretos");
                                      });

    this.password = '';

  }
}
