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
    constructor(halfStepsFromA4) {
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
    A0: new Note(-48),
    AS0: new Note(-47),
    B0: new Note(-46),
    C1: new Note(-45),
    CS1: new Note(-44),
    D1: new Note(-43),
    DS1: new Note(-42),
    E1: new Note(-41),
    F1: new Note(-40),
    FS1: new Note(-39),
    G1: new Note(-38),
    GS1: new Note(-37),
    A1: new Note(-36),
    AS1: new Note(-35),
    B1: new Note(-34),
    C2: new Note(-33),
    CS2: new Note(-32),
    D2: new Note(-31),
    DS2: new Note(-30),
    E2: new Note(-29),
    F2: new Note(-28),
    FS2: new Note(-27),
    G2: new Note(-26),
    GS2: new Note(-25),
    A2: new Note(-24),
    AS2: new Note(-23),
    B2: new Note(-22),
    C3: new Note(-21),
    CS3: new Note(-20),
    D3: new Note(-19),
    DS3: new Note(-18),
    E3: new Note(-17),
    F3: new Note(-16),
    FS3: new Note(-15),
    G3: new Note(-14),
    GS3: new Note(-13),
    A3: new Note(-12),
    AS3: new Note(-11),
    B3: new Note(-10),
    C4: new Note(-9),
    CS4: new Note(-8),
    D4: new Note(-7),
    DS4: new Note(-6),
    E4: new Note(-5),
    F4: new Note(-4),
    FS4: new Note(-3),
    G4: new Note(-2),
    GS4: new Note(-1),
    A4: new Note(0),
    AS4: new Note(1),
    B4: new Note(2),
    C5: new Note(3),
    CS5: new Note(4),
    D5: new Note(5),
    DS5: new Note(6),
    E5: new Note(7),
    F5: new Note(8),
    FS5: new Note(9),
    G5: new Note(10),
    GS5: new Note(11),
    A5: new Note(12),
    AS5: new Note(13),
    B5: new Note(14),
    C6: new Note(15),
    CS6: new Note(16),
    D6: new Note(17),
    DS6: new Note(18),
    E6: new Note(19),
    F6: new Note(20),
    FS6: new Note(21),
    G6: new Note(22),
    GS6: new Note(23),
    A6: new Note(24),
    AS6: new Note(25),
    B6: new Note(26),
    C7: new Note(27),
    CS7: new Note(28),
    D7: new Note(29),
    DS7: new Note(30),
    E7: new Note(31),
    F7: new Note(32),
    FS7: new Note(33),
    G7: new Note(34),
    GS7: new Note(35),
    A7: new Note(36),
    AS7: new Note(37),
    B7: new Note(38),
    C8: new Note(39),
})