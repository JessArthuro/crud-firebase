import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroModel[] = [];
  loading = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
      this.loading = false;
    });
  }

  borrarHeroe(heroe: HeroModel, i: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas seguro que deseas borrar a ${heroe.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Eliminado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
