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
        this._tag = "ScalePlayer"
        this._context = new (window.AudioContext || window.webkitAudioContext)();
        this._isPlaying = false
    }

    isPlaying = () => this._isPlaying

    stop() {
        Log.log(this._tag, "stop, context = " + this._context)
        if (this._context) {
            this._context.close()
            this._context = undefined
        }
        this._isPlaying = false
    }

    playScale(scale, tempoBpm, transposition, rhythm) {
        const noteDuration = 60 / tempoBpm
        const ttsTimeS = 2
        const preparationTimeS = ttsTimeS + 4 * noteDuration
        Log.log(this._tag, "playScale, context = " + this._context)
        if (!this._context) {
            this._context = new (window.AudioContext || window.webkitAudioContext)();
        }
        return new Promise((completionFunction) => {
            this._isPlaying = true
            const oscillator = this._context.createOscillator();
            // oscillator.type = "sine";
            for (let i = 0; i < 4; i++) {
                oscillator.frequency.setValueAtTime(
                    scale.startingNote.getNote(transposition).frequency(),
                    this._context.currentTime + ttsTimeS + i * noteDuration)
                oscillator.frequency.setValueAtTime(
                    0,
                    this._context.currentTime + ttsTimeS + (i * noteDuration) + (noteDuration / 2))
            }

            const noteStartTimes = this._getNoteStartTimes(scale, noteDuration, rhythm)
            scale.halfSteps.map(halfStep => scale.startingNote.getNote(halfStep + transposition))
                .filter(note => note != undefined)
                .forEach((note, index) => {
                    oscillator.frequency.setValueAtTime(
                        note.frequency(),
                        this._context.currentTime + preparationTimeS + noteStartTimes[index]);

                })
            oscillator.connect(this._context.destination);
            oscillator.start(this._context.currentTime + preparationTimeS - 4 * noteDuration)
            oscillator.stop(this._context.currentTime + preparationTimeS + noteStartTimes[noteStartTimes.length - 1] + noteDuration)
            oscillator.onended = () => {
                this._isPlaying = false
                completionFunction()
            }
        })
    }
    _getNoteStartTimes(scale, baseNoteDuration, rhythm) {
        if (rhythm == ScalePlayer.Rhythm.SIMPLE) return this._getNoteStartTimesSimple(scale, baseNoteDuration)
        else return this._getNoteStartTimesAdvanced(scale, baseNoteDuration)
    }
    _getNoteStartTimesSimple = (scale, baseNoteDuration) => scale.halfSteps.map(function (value, index) {
        if (index == 0) return 0
        this.acc += baseNoteDuration
        return this.acc
    }, { acc: 0 })
    _getNoteStartTimesAdvanced = (scale, baseNoteDuration) => scale.halfSteps.map(function (value, index) {
        if (index == 0) return 0
        const isAfterRootNote = (index) % 7 == 1
        this.acc += (isAfterRootNote ? baseNoteDuration : baseNoteDuration / 2)
        return this.acc
    }, { acc: 0 })

}
ScalePlayer.Rhythm = Object.freeze({ SIMPLE: 1, ADVANCED: 2 })
