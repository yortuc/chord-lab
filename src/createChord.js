import {chords} from './Consts';

export default function createChord(name) {
    const notes = chords[name].notes.split(" ")
    const labels = chords[name].labels

    return {
        title: name,
        rows: notes.map((note, index) => (
            { 
                note, 
                label: labels[index], 
                color: chords[name].color
            }
        ))
    }
}