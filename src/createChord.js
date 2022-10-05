class ChordEm {
    constructor(){
        this.title = "Em"
        this.rows = [
            {label: 'E4',   note: 'E4', cells: [1, 0, 0, 0, 1, 0, 0, 0], color: 'green'},
            {label: 'B3',   note: 'B3', cells: [0, 1, 0, 1, 0, 1, 0, 1], color: 'green'},
            {label: 'G3',   note: 'G3', cells: [0, 0, 1, 0, 0, 0, 1, 0], color: 'green'},
            {label: 'E3',   note: 'E3', cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'green'},
            {label: 'B2',   note: 'B2', cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'green'},
            {label: 'E2',   note: 'E2', cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'green'}
        ]
    }
}

class ChordAm {
    constructor(){
        this.title = "Am"
        this.rows = [
            {label: 'E4',   note: 'E4', cells: [1, 0, 0, 0, 1, 0, 0, 0], color: 'blue'},
            {label: 'C4',   note: 'C4', cells: [0, 1, 0, 1, 0, 1, 0, 1], color: 'blue'},
            {label: 'A3',   note: 'A3', cells: [0, 0, 1, 0, 0, 0, 1, 0], color: 'blue'},
            {label: 'E3',   note: 'E3', cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'blue'},
            {label: 'A2',   note: 'A2', cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'blue'},
            {label: 'E2',   note: 'E2', cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'blue'}
        ]
    }
}

class ChordB7 {
    constructor(){
        this.title = "B7"
        this.rows = [
            {label: 'F#4', note: 'F#4', cells: [1, 0, 0, 0, 1, 0, 0, 0], color: 'orange'},
            {label: 'B3',  note: 'B3',  cells: [0, 1, 0, 1, 0, 1, 0, 1], color: 'orange'},
            {label: 'A3',  note: 'A3',  cells: [0, 0, 1, 0, 0, 0, 1, 0], color: 'orange'},
            {label: 'D#3', note: 'D#3', cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'orange'},
            {label: 'B2',  note: 'B2',  cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'orange'},
            {label: 'E2',  note: 'E2',  cells: [0, 0, 0, 0, 0, 0, 0, 0], color: 'orange'}
        ]
    }
}

export default function createChord(name) {
    const mapping = {
        "Em": ChordEm,
        "Am": ChordAm,
        "B7": ChordB7
    }
    return new mapping[name]()
}