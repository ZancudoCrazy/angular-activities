import { effect, Injectable, signal } from "@angular/core";
import { Character } from "../interfaces/character.interface";

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
}


@Injectable({ providedIn: 'root'})
export class DragonballService{

    characters = signal<Character[]>(loadFromLocalStorage());

    addNewCharacter(character: Character){
      this.characters.update((list) => [...list, character]);
    }

    saveToLocalStorage = effect( () => {
      
      localStorage.setItem('characters', JSON.stringify(this.characters()));
    })
}