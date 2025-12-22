
export function whatsMyType<T>( argument: T ){

    return argument;
}

const amIString = whatsMyType<string>("Hello World");
const amINumber = whatsMyType<number>(100);
const amIArray = whatsMyType<number[]>([1,2,3,4,5]);

console.log(amIString.split(' ') );
console.log(amINumber.toFixed(2) );
console.log(amIArray.join('-') );

export {};