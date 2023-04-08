import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Route } from '@angular/router';
import { Caracteristics } from '../../models/Personajes';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetallePage implements OnInit {

  personaje: any;
  resultEdad: string = '';
  resultAltura: string = '';
  resultPeso: string = '';
  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const serializedPersonaje = params['personaje'];
      this.personaje = JSON.parse(serializedPersonaje);
      console.log(this.personaje);
    });
    this.obtenerEdadActual();
    this.obtenerAlturaActual();
    this.obtenerPesoActual();
  }

  obtenerEdadActual() {
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - parseInt(this.personaje.caracteristics.birth);
    this.resultEdad = edad + ' anos';
  }

  obtenerAlturaActual() {
    const value = this.personaje.caracteristics.height.value;
    this.resultAltura = value + 'm';
  }

  obtenerPesoActual() {
    const value = this.personaje.caracteristics.weight.value;
    const unit = this.personaje.caracteristics.weight.unity;
    this.resultPeso = value + unit;
  }


}
