import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/hero.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  hero = new HeroModel();

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.heroesService.getHeroe(id).subscribe((resp: HeroModel) => {
        this.hero = resp;
        this.hero.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    }
    // console.log(form);
    // console.log(this.hero);

    Swal.fire({
      title: 'Espera',
      text: 'Guardando informacion...',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.hero.id) {
      this.heroesService.actualizarHeroe(this.hero).subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Heroe actualizado exitosamente',
          showConfirmButton: false,
          timer: 1800,
        });
        // console.log(resp);
      });
    } else {
      this.heroesService.crearHeroe(this.hero).subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Heroe agregado exitosamente',
          showConfirmButton: false,
          timer: 1800,
        });
        // console.log(resp);
      });
    }
  }
}
