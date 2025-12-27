import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CharacterList } from "../../components/dragonball/character-list/character-list";
import { Character } from '../../interfaces/character.interface';
import { DragonballCharacterAdd } from "../../components/dragonball/dragonball-character-add/dragonball-character-add";
import { DragonballService } from '../../services/dragonball.service';



@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
  imports: [CharacterList, DragonballCharacterAdd]
  // imports: [NgClass]
})
export class DragonballSuperPageComponent {
  public dragonballService = inject(DragonballService);

}
