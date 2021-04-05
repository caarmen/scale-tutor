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
class NoteName {
    constructor(settings, i18n) {
        this._settings = settings
        this._i18n = i18n
    }

    getNoteName(note) {
        const noteNameFormat = this._settings.getNoteNameFormat()
        return this._i18n.translate(`${note.name}_${noteNameFormat}`)
    }

    getTtsNoteName(note) {
        const noteNameFormat = this._settings.getNoteNameFormat()
        return this._i18n.translate(`${note.name}_tts_${noteNameFormat}`)
    }

}