const STORAGE_KEY = 'settings'
const DEFAULT_SETTINGS = {
  apiKey: ''
}

class Settings {
  constructor () {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      this._data = JSON.parse(stored)
    } else {
      this._data = DEFAULT_SETTINGS
    }
  }

  get data () {
    return Object.assign({}, this._data)
  }

  set data (data) {
    this._data = data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export default new Settings()
