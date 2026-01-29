import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',

})
export class DynamicPage {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required, Validators.minLength(3)],
    favoriteGames: this.formBuilder.array(
      [
        ['MetalGear', Validators.required],
        ['Deat Strandin', Validators.required]
      ],
      Validators.minLength( 2 )
  )
  });

  newFavoriteInput = new FormControl('', Validators.required );
  // this.formBuilder.control([]);

  get favoriteGames():FormArray{
    return this.myForm.get('favoriteGames') as FormArray
  }

  addToFavorite(){
    if(this.newFavoriteInput.invalid) return;
    const newGame = this.newFavoriteInput.value;

    this.favoriteGames.push(this.formBuilder.control(newGame, Validators.required));

    this.newFavoriteInput.reset();
  }

  deleteFavorite(index:number){
    this.favoriteGames.removeAt(index);
  }

  submit(){
    console.log('submited')
    this.myForm.markAllAsTouched();
  }
  
}
