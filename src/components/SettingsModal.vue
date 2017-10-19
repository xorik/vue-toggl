<template lang="pug">
    div
        modal(v-model="showModal" title="Settings" @hide="onHide")
            .form-group(v-if="settingsData")
                label Toggl API token
                input.form-control(type="password" v-model="settingsData.apiKey")
        button.btn.btn-primary(@click="open") Settings
</template>

<script>
import { Modal } from 'uiv'
import gloabalSettings from '@/services/Settings'

export default {
  data () {
    return {
      showModal: false,
      settingsData: null
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
    }
  },
  components: {
    modal: Modal
  }
}
</script>
