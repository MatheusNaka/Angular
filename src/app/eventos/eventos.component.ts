import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  FiltroLista!: string;
  get filtroLista(): string {
    return this.FiltroLista;
  }
  set filtroLista(value: string) {
    this.FiltroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  FiltroListaLocal!: string;
  get filtroListaLocal(): string {
    return this.FiltroListaLocal;
  }
  set filtroListaLocal(value: string) {
    this.FiltroListaLocal = value;
    this.eventosFiltradosLocal = this.filtroListaLocal ? this.filtrarLugares(this.filtroListaLocal) : this.eventos;
  }

  eventosFiltrados: any = [];
  eventosFiltradosLocal: any = [];
  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  filtrarLugares(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { local: string; }) => evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  // tslint:disable-next-line:typedef
  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  // tslint:disable-next-line:typedef
  getEventos() {
    this.http.get('http://localhost:5000/api/Values').subscribe(response => {
      this.eventos = response;
      // console.log(response);
      console.log(this.eventos);
    }, error => {
      console.log(error);
    });
  }
}
