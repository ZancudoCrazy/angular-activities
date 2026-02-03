import { afterNextRender, afterRenderEffect, Component, effect, OnChanges, OnInit, signal } from '@angular/core';
import { Title } from '../../components/title/title';

const log = (...messages:string[]) => {
  console.log(`${messages[0]} %c${messages.slice(1).join(',\n')}`,
  `color:#bada55`)
} 

@Component({
  selector: 'app-home-page',
  imports: [ Title ],
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit, OnChanges{
  
  traditionalProperty = 'Adrian';
  signalProperty = signal('Adrian');

  constructor(){
    log('Calling constructor')
  }

  changeTraditional(){
    this.traditionalProperty = 'Adrian Sanchez';
  }

  changeSignal(){
    this.signalProperty.set('Adrian Sanchez')
  }

  basicEffect = effect(( onCleanup ) => {
    log('Effect', 'Trigger secondary effects');

    onCleanup (() => {
      log('onCleanup', 'Runs once before the effect is destroyed')
    })
  })

  ngOnInit()	{
    log('ngOnInit','Runs once after Angular has initialized all the components inputs.')
  }

  ngOnChanges()	{
    log('ngOnChanges','Runs every time the components inputs have changed.')
  }
  
  ngDoCheck()	{
    log('ngDoCheck','Runs every time this component is checked for changes.')
  }

  ngAfterContentInit()	{
    log('ngAfterContentInit','Runs once after the components content has been initialized.')
  }

  ngAfterContentChecked()	{
    log('ngAfterContentChecked','Runs every time this component content has been checked for changes.')
  }

  ngOnDestroy() {
    log('ngOnDestroy', 'Runs once before the component is destroyed.')
  }

  afterNextRenderEffect = afterNextRender(() => 
    log('afterNextRender	','Runs once the next time that all components have been rendered to the DOM.'))
  afterRenderEffect = afterRenderEffect(() => 
    log('afterRender','Runs every time all components have been rendered to the DOM.'))
}