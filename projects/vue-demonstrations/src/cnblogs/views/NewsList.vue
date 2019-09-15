<template>
  <div>
    <div @click="tab = 'list'" v-if="tab !== 'list'">show list</div>
    <div v-show="tab === 'list'">
      <list @show-detail="onShowDetail" />
    </div>
    <div v-show="tab === 'detail'">
      <detail :news="news" />
    </div>
  </div>
</template>

<script>
import List from "../components/List";
import Detail from "../components/Detail";
export default {
  data() {
    return {
      tab: "list",
      news: {}
    };
  },
  methods: {
    onShowDetail(item) {
      this.tab = "detail";
      this.news = item;
    }
  },
  components: {
    list: List,
    detail: Detail
  }
};
</script>
