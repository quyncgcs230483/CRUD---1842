<template>
  <div id="app">
    <div class="ui inverted segment navbar" 
         v-if="isAuthenticated && $route.name !== 'login' && $route.name !== 'register'">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <router-link :to="{ name: 'About' }" class="item">About Us
          </router-link>
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <a class="item" @click="logout">
             <i class="sign out alternate icon"></i> Logout
          </a>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
    logout() {
      localStorage.removeItem('token');
      this.checkAuth();
      this.$router.push('/login');
      this.flash('Logged out successfully', 'success');
    }
  },
  mounted() {
    this.checkAuth();
  },
  watch: {
    $route() {
      this.checkAuth();
    }
  }
};
</script>

<style>
#app > .navbar {
  margin-bottom: 1.5em;
}

.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}

input {
  width: 300px;
}

label {
  width: 100px;
}

div.input {
  margin-bottom: 10px;
}

button.ui.button {
  margin-top: 15px;
  display: block;
}
</style>
