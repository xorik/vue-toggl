<template lang="pug">
    .progress
        span(:style="computedStyle")
            progress-bar-stack(v-model="progressValue" label="true" :labelText="progressTitle")
</template>

<script>
import ProgressBarStack from './ProgressBarStack.vue'
import ProgressColor from './ProgressColor'

export default {
  props: ['value'],
  computed: {
    progressValue () {
      return this.value * 100
    },
    progressTitle () {
      return (this.value * 100).toFixed(1) + '%'
    },
    computedStyle () {
      return {
        backgroundColor: ProgressColor(this.value)
      }
    }
  },
  components: {
    'progress-bar-stack': ProgressBarStack
  }
}
</script>
