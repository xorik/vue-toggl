import Vue from 'vue'
import globalSettings from './Settings'

const BASEURL = 'https://www.toggl.com/api/v8'

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

  getWorkspaces (token) {
    return Vue.http.get(`${BASEURL}/me`, this._config(token))
      .then(response => response.body.data.workspaces)
  }

  getProjects (workspaceId, token) {
    return Vue.http.get(`${BASEURL}/workspaces/${workspaceId}/projects`, this._config(token))
      .then(response => response.body)
  }
}

export default new TogglApi(globalSettings)
