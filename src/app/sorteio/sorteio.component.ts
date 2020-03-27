import { Component, OnInit, ViewChild} from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SorteioService } from './sorteio.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sorteio',
  templateUrl: './sorteio.component.html',
  styleUrls: ['./sorteio.component.css']
})
export class SorteioComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private sorteioServ:SorteioService) 
              {this.RegistrarIcones(); }

  RegistrarIcones(){
    this.matIconRegistry.addSvgIcon
      ('roletar',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/numbers-blocks.svg'));
  }

  classes = [
    {id:1, nome:'Arqueiro',path_icon:'../assets/ea.ico'},
    {id:2, nome:'Sacerdote',path_icon:'../assets/ep.ico'},
    {id:3, nome:'Espiritualista',path_icon:'../assets/esp.ico'},
    {id:4, nome:'Mercenário',path_icon:'../assets/mc.ico'},
    {id:5, nome:'Mago',path_icon:'../assets/mg.ico'},
    {id:6, nome:'Místico',path_icon:'../assets/mist.ico'},
    {id:7, nome:'Retalhador',path_icon:'../assets/rt.ico'},
    {id:8, nome:'Arcano',path_icon:'../assets/sk.ico'},
    {id:9, nome:'Tormentador',path_icon:'../assets/tm.ico'},
    {id:10, nome:'Bárbaro',path_icon:'../assets/wb.ico'},
    {id:11, nome:'Feiticeira',path_icon:'../assets/wf.ico'},
    {id:12, nome:'Guerreiro',path_icon:'../assets/wr.ico'}
  ]
  selectedClass:number;
  setSelectedClass(id){this.selectedClass = id}
  getSelectedClass(){return this.selectedClass}

  nick:string;

  participantes:Participantes[] = []
  
  dataColumns:string[]=['Nick','Classe','Pontuacao','IP']
  dataSource = new MatTableDataSource(this.participantes)


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.releaseDB();
    this.preCarregar();
    this.sorteioServ.connect();
    this.sort.sort({id:'Pontuacao',start:'desc',disableClear:false});
    this.dataSource.sort = this.sort;
    
    this.sorteioServ.getComportamento().subscribe(data =>{
      if(data == '')
        return; 

      this.refreshTable(data,true);
    });
  }
  async releaseDB(){
    this.sorteioServ.releaseDB();
  }
  async preCarregar(){
    let participantes = await this.sorteioServ.obterParticipantes();
    
    this.refreshTable(participantes,false);
  }
  obterClasseIcon(classe):string{

    return this.classes.find(x => x.id === classe).path_icon;
  }

  roletar(){
    if(this.getSelectedClass() == undefined || this.getSelectedClass() == null){
      alert("Selecione a classe"); 
      return;
    }
    if(this.nick == "" ||this.nick == undefined ||this.nick.length < 4){
      alert("informe o nick corretamente");
      return;
    }
    this.sorteioServ.enviarSorteio({nick:this.nick,classe:this.getSelectedClass()})
    this.nick = "";

  }
  

  refreshTable(participan,reloaded){ 

    this.refreshParticipants(participan,reloaded);

    this.dataSource = new MatTableDataSource(this.participantes);
    this.dataSource.sort = this.sort; 
  }
  refreshParticipants(participan,reload){

    let tempParticipantes:Participantes[] = [];
    let arrayPart = participan;
   
    if(reload)
     arrayPart= JSON.parse(participan);

     Array.prototype.forEach.call(arrayPart,element =>{
      let participante:Participantes = {
        Nick:element.nick,
        IP:element.ip,
        Pontuacao: element.pontuacao,
        Classe: element.classe
       }
       tempParticipantes.push(participante);
     });
    this.participantes = tempParticipantes;
  }
}

export interface Participantes{
  Nick:string,
  Classe:number,
  Pontuacao:number,
  IP:string
}
