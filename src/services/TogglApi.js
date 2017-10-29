import Vue from 'vue'
import globalSettings from './Settings'

const BASEURL = 'https://www.toggl.com/api/v8'
const REPORTS_BASEURL = 'https://toggl.com/reports/api/v2'
const USERAGENT = 'xor29a@bk.ru'

class TogglApi {
  constructor (settings) {
    this.settings = settings
    this.uid = null
  }

  _config (token = null, params = null) {
    const requestToken = (token !== null) ? token : this.settings.data.apiKey
    const auth = btoa(requestToken + ':api_token')

    return {
      headers: {
        Authorization: 'Basic ' + auth
      },
      params
    }
  }

  getUid () {
    return this.uid
  }

  getWorkspaces (token) {
    return Vue.http.get(`${BASEURL}/me`, this._config(token))
      .then(response => {
        this.uid = response.body.data.id

        return response.body.data.workspaces
      })
  }

  getProjects (workspaceId, token) {
    return Vue.http.get(`${BASEURL}/workspaces/${workspaceId}/projects`, this._config(token))
      .then(response => response.body)
  }

  getLog (start, end) {
    const settings = this.settings.data

    const params = {
      user_agent: USERAGENT,
      workspace_id: settings.workspace,
      user_ids: settings.uid,
      project_ids: settings.projects.join(','),
      since: start,
      until: end
    }

    return Vue.http.get(`${REPORTS_BASEURL}/details`, this._config(null, params))
      .then(response => {
        response = response.body

        const perPage = response.per_page
        const total = response.total_count

        // We've got everything
        if (total <= perPage) {
          return response.data
        }

        let promises = []
        let current = perPage
        let page = 2

        // Prepare promises for extra pages
        while (current < total) {
          let newParams = Object.assign({page: page}, params)

          promises.push(
            Vue.http.get(`${REPORTS_BASEURL}/details`, this._config(null, newParams))
          )

          current += perPage
          page++
        }

        return Vue.Promise.all(promises)
          .then(responses => {
            let data = response.data

            responses.forEach(v => {
              data = data.concat(v.body.data)
            })

            return data
          })
      })
  }
}

export default new TogglApi(globalSettings)
