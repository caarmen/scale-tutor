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

        this._elemPlaceHolderOptionsSettingDialog = document.querySelector("#placeholder-options-setting-dialog")
        this._mdcDialog

        this._elemSettingNoteNamesFormatLabel
        this._elemSettingNoteNamesFormatValue
        this._initViews()
        this._bindViewModel()
    }

    _initViews() {
        this._controlsView.initViews()
        this._elemButtonSettings.onclick = () => this._showSettings()
        this._inflateSettingsViews()
        this._viewModel.i18n.translateElement(document.documentElement)
        this._mdcDialog = new mdc.dialog.MDCDialog(document.querySelector('#settings-dialog'))
    }

    _inflateSettingsViews() {
        document.querySelector("#placeholder-settings-dialog").innerHTML = templateDialog("settings-dialog", "settings_title", templateSettings, "")
        document.querySelector("#placeholder-setting__tts-enabled").innerHTML = templateToggle("setting__tts-enabled", "setting_tts_enabled")
        document.querySelector("#placeholder-setting__autoplay-enabled").innerHTML = templateToggle("setting__autoplay-enabled", "setting_autoplay_enabled")
        document.querySelector("#placeholder-setting__note-names").innerHTML = templateSetting("note-names", "setting_title_note_names")
        this._elemSettingNoteNamesFormatLabel = document.querySelector("#label_setting__note-names")
        this._elemSettingNoteNamesFormatValue = document.querySelector("#setting__note-names")
    }

    _bindViewModel() {
        this._viewModel.scaleName.observer = (scaleName) => this._scaleView.displayScaleName(scaleName)
        this._viewModel.scaleImage.observer = (scaleImage) => this._scaleView.displayScaleImage(scaleImage)
        this._viewModel.isPlayingState.observer = (isPlayingState) => this._controlsView.setPlayingState(isPlayingState)
        this._viewModel.noteNameFormatDisplayValue.observer = (newValue) => {
            this._elemSettingNoteNamesFormatValue.innerText = newValue
        }

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
            this._elemSettingNoteNamesFormatLabel.onclick = () => this._displayNoteNamesFormatSetting()
            this._elemSettingNoteNamesFormatValue.onclick = () => this._displayNoteNamesFormatSetting()
        })
    }
    _displayNoteNamesFormatSetting = () => this._displayOptionsSetting(this._viewModel.getNoteNameFormatRadioGroup())

    _displayOptionsSetting(radioGroup) {
        this._elemPlaceHolderOptionsSettingDialog.innerHTML =
            this._createOptionsSettingDialogHtml(radioGroup)
        this._viewModel.i18n.translateElement(this._elemPlaceHolderOptionsSettingDialog)
        const dialog = new mdc.dialog.MDCDialog(this._elemPlaceHolderOptionsSettingDialog.querySelector(".mdc-dialog"))
        dialog.open()
        radioGroup.items.forEach((item) => {
            console.log("for each " + JSON.stringify(item))
            const radioControl = new mdc.radio.MDCRadio(this._elemPlaceHolderOptionsSettingDialog.querySelector(`#${item.id}__mdc-radio`))
            const formField = new mdc.formField.MDCFormField(this._elemPlaceHolderOptionsSettingDialog.querySelector(`#${item.id}__mdc-form-field`))
            radioControl.checked = radioGroup.initialValue == item.value
            formField.input = radioControl
            console.log("radioControl " + radioControl + " for item " + item)
            radioControl.listen("change", (e) => {
                console.log(item.label + ": " + radioControl.checked)
                if (radioControl.checked) radioGroup.listener(item.value)
            })
        })
    }
    _createOptionsSettingDialogHtml = (radioGroup) => templateDialog(radioGroup.id, radioGroup.title, this._createRadioGroupHtml(radioGroup), "")
    _createRadioGroupHtml = (radioGroup) => radioGroup.items.map((item) => templateRadio(radioGroup.groupId, item.id, item.label)).join("")
}