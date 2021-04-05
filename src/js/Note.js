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

}
Note._FREQUENCY_A4 = 440.0
Note._2_ROOT_12 = 1.059463
Note.Notes = Object.freeze({
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
    A5: new Note(12)
})