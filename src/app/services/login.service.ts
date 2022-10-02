import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { UsuarioModel } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  /** LLAMARIAMOS AL METODO API CORRESPONDIENTE PARA EL INICIO DE SESIÓN
   * HACEMOS UNA SIMULACIÓN CON UN OBSERVABLE
   */
  iniciarSesion(usuario: UsuarioModel) {
    return of(usuario.email);
  }
}
