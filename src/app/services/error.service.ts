import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }


  static toMessage(status:number){
    switch(status){
      case 401: return "Votre session est invalide !";
      case 500: return "Erreur serveur !";
      case 404: return "Le resultat n'as pas pu etre trouvé !";
      default : return "Une erreur inconnu est survenue !"
    }
  }
}
