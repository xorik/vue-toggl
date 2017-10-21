<template lang="pug">
    div
        modal(v-model="showModal" title="Settings" @hide="onHide")
            .form-group
                label Toggl API token
                input.form-control(v-model="settingsData.apiKey" @change="updateWorkspaces")

            workspaces(v-model="settingsData.workspace" :list="workspaces")

        button.btn.btn-primary(@click="open") Settings
</template>

<script>
import { Modal } from 'uiv'
import gloabalSettings from '@/services/Settings'
import togglApi from '@/services/TogglApi'
import Workspaces from './Workspaces'

export default {
  data () {
    return {
      showModal: false,
      settingsData: gloabalSettings.data,
      workspaces: []
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
      }, response => {
        // TODO: display error
        console.log('TOGGL API ERROR', response)
        this.workspaces = []
      })
    }
  },
  created: function () {
    this.updateWorkspaces()
  },
  components: {
    modal: Modal,
    workspaces: Workspaces
  }
}
</script>
