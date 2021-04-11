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
        this.noteNameFormatDisplayValue = new ObservableField(this._getNoteNameFormatDisplayValue(this._settings.getNoteNameFormat()))
        this.clefDisplayValue = new ObservableField(this._getClefDisplayValue(this._settings.getClef()))

        this._stateMachine.stateListener = (newState) => this._onStateChange(newState)
        this._onStateChange(this._stateMachine.state)
        this._settings.observerNoteNameFormatListener = (newValue) => {
            this.noteNameFormatDisplayValue.value = this._getNoteNameFormatDisplayValue(newValue)
            this._onScaleChange(this._scales[this._scaleIndex])
        }
        this._settings.observerClef = (newValue) => {
            this.clefDisplayValue.value = this._getClefDisplayValue(newValue)
            this._onScaleChange(this._scales[this._scaleIndex])
        }
    }

    stop = () => this._stateMachine.doAction(StateMachine.Action.STOP)
    play = () => this._stateMachine.doAction(StateMachine.Action.PLAY)
    next() {
        this._onMoveToScale(this._scaleIndex + 1)
        this._stateMachine.doAction(StateMachine.Action.NEXT)
    }
    prev() {
        this._onMoveToScale(this._scaleIndex - 1)
        this._stateMachine.doAction(StateMachine.Action.PREVIOUS)
    }
    isSpeechSynthesisEnabled = () => this._settings.isSpeechSynthesisEnabled()
    setSpeechSynthesisEnabled = (value) => this._settings.setSpeechSynthesisEnabled(value)
    isAutoPlayEnabled = () => this._settings.isAutoPlayEnabled()
    setAutoPlayEnabled(value) {
        this._settings.setAutoPlayEnabled(value)
        this._stateMachine.autoPlay = value
    }

    getNoteNameFormatRadioGroup = () => new RadioGroup(
        "setting__note-names-format",
        "note-names-format",
        "setting_title_note_names",
        this.getNoteNameFormat(),
        [
            new RadioItem("note-name-format__abc", "setting_value_note_names_abc", Settings.NoteNameFormat.ABC),
            new RadioItem("note-name-format__solfege", "setting_value_note_names_solfege", Settings.NoteNameFormat.SOLFEGE),
        ],
        (newValue) => {
            this._settings.setNoteNameFormat(newValue)
        })

    getNoteNameFormat = () => this._settings.getNoteNameFormat()
    _getNoteNameFormatDisplayValue = (value) => this.i18n.translate(`setting_value_note_names_${value}`)

    _getClefDisplayValue = (value) => this.i18n.translate(`setting_value_clef_${value}`)

    getClefRadioGroup = () => new RadioGroup(
        "setting__clef",
        "clef",
        "setting_title_clef",
        this._settings.getClef(),
        Object.values(Settings.Clef).map((item) => new RadioItem(`clef__${item}`, `setting_value_clef_${item}`, item)),
        (newValue) => { this._settings.setClef(newValue) })

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
                break;
            case StateMachine.State.AUTO_SCALE_DISPLAY:
                this._onScaleChange(scale)
                break;
            case StateMachine.State.SPEAK_SCALE_NAME:
                this._model.playText(this._getTtsText(scale))
                this.isPlayingState.value = true
                break;
            case StateMachine.State.PLAY_NOTES:
                this._model.playScale(scale).then(() => {
                    this._stateMachine.doAction(StateMachine.Action.PLAY_COMPLETED)
                })
                break;
            case StateMachine.State.PLAY_INTERRUPTED:
                this._model.stop()
                this.isPlayingState.value = false
                break;
            case StateMachine.State.PLAY_COMPLETE:
                this._onMoveToScale(this._scaleIndex + 1)
                if (!this.isAutoPlayEnabled()) this.isPlayingState.value = false
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