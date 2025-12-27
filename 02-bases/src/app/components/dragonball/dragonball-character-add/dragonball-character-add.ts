import { Component, computed, output, Output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './dragonball-character-add.html',
})
export class DragonballCharacterAdd {
  name = signal('');
  power = signal(0);

  newCharacter = output<Character>();
  
  addCharacter(){
      // this.characters.update( chars => {
      //   chars.push({
      //     id:5,
      //     name: this.name(),
      //     power: this.power()
      //   })
      //   return chars;
      // })
      const newCharacter = computed<Character>( () => {
        return {
          id: Math.floor(Math.random() * 1000),
          name: this.name(),
          power: this.power()
        }
      })
      
      this.newCharacter.emit(newCharacter());
      this.resetFields();
  }

  

  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
