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
class RadioSettingView {
    constructor(i18n, elemDialogPlaceholder) {
        this._i18n = i18n
        this._elemDialogPlaceholder = elemDialogPlaceholder
    }

    bindRadioSetting(settingId, valueObservableField, radioGroupCreatorFunc) {
        const elemSetting = document.querySelector(`#setting__${settingId}`)
        const elemSettingLabel = document.querySelector(`#label_setting__${settingId}`)
        const elemSettingValue = document.querySelector(`#value_setting__${settingId}`)
        elemSetting.onclick = () => this._displayRadioOptionsSetting(radioGroupCreatorFunc())
        elemSettingLabel.onclick = () => this._displayRadioOptionsSetting(radioGroupCreatorFunc())
        elemSettingValue.onclick = () => this._displayRadioOptionsSetting(radioGroupCreatorFunc())
        valueObservableField.observer = (newValue) => elemSettingValue.innerText = newValue
    }
    _displayRadioOptionsSetting(radioGroup) {
        this._elemDialogPlaceholder.innerHTML =
            this._createRadioOptionsSettingDialogHtml(radioGroup)
        this._i18n.translateElement(this._elemDialogPlaceholder)
        const dialog = new mdc.dialog.MDCDialog(this._elemDialogPlaceholder.querySelector(".mdc-dialog"))
        dialog.open()
        radioGroup.items.forEach((item) => {
            const radioControl = new mdc.radio.MDCRadio(this._elemDialogPlaceholder.querySelector(`#${item.id}__mdc-radio`))
            const formField = new mdc.formField.MDCFormField(this._elemDialogPlaceholder.querySelector(`#${item.id}__mdc-form-field`))
            radioControl.checked = radioGroup.initialValue == item.value
            formField.input = radioControl
            radioControl.listen("change", (e) => {
                if (radioControl.checked) radioGroup.listener(item.value)
            })
        })
    }
    _createRadioOptionsSettingDialogHtml = (radioGroup) => templateDialog(radioGroup.id, radioGroup.title, this._createRadioGroupHtml(radioGroup), "")
    _createRadioGroupHtml = (radioGroup) => radioGroup.items.map((item) => templateRadio(radioGroup.groupId, item.id, item.label)).join("")

}