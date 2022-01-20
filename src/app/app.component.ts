import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RXJS';

  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === 'Eduardo') {
        setTimeout(() => {
          resolve('Seja bem vindo ' + nome);
        }, 1000);
      } else {
        reject('Ops! voce não é o ' + nome);
      }
    });
  }

  minhaObsevable(nome: string): Observable<string> {
    return new Observable(subscriber => {

      if (nome === 'Eduardo') {
        subscriber.next('ola (Observable) ' + nome);// é um collBack para o 'subscriber' receber esta informação
        subscriber.next('ola de novo (Observable) ' + nome);
        setTimeout(() => {
          subscriber.next('ola de novo novamente (Observable) ' + nome);
        }, 1000);
        subscriber.complete();
      } else {
        subscriber.error('Ops! voce não é o (Observable) ' + nome)
      }

    });
  }

  usuarioObsevable(nome: string, email: string): Observable<Usuario> {
    return new Observable(subscriber => {

      if (nome === 'Admin') {
        let usuario = new Usuario(nome, email)

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);
      } else {
        subscriber.error('Ops! voce não é o (Observable) ' + nome)
      }

    });
  }

  ngOnInit(): void {

    // this.minhaPromise('Eduardo')
    //   .then(result => console.log(result))
    //   .catch(erro => console.log(erro));

    // this.minhaObsevable('Eduardo')
    //   .subscribe(
    //     result => console.log(result),
    //     erro => console.log(erro),
    //     () => console.log('Fim...'));

    const observer = {
      next: valor => console.log('Next: ', valor),
      error: erro => console.log('Erro: ', erro),
      complete: () => console.log('Fim...')
    }

    // const obs = this.minhaObsevable('Eduardo');//esta sera a minha 'Observable'
    // obs.subscribe(observer);

    const obs = this.usuarioObsevable('Admin', 'manomona2@hotmail.com');//esta sera a minha 'Observable'
    const subs = obs.subscribe(observer);

    setTimeout(() => {
      subs.unsubscribe();
      console.log('conexão fechada "unsubscribe()": ' + subs.closed);

    }, 3500);
  }


}

export class Usuario {

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  nome: string;
  email: string
}
