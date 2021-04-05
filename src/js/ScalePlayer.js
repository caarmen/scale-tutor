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
class ScalePlayer {
    constructor() {
        this._context = new (window.AudioContext || window.webkitAudioContext)();
        this._isPlaying = false
    }

    isPlaying = () => this._isPlaying

    stop() {
        console.log("stop, context = " + this._context)
        if (this._context) {
            this._context.close()
            this._context = undefined
        }
    }

    playScale(scale, preparationTimeS, tempoBpm) {
        const noteDuration = 60 / tempoBpm
        console.log("playScale, context = " + this._context)
        if (!this._context) {
            this._context = new (window.AudioContext || window.webkitAudioContext)();
        }
        return new Promise((completionFunction) => {
            this._isPlaying = true
            const oscillator = this._context.createOscillator();
            // oscillator.type = "sine";
            scale.halfSteps.map(halfStep => scale.startingNote.getNote(halfStep))
                .filter(note => note != undefined)
                .forEach((note, index) => {
                    oscillator.frequency.setValueAtTime(
                        note.frequency(),
                        this._context.currentTime + preparationTimeS + index * noteDuration);

                })
            oscillator.connect(this._context.destination);
            oscillator.start(this._context.currentTime + preparationTimeS);
            oscillator.stop(this._context.currentTime + preparationTimeS + scale.halfSteps.length * noteDuration)
            oscillator.onended = () => {
                this._isPlaying = false
                completionFunction()
            }
        })
    }

}