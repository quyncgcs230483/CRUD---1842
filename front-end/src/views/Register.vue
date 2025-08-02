<template>
  <div class="register-wrapper">
  <div class="register ui raised very padded text container segment">
    <h2 class="ui header center aligned">Register</h2>
    
    <div class="ui form">
      <div class="field">
        <label>Username</label>
        <input v-model="username" placeholder="Username" />
      </div>

      <div class="field">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Password" />
      </div>

      <button class="ui primary fluid button" @click="register">Register</button>
    </div>

    <div v-if="message" :class="messageClass" style="margin-top: 1em;">
      {{ message }}
    </div>
    <div style="margin-top: 1em; text-align: center;">
      <router-link to="/login">Already have an account? Login here</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      message: '',
      success: false
    };
  },
  computed: {
    messageClass() {
      return this.success ? 'ui green message' : 'ui red message';
    }
  },
  methods: {
    async register() {
      try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          this.success = false;
          throw new Error(data.error || 'Register failed');
        }

        this.success = true;
        this.message = 'Register successful! Redirecting to login...';
        setTimeout(() => this.$router.push('/login'), 1500);
      } catch (err) {
        this.success = false;
        this.message = err.message;
      }
    }
  }
};
</script>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.register {
  width: 100%;
  max-width: 400px;
}
</style>
