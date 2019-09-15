<template>
  <div>
    <div>
      <label>
        邮箱:
        <input type="text" v-model="user.email" />
      </label>
    </div>
    <div>
      <label>
        密码:
        <input type="password" v-model="user.password" />
      </label>
    </div>
    <div>
      <button @click="doLogin">登陆</button>
    </div>
    <h3>Profile</h3>
    <div>
      <div>Id: {{profile.id}}</div>
      <div>昵称: {{profile.nickName}}</div>
    </div>
    <h3>Books</h3>
    <div>
      <ol>
        <li v-for="book in ebooks" :key="book.isbn">
          <img :src="book | cover" />
          <div>{{book.name}}</div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import { login, getProfile, selfEbooks } from "../services/user";
export default {
  data() {
    return {
      user: {
        email: undefined,
        password: undefined
      },
      token: {
        accessToken: undefined
      },
      profile: {},
      ebooks: []
    };
  },
  methods: {
    doLogin() {
      login(this.user.email, this.user.password).then(data => {
        this.token = data;
        this.loadProfile();
        this.loadEbooks();
      });
    },
    loadProfile() {
      getProfile(this.token.accessToken).then(data => (this.profile = data));
    },
    loadEbooks() {
      selfEbooks(this.token.accessToken).then(
        data => (this.ebooks = data.bookItems)
      );
    }
  },
  filters: {
    cover(book) {
      return `https://file.ituring.com.cn/SmallCover/${book.coverKey}?x-referrer-url=https%3A%2F%2Fm.ituring.com.cn%2Fuser%2Fowe-book`;
    }
  }
};
</script>