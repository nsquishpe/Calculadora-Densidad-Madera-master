import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  datos = {
    alto1: '',
    alto2: '',
    largo: '',
    ancho: '',
    peso: '',
    densidad:''
  };

  constructor(private alertController: AlertController) {}
  
  @ViewChild('myForm', { static: false })
  myForm!: NgForm;
  limpiarFormulario() {
    this.datos.ancho='';
    this.datos.peso='';
    this.datos.densidad='';
  }
  limpiarTodo() {
    this.myForm.reset();
    this.datos.densidad='';
  }
  CalcularDensidad(){
    // Convertir pulgadas a metros
    const alto_m = ((parseFloat(this.datos.alto1)+parseFloat(this.datos.alto2)) * 0.0254);
    console.log(alto_m)
    const largo_m = (parseFloat(this.datos.largo)+0.75) * 0.0254; //sumamos la constante del largo (3/4)
    console.log(largo_m)
    //Convertir milimetros a metros
    const ancho_m = ((parseFloat(this.datos.ancho))/1000)
    console.log(ancho_m)
    //Calculo volumen (m^3)
    const volumen = ((alto_m) * (largo_m) * (ancho_m));
    console.log(volumen)
    //Calculo densidad (kg/m^3)
    const pesog = (parseFloat(this.datos.peso)/1000);
    console.log(pesog)
    const densidadtot = (pesog/volumen);
    console.log(densidadtot)
    this.datos.densidad =  densidadtot.toFixed(3)+ ' kg/m^3';
  }
  async submitForm() {
    if (!this.datos.alto1 || !this.datos.alto2 || !this.datos.largo || !this.datos.ancho || !this.datos.peso) {
      const alert = await this.alertController.create({
        message: 'Por favor, complete los campos requeridos.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }
    else{
      //Calculo Densidad
      this.CalcularDensidad();
    }
  }
}

