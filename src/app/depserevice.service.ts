import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { department, patient, room } from './hospital';
import { combineLatest } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepsereviceService {

  constructor(private http : HttpClient) { }
  baseUrl="http://localhost/hospitall/hosphp/";

  getdeps(){
    return this.http.get<department>(this.baseUrl+'get-dep.php');
  }
  adddep(deps:any){
    return this.http.post(this.baseUrl+'add-dep.php',deps);
  }

  addpatient(patient:any){
    return this.http.post(this.baseUrl+'add-patient.php',patient)
  }

  searchpatient(id:any){
    return this.http.get<patient>(this.baseUrl+'search-patient.php?id='+id)
  }

  getrooms(dep:string){
    return this.http.get<room>(this.baseUrl+'get-room.php?dep='+dep) }

  roomdetails(roomNum:any){
    return this.http.get<any>(this.baseUrl+'room-detail.php?roomNum='+roomNum)
  }

  clearbed(bed:any){
    return this.http.post(this.baseUrl+'clear-bed.php',bed);
  }

  emptybeds(dep:string){
    return this.http.get(this.baseUrl+'empty-beds.php?dep='+dep);
  }

  editpatient(patient:any){
    return this.http.put(this.baseUrl+'edit-patient.php',patient)
  }

  getallpatients(){
    return this.http.get<any>(this.baseUrl+'get-patients.php')
  }

  repatient(patient:any){
    return this.http.post(this.baseUrl+'re-patient.php',patient)
  }

  gethistable(){
    return this.http.get<any>(this.baseUrl+'get-histable.php')
  }

  getchartdata(){
    return this.http.get<any>(this.baseUrl+'get-chartdata.php')
  }

  getemployees(){
    return this.http.get<any>(this.baseUrl+'get-employees.php')
  }

  adddoctor(doctor:any){
    return this.http.post(this.baseUrl+'add-doctor.php',doctor)
  }

  addadmin(admin:any){
    return this.http.post(this.baseUrl+'add-admin.php',admin)
  }

  addnurse(nurse:any){
    return this.http.post(this.baseUrl+'add-nurse.php',nurse)
  }

  editdoctor(doctor:any){
    return this.http.put(this.baseUrl+'edit-doctor.php',doctor)
  }

  editadmin(admin:any){
    return this.http.put(this.baseUrl+'edit-admin.php',admin)
  }

  editnurse(nurse:any){
    return this.http.put(this.baseUrl+'edit-nurse.php',nurse)
  }

  searchemployee(name:any){
    return this.http.get<any>(this.baseUrl+'search-employee.php',{params:name})
  }

  getdocdata(numDoc:any){
    return this.http.get<any>(this.baseUrl+'get-docdata.php?numDoc='+numDoc)
  }

  loginGuest(creds:any){
    return this.http.get<any>(this.baseUrl+'logGuest.php',{params:creds})
  }

  loginDoctor(creds:any){
    return this.http.get<any>(this.baseUrl+'logDoctor.php',{params:creds})
  }

  loginAdmin(creds:any) {
    return this.http.get<any>(this.baseUrl + 'logAdmin.php',{params:creds});
  }
  
}

