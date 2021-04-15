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
class SettingsView {
    constructor(viewModel) {
        this._viewModel = viewModel
        this._elemPlaceHolderSettingDetailDialog = document.querySelector("#placeholder-setting-detail-dialog")

        this._mdcSettngsListDialog

        this._radioSettingView = new RadioSettingView(this._viewModel.i18n, this._elemPlaceHolderSettingDetailDialog)
        this._checkboxSettingView = new CheckboxSettingView(this._viewModel.i18n, this._elemPlaceHolderSettingDetailDialog)
    }

    initViews() {

        document.querySelector("#placeholder-settings-list-dialog").innerHTML = templateDialog("settings-list-dialog", "settings_title", templateSettings, "")
        document.querySelector("#placeholder-setting__tts-enabled").innerHTML = templateToggle("setting__tts-enabled", "setting_tts_enabled")
        document.querySelector("#placeholder-setting__autoplay-enabled").innerHTML = templateToggle("setting__autoplay-enabled", "setting_autoplay_enabled")
        document.querySelector("#placeholder-setting__note-names").innerHTML = templateSetting("note-names", "setting_title_note_names")
        document.querySelector("#placeholder-setting__clef").innerHTML = templateSetting("clef", "setting_title_clef")
        document.querySelector("#placeholder-setting__order").innerHTML = templateSetting("order", "setting_title_order")
        document.querySelector("#placeholder-setting__octaves").innerHTML = templateSetting("octaves", "setting_title_octaves")
        document.querySelector("#placeholder-setting__minor_scale_shift").innerHTML = templateSetting("minor_scale_shift", "setting_title_minor_scale_shift")
        document.querySelector("#placeholder-setting__transposition").innerHTML = templateSetting("transposition", "setting_title_transposition")
        document.querySelector("#placeholder-setting__tempo").innerHTML = templateSetting("tempo", "setting_title_tempo")
        document.querySelector("#placeholder-setting__scale_types").innerHTML = templateSetting("scale_types", "setting_title_scale_types")
        this._radioSettingView.bindRadioSetting("note-names", this._viewModel.noteNameFormatDisplayValue, () => this._viewModel.getNoteNameFormatRadioGroup())
        this._radioSettingView.bindRadioSetting("clef", this._viewModel.clefDisplayValue, () => this._viewModel.getClefRadioGroup())
        this._radioSettingView.bindRadioSetting("order", this._viewModel.orderDisplayValue, () => this._viewModel.getOrderRadioGroup())
        this._radioSettingView.bindRadioSetting("octaves", this._viewModel.octavesDisplayValue, () => this._viewModel.getOctavesRadioGroup())
        this._radioSettingView.bindRadioSetting("minor_scale_shift", this._viewModel.minorScaleShiftDisplayValue, () => this._viewModel.getMinorScaleShiftRadioGroup())
        this._radioSettingView.bindRadioSetting("transposition", this._viewModel.transpositionDisplayValue, () => this._viewModel.getTranspositionRadioGroup())
        this._radioSettingView.bindRadioSetting("tempo", this._viewModel.tempoDisplayValue, () => this._viewModel.getTempoRadioGroup())
        this._checkboxSettingView.bindCheckboxSetting("scale_types", this._viewModel.scaleTypesDisplayValue, () => this._viewModel.getScaletypesCheckboxGroup())

        this._mdcSettngsListDialog = new mdc.dialog.MDCDialog(document.querySelector('#settings-list-dialog'))
    }

    show() {
        this._mdcSettngsListDialog.open()
        this._mdcSettngsListDialog.listen('MDCDialog:opened', () => {
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
        })
    }

}