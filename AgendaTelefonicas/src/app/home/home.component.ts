import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {CrudService} from '../service/crud.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: string;
  nombre: string;
  telefono: string;
  fechaNacimiento: string;
  correo: string;

  constructor(public crudservice:CrudService){}

  CreateRecord()
  {
    let Record = {};
    Record['id'] = this.id;
    Record['nombre'] = this.nombre;
    Record['telefono'] = this.telefono;
    Record['fechaNacimiento'] = this.fechaNacimiento;
    Record['correo'] = this.correo;

    
  this.crudservice.create(Record).then(res => {
    this.id = "";
    this.nombre = "";
    this.telefono = "";
    this.fechaNacimiento = "";
    this.correo = "";
    console.log(res);
  }).catch(error =>{
    console.log(error);
  });
  }


  /*registerForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    telefono: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    correo: new FormControl(''),
  });*/

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  

  ngOnInit(): void {
  }

  /*onRegister(){
    console.log('Form', this.registerForm.value);
  }*/

}
