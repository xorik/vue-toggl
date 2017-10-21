import Vue from 'vue'
import globalSettings from './Settings'

class TogglApi {
  constructor (settings) {
    this.settings = settings
  }

  _config (token = null) {
    const requestToken = (token !== null) ? token : this.settings.data.apiKey
    const auth = btoa(requestToken + ':api_token')

    return {
      headers: {
        Authorization: 'Basic ' + auth
      }
    }
  }

  getWorkspaces (token = null) {
    return Vue.http.get('https://www.toggl.com/api/v8/me', this._config(token))
      .then(response => response.body.data.workspaces)
  }

  getProjects (token = null) {

  }
}

export default new TogglApi(globalSettings)
