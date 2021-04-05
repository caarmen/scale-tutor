/**
Copyright (c) 2021 - present Carmen Alvarez
This file is part of Scale Tutor.
Scale Tutor is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
Scale Tutor is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with Scale Tutor.  If not, see <http://www.gnu.org/licenses/>.
*/
class Note {
    constructor(name, octave, halfStepsFromA4) {
        this.name = name
        this.octave = octave
        this.halfStepsFromA4 = halfStepsFromA4
    }
    frequency = () => Note._FREQUENCY_A4 * Note._2_ROOT_12 ** (this.halfStepsFromA4)
    getNote(halfStepDelta) {
        const myIndex = Object.values(Note.Notes).findIndex((item) => item == this)
        const otherIndex = myIndex + halfStepDelta
        const noteKeys = Object.keys(Note.Notes)
        if (otherIndex < 0 || otherIndex >= noteKeys.length) return undefined
        return Note.Notes[noteKeys[otherIndex]]
    }

}
Note._FREQUENCY_A4 = 440.0
Note._2_ROOT_12 = 1.059463
Note.Notes = Object.freeze({
    A0: new Note("A", 0, -48),
    AS0: new Note("AS", 0, -47),
    B0: new Note("B", 0, -46),
    C1: new Note("C", 1, -45),
    CS1: new Note("CS", 1, -44),
    D1: new Note("D", 1, -43),
    DS1: new Note("DS", 1, -42),
    E1: new Note("E", 1, -41),
    F1: new Note("F", 1, -40),
    FS1: new Note("FS", 1, -39),
    G1: new Note("G", 1, -38),
    GS1: new Note("GS", 1, -37),
    A1: new Note("A", 1, -36),
    AS1: new Note("AS", 1, -35),
    B1: new Note("B", 1, -34),
    C2: new Note("C", 2, -33),
    CS2: new Note("CS", 2, -32),
    D2: new Note("D", 2, -31),
    DS2: new Note("DS", 2, -30),
    E2: new Note("E", 2, -29),
    F2: new Note("F", 2, -28),
    FS2: new Note("FS", 2, -27),
    G2: new Note("G", 2, -26),
    GS2: new Note("GS", 2, -25),
    A2: new Note("A", 2, -24),
    AS2: new Note("AS", 2, -23),
    B2: new Note("B", 2, -22),
    C3: new Note("C", 3, -21),
    CS3: new Note("CS", 3, -20),
    D3: new Note("D", 3, -19),
    DS3: new Note("DS", 3, -18),
    E3: new Note("E", 3, -17),
    F3: new Note("F", 3, -16),
    FS3: new Note("FS", 3, -15),
    G3: new Note("G", 3, -14),
    GS3: new Note("GS", 3, -13),
    A3: new Note("A", 3, -12),
    AS3: new Note("AS", 3, -11),
    B3: new Note("B", 3, -10),
    C4: new Note("C", 4, -9),
    CS4: new Note("CS", 4, -8),
    D4: new Note("D", 4, -7),
    DS4: new Note("DS", 4, -6),
    E4: new Note("E", 4, -5),
    F4: new Note("F", 4, -4),
    FS4: new Note("FS", 4, -3),
    G4: new Note("G", 4, -2),
    GS4: new Note("GS", 4, -1),
    A4: new Note("A", 4, 0),
    AS4: new Note("AS", 4, 1),
    B4: new Note("B", 4, 2),
    C5: new Note("C", 5, 3),
    CS5: new Note("CS", 5, 4),
    D5: new Note("D", 5, 5),
    DS5: new Note("DS", 5, 6),
    E5: new Note("E", 5, 7),
    F5: new Note("F", 5, 8),
    FS5: new Note("FS", 5, 9),
    G5: new Note("G", 5, 10),
    GS5: new Note("GS", 5, 11),
    A5: new Note("A", 5, 12),
    AS5: new Note("AS", 5, 13),
    B5: new Note("B", 5, 14),
    C6: new Note("C", 6, 15),
    CS6: new Note("CS", 6, 16),
    D6: new Note("D", 6, 17),
    DS6: new Note("DS", 6, 18),
    E6: new Note("E", 6, 19),
    F6: new Note("F", 6, 20),
    FS6: new Note("FS", 6, 21),
    G6: new Note("G", 6, 22),
    GS6: new Note("GS", 6, 23),
    A6: new Note("A", 6, 24),
    AS6: new Note("AS", 6, 25),
    B6: new Note("B", 6, 26),
    C7: new Note("C", 7, 27),
    CS7: new Note("CS", 7, 28),
    D7: new Note("D", 7, 29),
    DS7: new Note("DS", 7, 30),
    E7: new Note("E", 7, 31),
    F7: new Note("F", 7, 32),
    FS7: new Note("FS", 7, 33),
    G7: new Note("G", 7, 34),
    GS7: new Note("GS", 7, 35),
    A7: new Note("A", 7, 36),
    AS7: new Note("AS", 7, 37),
    B7: new Note("B", 7, 38),
    C8: new Note("C", 8, 39),
})