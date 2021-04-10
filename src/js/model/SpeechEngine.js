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

class SpeechEngine {
    constructor() {
        this._synth = window.speechSynthesis
    }

    playText(text) {
        const speechSynthesisUtterance = new SpeechSynthesisUtterance(text)
        this._synth.speak(speechSynthesisUtterance)
    }

}