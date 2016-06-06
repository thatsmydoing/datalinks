<template>
  <div class="info-panel">
    <markup-view :text="item.text"></markup-view>
  </div>
</template>

<script>
import ViewMixin from './ViewMixin'

export default {
  mixins: [ ViewMixin ]
}
</script>
