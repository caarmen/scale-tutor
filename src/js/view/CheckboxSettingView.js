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
class CheckboxSettingView {
    constructor(i18n, elemDialogPlaceholder) {
        this._i18n = i18n
        this._elemDialogPlaceholder = elemDialogPlaceholder
    }

    bindCheckboxSetting(settingId, valueObservableField, checkboxGroupCreatorFunc) {
        const elemSetting = document.querySelector(`#setting__${settingId}`)
        const elemSettingLabel = document.querySelector(`#label_setting__${settingId}`)
        const elemSettingValue = document.querySelector(`#value_setting__${settingId}`)
        elemSetting.onclick = () => this._displayCheckboxOptionsSetting(checkboxGroupCreatorFunc())
        elemSettingLabel.onclick = () => this._displayCheckboxOptionsSetting(checkboxGroupCreatorFunc())
        elemSettingValue.onclick = () => this._displayCheckboxOptionsSetting(checkboxGroupCreatorFunc())
        valueObservableField.observer = (newValue) => elemSettingValue.innerText = newValue
    }
    _createCheckboxGroupHtml = (checkboxGroup) => checkboxGroup.items.map((item) => templateCheckbox(item.id, item.label)).join("")
    _createCheckboxOptionsSettingDialogHtml = (checkboxGroup) => templateDialog(checkboxGroup.id, checkboxGroup.title, this._createCheckboxGroupHtml(checkboxGroup), "")
    _displayCheckboxOptionsSetting(checkboxGroup) {
        this._elemDialogPlaceholder.innerHTML =
            this._createCheckboxOptionsSettingDialogHtml(checkboxGroup)
        this._i18n.translateElement(this._elemDialogPlaceholder)
        const dialog = new mdc.dialog.MDCDialog(this._elemDialogPlaceholder.querySelector(".mdc-dialog"))
        dialog.open()
        checkboxGroup.items.forEach((item) => {
            const checkboxControl = new mdc.checkbox.MDCCheckbox(this._elemDialogPlaceholder.querySelector(`#${item.id}__mdc-checkbox`));
            const formField = new mdc.formField.MDCFormField(this._elemDialogPlaceholder.querySelector(`#${item.id}__mdc-form-field`))
            checkboxControl.checked = checkboxGroup.initialValues.includes(item.value)
            item.checked = checkboxControl.checked
            formField.input = checkboxControl
            checkboxControl.listen("change", (e) => {
                item.checked = checkboxControl.checked
                checkboxGroup.listener(checkboxGroup.items.filter((checkboxItem) => checkboxItem.checked).map((checkboxItem) => checkboxItem.value))
            })
        })
    }

}