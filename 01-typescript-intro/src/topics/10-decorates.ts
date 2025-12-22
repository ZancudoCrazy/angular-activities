function classDecorator<T extends { new (...args: any[]): {}}>
    ( constructor: T){
    return class extends constructor {
        newProperty = 'New property';
        hello = 'override';
    }
}

@classDecorator
export class SuperClass{
    public myProperty: string = 'Abc123';
    print(){
        console.log('Hello world!');
    }
}

console.log( SuperClass)

const myClass = new SuperClass();
myClass.print();