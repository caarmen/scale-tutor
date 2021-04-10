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
class MainViewModel {
    constructor() {
        this.i18n = new I18n()
        this._settings = new Settings(new SettingsAccess())

        this._model = new MainModel(this._settings)
        this._noteName = new NoteName(this._settings, this.i18n)
        this._scaleName = new ScaleName(this._settings, this.i18n)
        this._stateMachine = new StateMachine()
        this._stateMachine.autoPlay = this._settings.isAutoPlayEnabled()

        this._scaleIndex = 0
        this._scales = this._model.generateScales()

        this.scaleName = new ObservableField()
        this.scaleImage = new ObservableField()
        this.isPlayingState = new ObservableField(false)

        this.countDownTimerStartListener = (timeS) => { }
        this.countDownTimerStopListener = () => { }

        this._stateMachine.stateListener = (newState) => this._onStateChange(newState)
        this._onStateChange(this._stateMachine.state)

    }

    stop() {
        this._model.stop()
        this._stateMachine.doAction(StateMachine.Action.STOP)
    }
    play = () => this._stateMachine.doAction(StateMachine.Action.PLAY)
    next() {
        this._onMoveToScale(this._scaleIndex + 1)
        this._stateMachine.doAction(StateMachine.Action.NEXT)
    }
    prev() {
        this._onMoveToScale(this._scaleIndex - 1)
        this._stateMachine.doAction(StateMachine.Action.PREVIOUS)
    }
    _onMoveToScale(newIndex) {
        this._scaleIndex = newIndex
        if (this._scaleIndex >= this._scales.length) this._scaleIndex = 0
        if (this._scaleIndex < 0) this._scaleIndex = this._scales.length - 1
    }

    _onStateChange(state) {
        const scale = this._scales[this._scaleIndex]
        switch (state) {
            case StateMachine.State.MANUAL_SCALE_DISPLAY:
                this._model.stop()
                this.isPlayingState.value = false
                this._onScaleChange(scale)
                this.countDownTimerStopListener()
                break;
            case StateMachine.State.AUTO_SCALE_DISPLAY:
                this._onScaleChange(scale)
                this.countDownTimerStopListener()
                break;
            case StateMachine.State.SPEAK_SCALE_NAME:
                this._model.playText(this._getTtsText(scale))
                this.isPlayingState.value = true
                break;
            case StateMachine.State.PLAY_PREPARE:
                break;
            case StateMachine.State.COUNTDOWN_START:
                this.countDownTimerStartListener(this._model.getPreparationTimeS())
                this._model.playScale(scale).then(() => {
                    this._stateMachine.doAction(StateMachine.Action.PLAY_COMPLETED)
                })
                break;
            case StateMachine.State.PLAY_INTERRUPTED:
                this.countDownTimerStopListener()
                this.isPlayingState.value = false
                break;
            case StateMachine.State.PLAY_NOTES:
                break;
            case StateMachine.State.PLAY_COMPLETE:
                this._onMoveToScale(this._scaleIndex + 1)
                break;
            default:
                break;
        }
    }

    _getTtsText = (scale) => `${this._noteName.getTtsNoteName(scale.startingNote)} ${this._scaleName.getScaleName(scale)}`
    _onScaleChange(scale) {
        this.scaleName.value = `${this._noteName.getNoteName(scale.startingNote)} ${this._scaleName.getScaleName(scale)}`
        this.scaleImage.value = this._scaleName.getScaleImage(scale)
    }


}