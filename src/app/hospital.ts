import { Time } from "@angular/common";
import { SubscriptSizing } from "@angular/material/form-field";

export class room {
    constructor(){}
    roomNum? : number;
    roomBedCount? : number;
    nurseNum? : number;
    depNum?:number;
}

export class patient{
    constructor(){}
    cinPatient?:string;
    first_namep?:string;
    last_namep?:string;
    statep?:string;
    notep?:string;
    relativep?:string;
    sexp?:string;
    naissancep?:Date;
    contact?:number;
    bedNum?:number;
    passwordrelative?:string;
    historyp?:Date[][];
}

export class bed{
    constructor(){}
    bedNum?:number;
    bedEmpty?:boolean;
    roomNum?:number;
}

export class nurses{
    constructor(){}
    nurseNum?:number;
    first_nameN?:string;
    last_nameN?:string;
    NshiftS?:string;
    NshiftE?:string;
    numDoc?:number;
}

export class doctor{
    constructor(){}
    numDoc?:number;
    first_nameD?:string;
    last_nameD?:string;
    DshiftS?:string;
    DshiftE?:string;
    specD?:string;
    contactD?:string;
    depNum?:number;
    passwordD?:string;

}

export class department{
    constructor(){}
    depNum?:number;
    roomCount?:number;
    depName?:string;
}
