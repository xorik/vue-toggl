<template lang="pug">
    .form-group
        label Toggl workspace
        select.form-control(v-model="workspace" @change="onChanged")
            option(disabled selected) - Select workspace -
            option(v-for="option in list" :value="option.id") {{option.name}}
</template>

<script>
  export default {
    props: ['value', 'list'],
    data () {
      return {
        workspace: this.value
      }
    },
    methods: {
      onChanged () {
        this.$emit('input', this.workspace)
      }
    }
  }
</script>
