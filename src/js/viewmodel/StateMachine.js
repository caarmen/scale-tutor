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
class StateMachine {
    constructor() {
        this._tag = "StateMachine"
        this.state = StateMachine.State.MANUAL_SCALE_DISPLAY
        this.autoPlay = false
        this.stateListener = (newState) => { }
    }

    doAction(action) {
        let nextState = this._getNextState(action)
        Log.log(this._tag, `${this.state}:${action} => ${nextState}`)
        this.state = nextState
        this.stateListener(this.state)
        for (nextState = this._getNextStateAutomatic(); nextState != undefined; nextState = this._getNextStateAutomatic()) {
            Log.log(this._tag, `  -> ${nextState}`)
            this.state = nextState
            this.stateListener(this.state)
        }
    }
    _getNextState(action) {
        switch (action) {
            case StateMachine.Action.NEXT:
                return StateMachine.State.MANUAL_SCALE_DISPLAY
            case StateMachine.Action.PREVIOUS:
                return StateMachine.State.MANUAL_SCALE_DISPLAY
            case StateMachine.Action.PLAY:
                if (this.state == StateMachine.State.AUTO_SCALE_DISPLAY) {
                    return StateMachine.State.SPEAK_SCALE_NAME
                } else if (this.state == StateMachine.State.MANUAL_SCALE_DISPLAY) {
                    return StateMachine.State.SPEAK_SCALE_NAME
                } else {
                    return StateMachine.State.PLAY_PREPARE
                }
            case StateMachine.Action.STOP:
                return StateMachine.State.PLAY_INTERRUPTED
            default: /* PLAY_COMPLETED*/
                return StateMachine.State.PLAY_COMPLETE
        }
    }
    _getNextStateAutomatic() {
        switch (this.state) {
            case StateMachine.State.AUTO_SCALE_DISPLAY:
                return StateMachine.State.SPEAK_SCALE_NAME
            case StateMachine.State.SPEAK_SCALE_NAME:
                return StateMachine.State.PLAY_PREPARE
            case StateMachine.State.PLAY_PREPARE:
                return StateMachine.State.COUNTDOWN_START
            case StateMachine.State.COUNTDOWN_START:
                return StateMachine.State.PLAY_NOTES
            case StateMachine.State.PLAY_COMPLETE:
                if (this.autoPlay) return StateMachine.State.AUTO_SCALE_DISPLAY
                else return undefined
            default:
                return undefined
        }
    }
}
StateMachine.Action = Object.freeze({
    NEXT: "next",
    PREVIOUS: "previous",
    PLAY: "play",
    STOP: "stop",
    PLAY_COMPLETED: "play_completed"
})
StateMachine.State = Object.freeze({
    MANUAL_SCALE_DISPLAY: "manual_scale_display",
    AUTO_SCALE_DISPLAY: "auto_scale_display",
    SPEAK_SCALE_NAME: "speak_scale_name",
    PLAY_PREPARE: "play_prepare",
    COUNTDOWN_START: "countdown_start",
    PLAY_INTERRUPTED: "play_interrupted",
    PLAY_NOTES: "play_notes",
    PLAY_COMPLETE: "play_completed"
})