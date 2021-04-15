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

        this._elemButtonAbout = document.querySelector("#button-about")
        this._elemButtonSettings = document.querySelector("#button-settings")
        this._scaleView = new ScaleView()
        this._controlsView = new ControlsView(this._viewModel.i18n)

        this._elemPlaceHolderOptionsSettingDialog = document.querySelector("#placeholder-options-setting-dialog")
        this._mdcDialog

        this._elemSettingNoteNamesFormatLabel
        this._elemSettingNoteNamesFormatValue
        this._initViews()
        this._bindViewModel()
        this._setThemeColorMeta()
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => { this._setThemeColorMeta() });
    }

    _initViews() {
        this._controlsView.initViews()
        this._elemButtonAbout.onclick = () => this._showAbout()
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
        document.querySelector("#placeholder-setting__clef").innerHTML = templateSetting("clef", "setting_title_clef")
        document.querySelector("#placeholder-setting__order").innerHTML = templateSetting("order", "setting_title_order")
        document.querySelector("#placeholder-setting__octaves").innerHTML = templateSetting("octaves", "setting_title_octaves")
        document.querySelector("#placeholder-setting__minor_scale_shift").innerHTML = templateSetting("minor_scale_shift", "setting_title_minor_scale_shift")
        document.querySelector("#placeholder-setting__transposition").innerHTML = templateSetting("transposition", "setting_title_transposition")
        document.querySelector("#placeholder-setting__tempo").innerHTML = templateSetting("tempo", "setting_title_tempo")
        document.querySelector("#placeholder-setting__scale_types").innerHTML = templateSetting("scale_types", "setting_title_scale_types")
        this._bindRadioSetting("note-names", this._viewModel.noteNameFormatDisplayValue, () => this._viewModel.getNoteNameFormatRadioGroup())
        this._bindRadioSetting("clef", this._viewModel.clefDisplayValue, () => this._viewModel.getClefRadioGroup())
        this._bindRadioSetting("order", this._viewModel.orderDisplayValue, () => this._viewModel.getOrderRadioGroup())
        this._bindRadioSetting("octaves", this._viewModel.octavesDisplayValue, () => this._viewModel.getOctavesRadioGroup())
        this._bindRadioSetting("minor_scale_shift", this._viewModel.minorScaleShiftDisplayValue, () => this._viewModel.getMinorScaleShiftRadioGroup())
        this._bindRadioSetting("transposition", this._viewModel.transpositionDisplayValue, () => this._viewModel.getTranspositionRadioGroup())
        this._bindRadioSetting("tempo", this._viewModel.tempoDisplayValue, () => this._viewModel.getTempoRadioGroup())
        this._bindCheckboxSetting("scale_types", this._viewModel.scaleTypesDisplayValue, () => this._viewModel.getScaletypesCheckboxGroup())
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

    _showAbout() {
        this._elemPlaceHolderOptionsSettingDialog.innerHTML = templateDialog("dialog__about", "app_name", templateAbout)
        this._viewModel.i18n.translateElement(this._elemPlaceHolderOptionsSettingDialog)
        const dialog = new mdc.dialog.MDCDialog(this._elemPlaceHolderOptionsSettingDialog.querySelector(".mdc-dialog"))
        dialog.open()
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
        })
    }

    _bindRadioSetting(settingId, valueObservableField, radioGroupCreatorFunc) {
        const elemSettingLabel = document.querySelector(`#label_setting__${settingId}`)
        const elemSettingValue = document.querySelector(`#setting__${settingId}`)
        elemSettingLabel.onclick = () => this._displayRadioOptionsSetting(radioGroupCreatorFunc())
        elemSettingValue.onclick = () => this._displayRadioOptionsSetting(radioGroupCreatorFunc())
        valueObservableField.observer = (newValue) => elemSettingValue.innerText = newValue
    }
    _displayNoteNamesFormatSetting = () => this._displayRadioOptionsSetting(this._viewModel.getNoteNameFormatRadioGroup())

    _displayRadioOptionsSetting(radioGroup) {
        this._elemPlaceHolderOptionsSettingDialog.innerHTML =
            this._createRadioOptionsSettingDialogHtml(radioGroup)
        this._viewModel.i18n.translateElement(this._elemPlaceHolderOptionsSettingDialog)
        const dialog = new mdc.dialog.MDCDialog(this._elemPlaceHolderOptionsSettingDialog.querySelector(".mdc-dialog"))
        dialog.open()
        radioGroup.items.forEach((item) => {
            const radioControl = new mdc.radio.MDCRadio(this._elemPlaceHolderOptionsSettingDialog.querySelector(`#${item.id}__mdc-radio`))
            const formField = new mdc.formField.MDCFormField(this._elemPlaceHolderOptionsSettingDialog.querySelector(`#${item.id}__mdc-form-field`))
            radioControl.checked = radioGroup.initialValue == item.value
            formField.input = radioControl
            radioControl.listen("change", (e) => {
                if (radioControl.checked) radioGroup.listener(item.value)
            })
        })
    }
    _createRadioOptionsSettingDialogHtml = (radioGroup) => templateDialog(radioGroup.id, radioGroup.title, this._createRadioGroupHtml(radioGroup), "")
    _createRadioGroupHtml = (radioGroup) => radioGroup.items.map((item) => templateRadio(radioGroup.groupId, item.id, item.label)).join("")

    _bindCheckboxSetting(settingId, valueObservableField, checkboxGroupCreatorFunc) {
        const elemSettingLabel = document.querySelector(`#label_setting__${settingId}`)
        const elemSettingValue = document.querySelector(`#setting__${settingId}`)
        elemSettingLabel.onclick = () => this._displayCheckboxOptionsSetting(checkboxGroupCreatorFunc())
        elemSettingValue.onclick = () => this._displayCheckboxOptionsSetting(checkboxGroupCreatorFunc())
        valueObservableField.observer = (newValue) => elemSettingValue.innerText = newValue
    }
    _createCheckboxGroupHtml = (checkboxGroup) => checkboxGroup.items.map((item) => templateCheckbox(item.id, item.label)).join("")
    _createCheckboxOptionsSettingDialogHtml = (checkboxGroup) => templateDialog(checkboxGroup.id, checkboxGroup.title, this._createCheckboxGroupHtml(checkboxGroup), "")
    _displayCheckboxOptionsSetting(checkboxGroup) {
        this._elemPlaceHolderOptionsSettingDialog.innerHTML =
            this._createCheckboxOptionsSettingDialogHtml(checkboxGroup)
        this._viewModel.i18n.translateElement(this._elemPlaceHolderOptionsSettingDialog)
        const dialog = new mdc.dialog.MDCDialog(this._elemPlaceHolderOptionsSettingDialog.querySelector(".mdc-dialog"))
        dialog.open()
        checkboxGroup.items.forEach((item) => {
            const checkboxControl = new mdc.checkbox.MDCCheckbox(this._elemPlaceHolderOptionsSettingDialog.querySelector(`#${item.id}__mdc-checkbox`));
            const formField = new mdc.formField.MDCFormField(this._elemPlaceHolderOptionsSettingDialog.querySelector(`#${item.id}__mdc-form-field`))
            checkboxControl.checked = checkboxGroup.initialValues.includes(item.value)
            item.checked = checkboxControl.checked
            formField.input = checkboxControl
            checkboxControl.listen("change", (e) => {
                item.checked = checkboxControl.checked
                checkboxGroup.listener(checkboxGroup.items.filter((checkboxItem)=>checkboxItem.checked).map((checkboxItem) => checkboxItem.value))
            })
        })
    }

    _setThemeColorMeta() {
        const style = getComputedStyle(document.documentElement)
        const themeColor = style.getPropertyValue("--mdc-theme-primary").trim()
        document.querySelector('meta[name="theme-color"]').setAttribute("content", themeColor);
    }
}