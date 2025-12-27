import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';


interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-page.component.html',
  // imports: [NgClass]
})
export class DragonballPageComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    {id: 1,name: 'Goku', power: 9001},
    // {id: 2,name: 'Vegeta', power: 9000},
    // {id: 3,name: 'Piccolo', power: 8000},
    // {id: 4,name: 'Yamcha', power: 500},
  ]);

  // powerClases = computed(() => {
  //   return {
  //     'text-danger': true
  //   }
  // });


  addCharacter(){
      this.characters.update( chars => {
        chars.push({
          id: Math.floor(Math.random() * 1000),
          name: this.name(),
          power: this.power()
        })
        this.resetFields()
          return chars;
      } )
  }

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
