import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {CrudService} from '../service/crud.service';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  id: string;
  nombre: string;
  telefono: string;
  fechaNacimiento: number;
  correo: string;

  
  items: Observable<any[]>;
  constructor(public crudservice:CrudService, firestoreConfig:AngularFirestore){
    this.items = firestoreConfig.collection('Agenda').valueChanges();
  }

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
    this.fechaNacimiento = undefined;
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

  displayedColumns: string[] = ['Nombre', 'Telefono', 'Fecha', 'Correo'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  
  ngOnInit(): void {
    }
  ngAfterViewInit()
  {

  }
  /*onRegister(){
    console.log('Form', this.registerForm.value);
  }*/

}
