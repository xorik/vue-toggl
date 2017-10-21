<template lang="pug">
    div
        b Projects
        br
        .checkbox(v-for="project in list")
            label
                input(type="checkbox" :value="project.id" v-model="checkboxes" @change="onChange")
                | {{ project.name }}
</template>

<script>
  export default {
    props: ['value', 'list'],
    data () {
      return {
        checkboxes: this.value
      }
    },
    methods: {
      onChange: function () {
        this.$emit('input', this.checkboxes)
      }
    },
    watch: {
      list: function (newValue, oldValue) {
        console.log(newValue, oldValue)
        if (oldValue !== null) {
          this.checkboxes = []
          this.onChange()
        }
      }
    }
  }
</script>
