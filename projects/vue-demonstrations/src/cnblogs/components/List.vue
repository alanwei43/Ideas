<template>
  <div>
    <ol>
      <li v-for="item in news" :key="item.link">
        <a href="javascript:void(0)" @click="showDetail(item)">{{item.title}}</a>
      </li>
    </ol>
    <button @click="loadNextPage">Next Page -> {{page + 1}}</button>
  </div>
</template>

<script>
import { getNewsList } from "../services/news";
export default {
  data() {
    return {
      page: 0,
      news: []
    };
  },
  mounted() {
    console.log("list.vue mounted");
    this.loadNextPage();
  },
  methods: {
    loadNextPage() {
      getNewsList(++this.page)
        .then(response => {
          this.news = this.news.concat(response);
        })
        .catch(e => {
          console.warn(`第${this.page}页数据加载失败: `, e);
        });
    },
    showDetail(item) {
      this.$emit("show-detail", item);
    }
  },
  filters: {
    transferDetailLink(item) {
      return `/detail?link=${item.link}`;
    }
  }
};
</script>
