import { type Product, type TaxCalculationOptions ,taxCalculation } from './06-function-desctructuring';

const shoppingCart: Product[] = [
    {
        description: 'Nokia A1',
        price: 150
    },
    {
        description: 'iPad Air',
        price: 350
    }
];
const options: TaxCalculationOptions = {
    tax: 0.15,
    products: shoppingCart
};

const [total, tax] = taxCalculation(options);

console.log({ total, tax });