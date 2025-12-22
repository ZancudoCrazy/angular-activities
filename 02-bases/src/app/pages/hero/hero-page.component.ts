import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({
    templateUrl: './hero-page.component.html',
    imports: [ UpperCasePipe]
})
export class HeroPageComponent{
    private initialName = 'Ironman';
    private initialAge = 45;
    name = signal(this.initialName);
    age = signal(this.initialAge);
    heroDescription = computed(() => {
        const description = `${this.name()} - ${this.age()}`;
        return description;
    })

    capitalizeName = computed( () => {
        const name = this.name();
        return name.toUpperCase();
    })

    changeHero(){
        this.name.set('SpiderMan');
        this.age.set( 22);
    }

    resetForm(){
        this.name.set(this.initialName);
        this.age.set(this.initialAge);
    }

    changeAge(){
        this.age.update(current =>  current + 1);
    }
}