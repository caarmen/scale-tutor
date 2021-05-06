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
class VolumeView {
    constructor() {
        this.onVolumeChanged = (newVolume) => { }
        this._mdcSlider
    }

    initViews() {
        const elemPlaceholderVolumeControl = document.querySelector("#placeholder-volume-control")
        elemPlaceholderVolumeControl.innerHTML = templateSlider("volume", "volume_label", "volume_mute", "volume_up")
        this._mdcSlider = new mdc.slider.MDCSlider(elemPlaceholderVolumeControl.querySelector("#volume"))
        this._mdcSlider.listen('MDCSlider:input', (e) => this.onVolumeChanged(e.detail.value))
        setTimeout(() => {this._mdcSlider.layout()}, 1000)
    }

    setVolume(newVolume) {
        if (newVolume != this._mdcSlider.getValue()) this._mdcSlider.setValue(newVolume)
    }
}