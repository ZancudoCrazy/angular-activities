export class Person{
    public name: string;
    public address: string;

    constructor(name: string, address: string){
        this.name = name;
        this.address = address;
    }
}

// export class Hero extends Person{
    
//     public alterEgo: string;
//     public realName: string;
//     public age: number;
//     constructor(alterEgo: string, realName: string, age: number,address?: string){
//         super(realName, address || 'No address');
//         this.alterEgo = alterEgo;
//         this.realName = realName;
//         this.age = age;
//     }
// }

export class Hero {
    public person: Person;
    public alterEgo: string;
    public realName: string;
    public age: number;
    constructor(alterEgo: string, realName: string, age: number, person:Person){
        this.alterEgo = alterEgo;
        this.realName = realName;
        this.age = age;
        this.person = person;
    }
}

const person = new Person('Tony Stark', 'New York, USA');
const ironman = new Hero('Ironman', 'Tony Stark', 45, person );
console.log( ironman );