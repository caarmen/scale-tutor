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

        this._scaleView = new ScaleView()
        this._controlsView = new ControlsView(this._viewModel.i18n)

        this._initViews()
        this._bindViewModel()
    }

    _initViews() {
        this._viewModel.i18n.translateElement(document.documentElement)
        this._controlsView.initViews()
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
}