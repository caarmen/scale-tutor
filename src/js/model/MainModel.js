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

class MainModel {
    constructor(settings) {
        this._scalePlayer = new ScalePlayer()
        this._settings = settings
        this._scaleGenerator = new ScaleGenerator(this._settings)
        this._speechEngine = new SpeechEngine()
    }

    generateScales = () => this._scaleGenerator.createScales(Note.Notes.C4)

    playText(text) {
        if (this._settings.isSpeechSynthesisEnabled()) {
            this._speechEngine.playText(text)
        }
    }

    getPreparationTimeS = () => this._settings.getPreparationTimeS() + (this._settings.isSpeechSynthesisEnabled() ? 1 : 0)

    playScale(scale) {
        const tempoBpm = this._settings.getTempoBpm()
        const transposition = this._settings.getTransposition()
        const preparationTimeS = this.getPreparationTimeS()
        return this._scalePlayer.playScale(scale, preparationTimeS, tempoBpm, transposition, this._settings.getPlaybackOctaves() == 1? ScalePlayer.Rhythm.SIMPLE : ScalePlayer.Rhythm.ADVANCED)
    }

    stop() {
        this._scalePlayer.stop()
    }

}