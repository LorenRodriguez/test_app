import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotifierService } from 'angular-notifier';
import { LoginService } from 'src/app/services/login.service';
import { TranslateService } from '@ngx-translate/core';

import { UsuarioModel } from 'src/app/models/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.minLength(5), Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private translateService: TranslateService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {}

  login() {
    if (!this.formulario.valid) {
      this.mostrarErrores();
      return;
    }

    const usuario: UsuarioModel = {
      email: this.formulario.get('email')?.value,
      password: this.formulario.get('password')?.value,
    };
    this.loginService
      .iniciarSesion(usuario)
      .subscribe((resp) =>
        this.notifierService.notify(
          'success',
          this.translateService.instant('login.sesion-iniciada')
        )
      );
  }

  /** buscamos los errores de los campos de manera dinamica e informamos de ellos
   * el error del formato mail nos interesa al lado del input por lo que no se informa por notificacion
   * */
  mostrarErrores() {
    Object.keys(this.formulario.controls).forEach((key) => {
      const control = this.formulario.get(key);
      console.log(control);
      if (control?.errors) {
        if (control.errors['required']) {
          const mensaje = this.translateService.instant(
            'validacion.campo-requerido',
            { campo: key }
          );
          this.notifierService.notify('error', mensaje);
        }
        if (control.errors['minlength']) {
          const mensaje = this.translateService.instant(
            'validacion.min-caracteres',
            { campo: key, numCarac: control.errors['minlength'].requiredLength }
          );
          this.notifierService.notify('error', mensaje);
        }
      }
    });
  }
}
