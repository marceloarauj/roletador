import { Injectable } from '@angular/core';
import axios from 'axios';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SorteioService {

  private BASE_URL = 'http://apiforsumidao.herokuapp.com/';
  private comportamento = new BehaviorSubject('');
  constructor() { }

  async enviarSorteio(dados){
    
    let data = await axios.post(this.BASE_URL + "sorteador/participante",
                                {nick:dados.nick,classe: dados.classe});

    if(data.status === 200){
      console.log(data);
      return data.data;
    }else{
      alert("Você já está participando deste sorteio");
    }
    
  }
  async obterParticipantes(){
    let data = await axios.get(this.BASE_URL + "sorteador/obter");

    if(data.status === 200){
      return data.data;
    }
  }

  webSocketAPI:string = "http://191.186.131.226:7000/ws";
  topico:string = "/get/users";
  stompClient:any;
  
  public connect(){
    let ws  = new SockJS(this.webSocketAPI);
    this.stompClient = Stomp.over(ws);
    const _this = this;

    _this.stompClient.connect({},function(frame){
      _this.stompClient.subscribe(_this.topico,function(e){
        
        // on connect event
        _this.MessageReceived(e);
      });
    });
  }

  public MessageReceived(e){
    this.comportamento.next(e.body);
  }

  public getComportamento(){
    return this.comportamento;
  }
}
