
export interface Product {
    description: string;
    price: number;
}

const phone : Product = {
    description: 'Nokia A1',
    price: 150
}

const tablet : Product = {
    description: 'iPad Air',
    price: 350
}

const shoppingCar = [ phone, tablet ];
const tax = 0.15;

export interface TaxCalculationOptions{
    tax: number;
    products: Product[];
}

export function taxCalculation({ tax, products }: TaxCalculationOptions ):[number, number]{
    let total = 0;
    
    products.forEach( ({ price }) => {
        total += price;
    });

    return [total, total * tax];
};  

const [ total, taxAmount ] = taxCalculation({ products: shoppingCar, tax });

console.log(`Total: ${total}, Tax: ${taxAmount}`);


