import { Component, OnInit } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import axios from 'axios';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private snack: MatSnackBar,) { }

  ngOnInit() {
  }

  login:String;
  password:String;
  private config: MatSnackBarConfig;

  async resetar(){

    let resetar = await axios.post('https://apisumi.herokuapp.com/sorteador/resetar',
                                      {login:this.login,password:this.password})
                                      .catch(e =>{this.openSnack("Login ou senha incorretos");
                                      }).then(e =>{this.openSnack("Sorteio Reiniciado")});

    this.password = '';

  }
  openSnack(mensagem){
    this.config = new MatSnackBarConfig();
    this.config.duration = 3000;
    
    this.snack.open(mensagem,'Fechar',this.config)
  }
}
