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

    getNoteNameFormat = () => this._settingsAccess.getSetting(Settings._KEY_NOTE_NAME_FORMAt, Settings.NoteNameFormat.ABC)

    getScaleTypes = () => JSON.parse(this._settingsAccess.getSetting(Settings._KEY_SCALE_TYPES, JSON.stringify([
        Settings.ScaleTypes.MAJOR, Settings.ScaleTypes.MELODIC_MINOR
    ])))

    getMinorScaleShift = () => this._settingsAccess.getSetting(Settings._KEY_SCALE_TYPES, -3)

    getScaleOrder = () => this._settingsAccess.getSetting(Settings._KEY_SCALE_ORDER, Settings.ScaleOrder.INCREASING_FLATS)

    getTempoBpm = () => this._settingsAccess.getSetting(Settings._KEY_TEMPO_BPM, 120)

    getPreparationTimeS = () => this._settingsAccess.getSetting(Settings._KEY_PREPARATION_TIME, 5)

    isAutoPlayEnabled = () => this._settingsAccess.getSetting(Settings._KEY_AUTOPLAY, true)

    isSpeechSynthesisEnabled = () => this._settingsAccess.getSetting(Settings._KEY_SPEECH_SYNTHESIS, true)

    getTransposition = () => this._settingsAccess.getSetting(Settings._KEY_TRANSPOSITION, 0)

    getClef = () => this._settingsAccess.getSetting(Settings._KEY_MINOR_SCALE_SHIFT, Settings.Clef.TREBLE)

}
Settings.Clef = Object.freeze({ TREBLE: "treble", BASS: "bass", ALTO: "alto" })
Settings.ScaleTypes = Object.freeze({ MAJOR: "major", NATURAL_MINOR: "natural_minor", HARMONIC_MINOR: "harmonic_minor", MELODIC_MINOR: "melodic_minor", BLUES: "blues" })
Settings.ScaleOrder = Object.freeze({
    INCREASING_NOTES: "increasing_notes",
    DECREASING_NOTES: "decreasing_notes",
    INCREASING_FLATS: "increasing_flats",
    INCREASING_SHARPS: "increasing_sharps",
    INCREASING_FLATS_AND_SHARPS: "incresing_flats_and_sharps",
    RANDOM: "random"
})
Settings.NoteNameFormat = Object.freeze({ ABC: "abc", SOLFEGE: "solfege" })

Settings._KEY_AUTOPLAY = "autoplay"
Settings._KEY_SCALE_TYPES = "scale_types"
Settings._KEY_SCALE_ORDER = "scale_order"
Settings._KEY_NOTE_NAME_FORMAt = "note_name_format"
Settings._KEY_MINOR_SCALE_SHIFT = "minor_scale_shift"
Settings._KEY_TEMPO_BPM = "tempo_bpm"
Settings._KEY_PREPARATION_TIME_S = "preparation_time_s"
Settings._KEY_SPEECH_SYNTHESIS = "speech_synthesis"
Settings._KEY_TRANSPOSITION = "transposition"
Settings._KEY_CLEF = "clef"
