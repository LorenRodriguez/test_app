import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { UsuarioModel } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor( private translateService: TranslateService ) {}

  /** LLAMARIAMOS AL METODO API CORRESPONDIENTE PARA EL INICIO DE SESIÓN
   * HACEMOS UNA SIMULACIÓN CON UN OBSERVABLE
   */
  iniciarSesion(usuario: UsuarioModel) {
    return of(usuario.email);
  }

  changeLang( lang:string ) {
    this.translateService.use( lang );
    localStorage.setItem( 'language', lang );
  }
}
