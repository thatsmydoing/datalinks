import {getBySlug} from './lookup'

import MarkupView from './MarkupView.vue'
import ItemLink from './ItemLink.vue'

export default {
  components: {
    ItemLink,
    MarkupView
  },
  computed: {
    item() {
      return getBySlug(this.$route.name, this.$route.params.id);
    }
  }
}
