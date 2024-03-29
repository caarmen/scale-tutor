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
class SettingsAccess {
    constructor() {
        this._storage
        this._isAvailable = this.isStorageAvailable()
        this._observers = []
    }

    addObserver = (observer) => this._observers.push(observer)
    removeObserver(observer) {
        this._observers = this._observers.splice(this._observers.findIndex(observer), 1)
    }

    getSetting(key, defaultValue) {
        if (this._isAvailable) {
            const value = this._storage.getItem(key)
            return (value != undefined) ? value : defaultValue
        }
        return defaultValue
    }

    setSetting(key, value) {
        if (this._isAvailable) {
            const oldValue = this._storage.getItem(key)
            if (oldValue != value) {
                this._storage.setItem(key, value)
                this._observers.forEach((observer) => {
                    observer(key, value)
                })
            }
        }
    }

    removeSetting(key) {
        if (this._isAvailable) {
            this._storage.removeItem(key)
        }
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
    isStorageAvailable() {
        try {
            const x = '__storage_test__'
            this._storage = window.localStorage
            this._storage.setItem(x, x)
            this._storage.removeItem(x)
            return true
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (this._storage && this._storage.length !== 0)
        }
    }
}
