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
class ScaleGenerator {
    constructor(settings) {
        this._settings = settings
    }

    createScales(baseNote) {
        const minorScaleShift = this._settings.getMinorScaleShift()
        return settings.getScaleTypesSetting().map(name => {
            if (name == Settings.ScaleTypes.MAJOR) return new Scale(baseNote, Scale.MAJOR)
            else if (name == Settings.ScaleTypes.NATURAL_MINOR) return new Scale(baseNote.getNote(minorScaleShift), Scale.NATURAL_MINOR)
            else if (name == Settings.ScaleTypes.HARMONIC_MINOR) return new Scale(baseNote.getNote(minorScaleShift), Scale.HARMONIC_MINOR)
            else if (name == Settings.ScaleTypes.MELODIC_MINOR) return new Scale(baseNote.getNote(minorScaleShift), Scale.MELODIC_MINOR)
            else if (name == Settings.ScaleTypes.BLUES) return new Scale(baseNote, Scale.BLUES)
            else return undefined
        })
    }

}