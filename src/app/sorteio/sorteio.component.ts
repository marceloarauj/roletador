import { Component, OnInit, ViewChild} from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SorteioService } from './sorteio.service';

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

  participantes:Participantes[] = [
    {Nick: '_Hiruzen_',Classe: 10,Pontuacao: 400,IP:'192.168.1.24'},
    {Nick: '\'Kaisen',Classe:8,Pontuacao:500,IP:'192.168.1.25'},
    {Nick: 'MixRT',Classe:7,Pontuacao:752,IP:'192.168.1.92'},
    {Nick: 'BL3ND',Classe:12,Pontuacao:622,IP:'192.168.1.35'},
  ]
  
  dataColumns:string[]=['Nick','Classe','Pontuacao','IP']
  dataSource = new MatTableDataSource(this.participantes)

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.sorteioServ.connect();
    this.sort.sort({id:'Pontuacao',start:'desc',disableClear:false});
    this.dataSource.sort = this.sort;
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
    //let send = this.sorteioServ.enviarSorteio({nick:this.nick,classe:this.getSelectedClass});
    this.sorteioServ.enviarSorteio({nick:this.nick,classe:this.getSelectedClass()})
    this.nick = "";

    //send.then(e =>{
    //  alert(e);
    //})
  }

  refreshTable(){ // só dar um push na lista de participantes e chamar esse método
    this.dataSource = new MatTableDataSource(this.participantes);
    this.dataSource.sort = this.sort; 
  }
  refreshParticipants(){

    let participants = this.sorteioServ.obterParticipantes();
    let tempParticipants:Participantes[];

    participants.then(e =>{
    });
  }
}

export interface Participantes{
  Nick:string,
  Classe:number,
  Pontuacao:number,
  IP:string
}
