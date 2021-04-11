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
class ControlsView {
    constructor(i18n) {
        this._i18n = i18n
        this._elemButtonPrev
        this._elemButtonStartStop
        this._elemButtonNext
        this._isPlaying = false
        this.onPrevListener = () => { }
        this.onStartListener = () => { }
        this.onStopListener = () => { }
        this.onNextListener = () => { }
    }

    initViews() {
        this._elemButtonPrev = document.querySelector("#button-prev")
        this._elemButtonStartStop = document.querySelector("#button-start-stop")
        this._elemButtonNext = document.querySelector("#button-next")
        this._elemButtonPrev.onclick = () => this.onPrevListener()
        this._elemButtonNext.onclick = () => this.onNextListener()
        this._elemButtonStartStop.onclick = () => {
            if (this._isPlaying) {
                this.onStopListener()
                this.setPlayingState(false)
            } else {
                this.onStartListener()
                this.setPlayingState(true)
            }
        }
    }

    setPlayingState(isPlaying) {
        this._isPlaying = isPlaying
        this._elemButtonStartStop.innerText = isPlaying ? "stop" : "play_arrow"
        this._elemButtonStartStop.setAttribute("label-string-key", isPlaying ? "button_title_stop" : "button_title_start")
        this._i18n.translateElement(this._elemButtonStartStop.parentElement)
    }
}