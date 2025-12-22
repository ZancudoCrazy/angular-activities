interface AudioPlayer{
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer : AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Pay",
    details: {
        author: "Chef",
        year: 2470
    }
}


// const { song, details } = audioPlayer;
// const { author } = details;

// console.log(`Song: ${song}`);
// console.log(`Author:  ${author}`);

const dbz = ['Goku', 'Vegeta', 'Trunks'];
const [ , , trunks, napa = 'No hay personaje' ] = dbz;

console.log(`Personaje 1: ${trunks}`);
console.log(`Personaje 2: ${napa}`);