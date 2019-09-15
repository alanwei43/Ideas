import Vue from "vue"
import Router from "vue-router"
import NewsList from "./views/NewsList";

Vue.use(Router)

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "news-list",
      component: NewsList
    }
  ]
})
