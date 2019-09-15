<template>
  <div style="margin: 0 auto; width: 90%">
    <div v-html="newsHtml"></div>
  </div>
</template>
<style>
img {
  display: inline-block;
  margin: 5px auto;
  width: 90%;
}
</style>
<script>
import { getNewsDetail } from "../services/news";
export default {
  props: ["news"],
  data() {
    return {
      newsHtml: ""
    };
  },
  methods: {
    loadDetail() {
      if (!this.news.link) {
        return;
      }
      getNewsDetail(this.news.link)
        .then(response => {
          this.newsHtml = response;
        })
        .catch(e => {
          alert("error: " + e.message);
        });
    }
  },
  watch: {
    "news.link"() {
      this.loadDetail();
    }
  }
};
</script>