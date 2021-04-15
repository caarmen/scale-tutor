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
        this.observerNoteNameFormat = (newValue) => { }
        this.observerClef = (newValue) => { }
        this.observerOrder = (newValue) => { }
        this.observerOctaves = (newValue) => { }
        this.observerMinorScaleShift = (newValue) => { }
        this.observerTransposition = (newValue) => { }
        this.observerTempo = (newValue) => { }
        this.observerScaleTypes = (newValues) => { }

        this._settingsAccess.addObserver((key, value) => {
            if (key == Settings._KEY_NOTE_NAME_FORMAt) {
                this.observerNoteNameFormat(value)
            } else if (key == Settings._KEY_CLEF) {
                this.observerClef(value)
            } else if (key == Settings._KEY_SCALE_ORDER) {
                this.observerOrder(value)
            } else if (key == Settings._KEY_PLAYbACK_OCTAVES) {
                this.observerOctaves(value)
            } else if (key == Settings._KEY_MINOR_SCALE_SHIFT) {
                this.observerMinorScaleShift(value)
            } else if (key == Settings._KEY_TRANSPOSITION) {
                this.observerTransposition(value)
            } else if (key == Settings._KEY_TEMPO_BPM) {
                this.observerTempo(value)
            } else if (key == Settings._KEY_SCALE_TYPES) {
                this.observerScaleTypes(JSON.parse(value))
            }
        })
    }

    isSpeechSynthesisEnabled = () => this._settingsAccess.getSetting(Settings._KEY_SPEECH_SYNTHESIS, "true") == "true"
    setSpeechSynthesisEnabled = (value) => this._settingsAccess.setSetting(Settings._KEY_SPEECH_SYNTHESIS, value)

    isAutoPlayEnabled = () => this._settingsAccess.getSetting(Settings._KEY_AUTOPLAY, "true") == "true"
    setAutoPlayEnabled = (value) => this._settingsAccess.setSetting(Settings._KEY_AUTOPLAY, value)

    getNoteNameFormat = () => this._settingsAccess.getSetting(Settings._KEY_NOTE_NAME_FORMAt, Settings.NoteNameFormat.ABC)
    setNoteNameFormat = (value) => this._settingsAccess.setSetting(Settings._KEY_NOTE_NAME_FORMAt, value)

    getClef = () => this._settingsAccess.getSetting(Settings._KEY_CLEF, Settings.Clef.TREBLE)
    setClef = (value) => this._settingsAccess.setSetting(Settings._KEY_CLEF, value)

    getScaleOrder = () => this._settingsAccess.getSetting(Settings._KEY_SCALE_ORDER, Settings.ScaleOrder.INCREASING_FLATS)
    setScaleOrder = (value) => this._settingsAccess.setSetting(Settings._KEY_SCALE_ORDER, value)

    getPlaybackOctaves = () => this._settingsAccess.getSetting(Settings._KEY_PLAYbACK_OCTAVES, 1)
    setPlaybackOctaves = (value) => this._settingsAccess.setSetting(Settings._KEY_PLAYbACK_OCTAVES, value)

    getMinorScaleShift = () => parseInt(this._settingsAccess.getSetting(Settings._KEY_MINOR_SCALE_SHIFT, -3))
    setMinorScaleShift = (value) => this._settingsAccess.setSetting(Settings._KEY_MINOR_SCALE_SHIFT, value)

    getTransposition = () => parseInt(this._settingsAccess.getSetting(Settings._KEY_TRANSPOSITION, 0))
    setTransposition = (value) => this._settingsAccess.setSetting(Settings._KEY_TRANSPOSITION, value)

    getTempoBpm = () => this._settingsAccess.getSetting(Settings._KEY_TEMPO_BPM, Settings.Tempo.ALLEGRETTO)
    setTempoBpm = (value) => this._settingsAccess.setSetting(Settings._KEY_TEMPO_BPM, value)

    getScaleTypes = () => JSON.parse(this._settingsAccess.getSetting(Settings._KEY_SCALE_TYPES, JSON.stringify([
        Settings.ScaleTypes.MAJOR, Settings.ScaleTypes.MELODIC_MINOR
    ])))
    setScaleTypes = (values) => this._settingsAccess.setSetting(Settings._KEY_SCALE_TYPES, JSON.stringify(values))

}
Settings.Clef = Object.freeze({ TREBLE: "treble", BASS: "bass", ALTO: "alto" })
Settings.ScaleTypes = Object.freeze({ MAJOR: "major", NATURAL_MINOR: "natural_minor", HARMONIC_MINOR: "harmonic_minor", MELODIC_MINOR: "melodic_minor" })
Settings.ScaleOrder = Object.freeze({
    INCREASING_NOTES: "increasing_notes",
    DECREASING_NOTES: "decreasing_notes",
    INCREASING_FLATS: "increasing_flats",
    INCREASING_SHARPS: "increasing_sharps",
    INCREASING_FLATS_AND_SHARPS: "incresing_flats_and_sharps",
    RANDOM: "random",
})
Settings.NoteNameFormat = Object.freeze({ ABC: "abc", SOLFEGE: "solfege" })
Settings.Tempo = Object.freeze({
    LARGO: 40,
    LENTO: 60,
    ADAGIO: 76,
    ANDANTE: 90,
    MODERATO: 108,
    ALLEGRETTO: 120,
    ALLEGRO: 140,
    VIVACE: 160,
    PRESTO: 180
})

Settings._KEY_AUTOPLAY = "autoplay"
Settings._KEY_SCALE_TYPES = "scale_types"
Settings._KEY_SCALE_ORDER = "scale_order"
Settings._KEY_NOTE_NAME_FORMAt = "note_name_format"
Settings._KEY_MINOR_SCALE_SHIFT = "minor_scale_shift"
Settings._KEY_TEMPO_BPM = "tempo_bpm"
Settings._KEY_SPEECH_SYNTHESIS = "speech_synthesis"
Settings._KEY_TRANSPOSITION = "transposition"
Settings._KEY_CLEF = "clef"
Settings._KEY_PLAYbACK_OCTAVES = "playback_octaves"
