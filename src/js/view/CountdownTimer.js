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
class CountdownTimer {
    constructor() {
        this._elem
        this._intervalId = undefined
    }
    initViews() {
        this._elem = document.querySelector("#countdown-timer")
    }

    reset = () => {
        this._elem.innerText = ""
        this._elem.style.display = "none"
        if (this._intervalId != undefined) {
            clearInterval(this._intervalId)
        }
    }

    start = (durationS) =>
        new Promise(completionFunc => {
            var remainingTimeS = durationS
            this._elem.style.display = "block"
            this._elem.innerText = remainingTimeS
            this._intervalId = setInterval(() => {
                remainingTimeS--
                this._elem.innerText = remainingTimeS
                if (remainingTimeS == 0) {
                    clearInterval(this._intervalId)
                    this._intervalId = undefined
                    this._elem.style.display = "none"
                    completionFunc()
                }
            }, 1000)
        })
}