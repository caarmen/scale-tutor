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
class Scale {
    constructor(startingNote, halfSteps) {
        this.startingNote = startingNote
        this.halfSteps = halfSteps
    }
}
Scale.MAJOR =           [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0]
Scale.NATURAL_MINOR =   [0, 2, 3, 5, 7, 8, 10, 12, 10, 8, 7, 5, 3, 2, 0]
Scale.HARMONIC_MINOR =  [0, 2, 3, 5, 7, 8, 11, 12, 11, 8, 7, 5, 3, 2, 0]
Scale.MELODIC_MINOR =   [0, 2, 3, 5, 7, 9, 11, 12, 10, 8, 7, 5, 3, 2, 0]
Scale.MAJOR2 =          [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 23, 21, 19, 17, 16, 14, 12, 11, 9, 7, 5, 4, 2, 0]
Scale.NATURAL_MINOR2 =  [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 22, 20, 19, 17, 15, 14, 12, 10, 8, 7, 5, 3, 2, 0]
Scale.HARMONIC_MINOR2 = [0, 2, 3, 5, 7, 8, 11, 12, 14, 15, 17, 19, 20, 23, 24, 23, 20, 19, 17, 15, 14, 12, 11, 8, 7, 5, 3, 2, 0]
Scale.MELODIC_MINOR2 =  [0, 2, 3, 5, 7, 9, 11, 12, 14, 15, 17, 19, 21, 23, 24, 22, 20, 19, 17, 15, 14, 12, 10, 8, 7, 5, 3, 2, 0]