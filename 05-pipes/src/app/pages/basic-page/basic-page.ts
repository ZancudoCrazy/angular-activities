import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvaliableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
  ],
  templateUrl: './basic-page.html'
})
export default class BasicPage { 
  localService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal('adrian');
  nameUpper = signal('ADRIAN');
  fullName = signal('AdRIan SaNCheZ');

  customDate = signal( new Date() );

  tickingDateEffect = effect((cleanUp) => {
    const interval = setInterval(()=>{
      this.customDate.set(new Date());
    }, 1000)
    console.log('tick')
    cleanUp( () => {
      clearInterval(interval);
    })
  });

  changeLocale(locale:AvaliableLocale){
    this.localService.changeLocale(locale);
  }
}
