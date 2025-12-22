interface Passenger{
    name: string,
    children?: string[]
}

const passenger1: Passenger = {
    name: 'Adrian'
}

const passenger2: Passenger = {
    name: 'Jacinto',
    children: ['Marcus', 'Dominic']
}

const printChildren = (passenger: Passenger): void => {
    const howManyChildren = passenger.children?.length || 0;
    console.log(`${passenger.name} has ${howManyChildren} children.`);
}

printChildren(passenger2);
printChildren(passenger1);

export {};