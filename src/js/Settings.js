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
class Settings {
    constructor(settingsAccess) {
        this._settingsAccess = settingsAccess
    }

    getNoteNamesSetting = () => this._settingsAccess.getSetting(Settings._KEY_NOTE_NAMES, Settings.NoteNames.ABC)

    getScaleTypesSetting = () => JSON.parse(this._settingsAccess.getSetting(Settings._KEY_SCALE_TYPES, JSON.stringify([
        Settings.ScaleTypes.MAJOR, Settings.ScaleTypes.MELODIC_MINOR
    ])))

    getMinorScaleShift = () => this._settingsAccess.getSetting(Settings._KEY_SCALE_TYPES, -3)

    getTempoBpm = () => this._settingsAccess.getSetting(Settings._KEY_TEMPO_BPM, 120)

}
Settings.ScaleTypes = Object.freeze({ MAJOR: "major", NATURAL_MINOR: "natural_minor", HARMNOIC_MINOR: "harmonic_minor", MELODIC_MINOR: "melodic_minor", BLUES: "blues" })
Settings._KEY_SCALE_TYPES = "scale_types"
Settings.NoteNames = Object.freeze({ ABC: "abc", SOLFEGE: "solfege" })
Settings._KEY_NOTE_NAMES = "note_names"
Settings._KEY_MINOR_SCALE_SHIFT = "minor_scale_shift"
Settings._KEY_TEMPO_BPM = "tempo_bpm"
