import { Component, signal } from "@angular/core";

@Component({
    templateUrl: './counter-page.component.html'
})
export class CounterPageComponent{
    counter = 10;
    counterSignal = signal(10)
    increaseBy(value: number){
        this.counter += value;
        this.counterSignal.update( counter => counter + value);
    }

    decreaseBy(value: number){
        this.counter -= value;
        this.counterSignal.update(counter => counter - value);
    }

    reset(){
        this.counter = 0;
        this.counterSignal.set(0);
    }
}