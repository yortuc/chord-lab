import createChord from "./createChord"

export const defaultCellValues = [
    [1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]
  
export const emptyCellValues = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

export const chords = {
    C:  {notes: "E4 C4 G3 E3 C3 E2",   labels: [0, 1, 0, 2, 3, "x"], color: "yellow"},
    Cm: {notes: "G4 D#4 C4 G3 C3 E2",  labels: [2, 3, 4, 4, 2, "x"], color: "brown"},
    D:  {notes: "F#4 D4 A3 D3 A2 E2",  labels: [2, 3, 2, 0, 0, "x"], color: "tomato"},
    Dm: {notes: "A4 F4 D4 A3 D3 E2",   labels: [1, 3, 2, 0, 0, "x"], color: "gray"},
    E:  {notes: "E4 B3 G#3 E3 B2 E2",  labels: [0, 0, 1, 2, 2, 0], color: "Cyan"},
    Em: {notes: "E4 B3 G3 E3 B2 E2",   labels: [0, 0, 0, 2, 2, 0], color: "MediumVioletRed"},
    F:  {notes: "F4 C4 A3 F3 C3 F2",   labels: [1, 1, 2, 3, 3, 1], color: "DeepPink"},
    Fm: {notes: "F4 C4 G#3 F3 C3 F2",  labels: [1, 1, 1, 3, 3, 1], color: "AntiqueWhite"},
    G:  {notes: "G4 B3 G3 D3 B2 G2",   labels: [3, 0, 0, 0, 2, 3], color: "BurlyWood"},
    Gm: {notes: "G4 D4 A#3 G3 D3 G2",  labels: [3, 3, 3, 5, 5, 3], color: "Crimson"},
    A:  {notes: "E4 C#3 A3 E3 A2 E2",  labels: [0, 2, 2, 2, 0, "x"], color: "Beige"},
    Am: {notes: "E4 C4 A3 E3 A2 E2",   labels: [0, 1, 2, 2, 0, "x"], color: "DarkGoldenRod"},
    B:  {notes: "F#4 D#4 B3 F#3 B2 E2",labels: [2, 4, 4, 4, 2, "x"], color: "DarkCyan"},
    Bm: {notes: "F#4 D4 B3 F#3 B2 E2", labels: [2, 3, 4, 4, 2, "x"], color: "CadetBlue"},
    B7: {notes: "F#4 B3 A3 D#3 B2 E2", labels: [2, 0, 2, 1, 2, "x"], color: "BlueViolet"},
}

export const chordProgressions = [
    {label: "Savrulan adam", bars: [
        {chord: createChord("Em"), cellValues: [...defaultCellValues]},
        {chord: createChord("Am"), cellValues: [...defaultCellValues]}, 
        {chord: createChord("Em"), cellValues: [...defaultCellValues]},
        {chord: createChord("B7"), cellValues: [...defaultCellValues]}
    ]},
    {label: "I-vi-IV-V", bars: [
        {chord: createChord("C"), cellValues: [...defaultCellValues]},
        {chord: createChord("Am"), cellValues: [...defaultCellValues]}, 
        {chord: createChord("Fm"), cellValues: [...defaultCellValues]},
        {chord: createChord("G"), cellValues: [...defaultCellValues]}
    ]}
]
  