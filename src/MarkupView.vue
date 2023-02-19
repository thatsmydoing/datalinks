<script>
import {h} from 'vue';
import {asHtml} from './markup';

export default {
  data() {
    return {
      viewSource: false
    }
  },
  props: {
    text: String
  },
  created() {
    window.addEventListener('keyup', this.keyHandle);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.keyHandle);
  },
  methods: {
    keyHandle(event) {
      if(event.keyCode == 83) {
        this.viewSource = !this.viewSource;
      }
    }
  },
  render() {
    if (this.viewSource) {
      return h('pre', { class: 'markup' }, this.text);
    } else {
      return asHtml(this.text);
    }
  }
}
</script>
