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
class ScaleName {
    constructor(settings, i18n) {
        this._settings = settings
        this._i18n = i18n
    }

    getScaleName = (scale) => this._i18n.translate(`scale_type_${this._getScaleNameKey(scale)}`)

    getScaleImage = (scale) => `src/resources/${scale.startingNote.name.toLowerCase()}_${this._getScaleNameKey(scale)}_${this._settings.getClef()}.svg`
    _getScaleNameKey(scale) {
        if (scale.halfSteps == Scale.MAJOR) return "major"
        else if (scale.halfSteps == Scale.NATURAL_MINOR) return "natural_minor"
        else if (scale.halfSteps == Scale.HARMONIC_MINOR) return "harmonic_minor"
        else if (scale.halfSteps == Scale.MELODIC_MINOR) return "melodic_minor"
        else if (scale.halfSteps == Scale.BLUES) return "blues"
        return undefined
    }

}