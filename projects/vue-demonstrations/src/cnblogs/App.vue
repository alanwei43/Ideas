<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
#app {
  width: 100%;
  overflow: hidden;
}
nav {
  background-color: #0094ff;
  height: 30px;
  line-height: 30px;
}
nav a {
  color: white;
  display: inline-block;
  width: 49%;
  text-align: center;
  text-decoration: unset;
}
.full-btn {
  width: 90%;
  margin: 5px auto;
  display: block;
  height: 30px;
  line-height: 30px;
  background-color: #0094ff;
  color: white;
  border: none;
  box-shadow: 3px 3px 5px #ddd;
  border-radius: 20px;
  text-align: center;
}
.news-list li {
  margin: 10px auto;
  display: block;
  width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: blue;
  font-size: 16px;
}
</style>
