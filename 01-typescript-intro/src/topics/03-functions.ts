function addNumbers(a: number, b: number): number {
    return a + b;
}

const addNumbersArrow = (a:number , b:number ): string => `${a + b}`;

function multiply(firstNumber:number, secondNumber?:number, base:number = 2){
    return firstNumber * base;
}

// const result: number =  addNumbers(2, 3);
// const result2: number =  addNumbers(2, 1);
// const multiplyResult: number = multiply(2);


// console.log({result})
// console.log({result2})
// console.log({multiplyResult})
interface Character{
    name: String;
    hp: number;
    showHp: () => void;
}


const healCharacter = (character: Character, amount: number) => {

    character.hp += amount;
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`${this.hp}hp`);
    }
}

strider.showHp();

healCharacter(strider, 20);

strider.showHp();



export {};