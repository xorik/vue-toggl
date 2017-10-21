<template lang="pug">
    div
        modal(v-model="showModal" title="Settings" @hide="onHide")
            .form-group
                label Toggl API token
                input.form-control(v-model="settingsData.apiKey" @change="updateWorkspaces")

            workspaces(v-model="settingsData.workspace" :list="workspaces" @input="updateProjects")

            projects(v-model="settingsData.projects" :list="projects")

        button.btn.btn-primary(@click="open") Settings
</template>

<script>
import { Modal } from 'uiv'
import gloabalSettings from '@/services/Settings'
import togglApi from '@/services/TogglApi'
import Workspaces from './Workspaces'
import Projects from './Projects'

export default {
  data () {
    return {
      showModal: false,
      settingsData: gloabalSettings.data,
      workspaces: [],
      projects: null
    }
  },
  methods: {
    open () {
      this.settingsData = gloabalSettings.data
      this.showModal = true
    },
    onHide (value) {
      if (value === 'ok') {
        gloabalSettings.data = this.settingsData
      }
    },
    updateWorkspaces () {
      togglApi.getWorkspaces(this.settingsData.apiKey).then(list => {
        this.workspaces = list
        this.updateProjects()
      }, response => {
        // TODO: display error
        console.log('TOGGL API ERROR', response)
        this.workspaces = []
      })
    },
    updateProjects () {
      togglApi.getProjects(this.settingsData.workspace, this.settingsData.apiKey).then(list => {
        this.projects = list
      })
    }
  },
  created: function () {
    this.updateWorkspaces()
  },
  components: {
    modal: Modal,
    workspaces: Workspaces,
    projects: Projects
  }
}
</script>
