<template>
  <div class="login-wrapper">
    <div class="login ui raised very padded text container segment">
      <h2 class="ui header center aligned">Login</h2>
      
      <div class="ui form">
        <div class="field">
          <label>Username</label>
          <input v-model="username" placeholder="Username" />
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Password" />
        </div>

        <button class="ui primary fluid button" @click="login">Login</button>
      </div>

      <div v-if="message" class="ui red message" style="margin-top: 1em;">
        {{ message }}
      </div>

      <div style="margin-top: 1em; text-align: center;">
        <router-link to="/register">Don't have an account? Register here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('username', this.username); 

        this.$router.push('/about');
      } catch (err) {
        this.message = err.message;
      }
    }
  }
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login {
  width: 50%;
  max-width: 200px;
}
</style>
