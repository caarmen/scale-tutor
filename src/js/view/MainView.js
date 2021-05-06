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
        this._elemPlaceholderAboutDialog = document.querySelector("#placeholder-about-dialog")
        this._scaleView = new ScaleView()
        this._controlsView = new ControlsView(this._viewModel.i18n)
        this._settingsView = new SettingsView(this._viewModel)
        this._volumeView = new VolumeView()

        this._initViews()
        this._bindViewModel()
        this._setThemeColorMeta()
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => { this._setThemeColorMeta() });
    }

    _initViews() {
        this._controlsView.initViews()
        this._settingsView.initViews()
        this._volumeView.initViews()
        this._elemButtonAbout.onclick = () => this._showAbout()
        this._elemButtonSettings.onclick = () => this._settingsView.show()
        this._viewModel.i18n.translateElement(document.documentElement)
    }

    _bindViewModel() {
        this._viewModel.scaleName.observer = (scaleName) => this._scaleView.displayScaleName(scaleName)
        this._viewModel.scaleImage.observer = (scaleImage) => this._scaleView.displayScaleImage(scaleImage)
        this._viewModel.isPlayingState.observer = (isPlayingState) => this._controlsView.setPlayingState(isPlayingState)

        this._controlsView.onStopListener = () => this._viewModel.stop()
        this._controlsView.onStartListener = () => this._viewModel.play()
        this._controlsView.onPrevListener = () => this._viewModel.prev()
        this._controlsView.onNextListener = () => this._viewModel.next()

        this._volumeView.onVolumeChanged = (newVolume) => this._viewModel.setVolume(newVolume)
        this._volumeView.setVolume(this._viewModel.getVolume())
    }

    _showAbout() {
        this._elemPlaceholderAboutDialog.innerHTML = templateDialog("dialog__about", "app_name", templateAbout)
        this._viewModel.i18n.translateElement(this._elemPlaceholderAboutDialog)
        const dialog = new mdc.dialog.MDCDialog(this._elemPlaceholderAboutDialog.querySelector(".mdc-dialog"))
        dialog.open()
    }

    _setThemeColorMeta() {
        const style = getComputedStyle(document.documentElement)
        const themeColor = style.getPropertyValue("--mdc-theme-primary").trim()
        document.querySelector('meta[name="theme-color"]').setAttribute("content", themeColor);
    }
}