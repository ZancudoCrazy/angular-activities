const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapBoxkey = process.env['MAPBOX_KEY']

if( !mapBoxkey) throw new Error('MAPBOX KEY is not set')

const envFileContent = `
export const environment = {
    mapBoxkey: "${mapBoxkey}"
};
`;    

mkdirSync('./src/environments', {recursive: true});

writeFileSync( targetPath, envFileContent)
writeFileSync( targetPathDev, envFileContent)