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
class MainView {
    constructor() {
        this._viewModel = new MainViewModel()

        this._elemButtonSettings = document.querySelector("#button-settings")
        this._scaleView = new ScaleView()
        this._controlsView = new ControlsView(this._viewModel.i18n)

        this._mdcDialog

        this._elemSettingNoteNamesFormatLabel
        this._elemSettingNoteNamesFormatValue
        this._initViews()
        this._bindViewModel()
    }

    _initViews() {
        this._controlsView.initViews()
        this._elemButtonSettings.onclick = () => this._showSettings()
        document.querySelector("#placeholder-settings-dialog").innerHTML = templateDialog("settings-dialog", "settings_title", templateSettings, "")
        document.querySelector("#placeholder-setting__tts-enabled").innerHTML = templateToggle("setting__tts-enabled", "setting_tts_enabled")
        document.querySelector("#placeholder-setting__autoplay-enabled").innerHTML = templateToggle("setting__autoplay-enabled", "setting_autoplay_enabled")
        document.querySelector("#placeholder-setting__note-names").innerHTML = templateSetting("note-names", "setting_title_note_names")
        document.querySelector("#placeholder-options-note-name-format").innerHTML = templateDialog("options-note-name-format", "setting_title_note_names", templateOptionsNoteNameFormat, "settings-detail-dialog")
        document.querySelector("#placeholder_note-name-format__abc").innerHTML = templateRadio("note-name-format", "note-name-format__abc", "setting_value_note_names_abc")
        document.querySelector("#placeholder_note-name-format__solfege").innerHTML = templateRadio("note-name-format", "note-name-format__solfege", "setting_value_note_names_solfege")
        this._elemSettingNoteNamesFormatLabel = document.querySelector("#label_setting__note-names")
        this._elemSettingNoteNamesFormatValue = document.querySelector("#setting__note-names")
        this._viewModel.i18n.translateElement(document.documentElement)

        this._mdcDialog = new mdc.dialog.MDCDialog(document.querySelector('#settings-dialog'))
    }

    _bindViewModel() {
        this._viewModel.scaleName.observer = (scaleName) => this._scaleView.displayScaleName(scaleName)
        this._viewModel.scaleImage.observer = (scaleImage) => this._scaleView.displayScaleImage(scaleImage)
        this._viewModel.isPlayingState.observer = (isPlayingState) => this._controlsView.setPlayingState(isPlayingState)

        this._controlsView.onStopListener = () => this._viewModel.stop()
        this._controlsView.onStartListener = () => this._viewModel.play()
        this._controlsView.onPrevListener = () => this._viewModel.prev()
        this._controlsView.onNextListener = () => this._viewModel.next()
    }

    _showSettings() {
        this._mdcDialog.open()
        this._mdcDialog.listen('MDCDialog:opened', () => {
            const mdcSwitchTtsEnabled = new mdc.switchControl.MDCSwitch(document.querySelector("#setting__tts-enabled"))
            mdcSwitchTtsEnabled.checked = this._viewModel.isSpeechSynthesisEnabled()
            mdcSwitchTtsEnabled.listen("change", (e) => {
                this._viewModel.setSpeechSynthesisEnabled(mdcSwitchTtsEnabled.checked)
            })
            const mdcSwitchAutoPlayEnabled = new mdc.switchControl.MDCSwitch(document.querySelector("#setting__autoplay-enabled"))
            mdcSwitchAutoPlayEnabled.checked = this._viewModel.isAutoPlayEnabled()
            mdcSwitchAutoPlayEnabled.listen("change", (e) => {
                this._viewModel.setAutoPlayEnabled(mdcSwitchAutoPlayEnabled.checked)
            })
            this._elemSettingNoteNamesFormatValue.innerText = this._viewModel.getNoteNamesDisplayValue()
            this._elemSettingNoteNamesFormatLabel.onclick = () => this._displayNoteNamesFormatSetting()
            this._elemSettingNoteNamesFormatValue.onclick = () => this._displayNoteNamesFormatSetting()
        })
    }
    _displayNoteNamesFormatSetting() {
        const dialog = new mdc.dialog.MDCDialog(document.querySelector("#options-note-name-format"))
        dialog.open()
        const noteNameFormat = this._viewModel.getNoteNameFormat()
        this._checkRadio("note-name-format__abc", noteNameFormat == Settings.NoteNameFormat.ABC, () => {
            this._viewModel.setNoteNameFormat(Settings.NoteNameFormat.ABC)
            this._elemSettingNoteNamesFormatValue.innerText = this._viewModel.getNoteNamesDisplayValue()
        })
        this._checkRadio("note-name-format__solfege", noteNameFormat == Settings.NoteNameFormat.SOLFEGE, () => {
            this._viewModel.setNoteNameFormat(Settings.NoteNameFormat.SOLFEGE)
            this._elemSettingNoteNamesFormatValue.innerText = this._viewModel.getNoteNamesDisplayValue()
        })

    }
    _checkRadio(id, checked, listener) {
        const radioControl = new mdc.radio.MDCRadio(document.querySelector(`#${id}__mdc-radio`))
        const formField = new mdc.formField.MDCFormField(document.querySelector(`#${id}__mdc-form-field`))
        radioControl.checked = checked
        formField.input = radioControl
        radioControl.listen("change", (e) => { if (radioControl.checked) listener() })
    }
}