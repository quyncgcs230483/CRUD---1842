<template>
  <div class="ui container about-page">
    <h1 class="ui header">Welcome to our dictionary app!</h1>
    
    <p v-if="userName" class="welcome-message">
      Hello, <span class="user-name">{{ userName }}</span>!
    </p>
    
    <div class="ui segment">
      <p>
        This is a simple dictionary app that helps you easily manage your vocabulary. You can add, edit, and delete words with their English, German, and Spanish vocabulary.
      </p>
      <p>
        The goal of the app is to provide a simple but effective tool for learning and reviewing vocabulary, helping you conveniently improve your language skills. Start exploring and building your own vocabulary now!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      userName: 'friend' 
    };
  },
  mounted() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.userName = storedUsername;
    }
  }
};
</script>

<style scoped>
.about-page {
  margin-top: 50px;
  padding: 20px;
}

.welcome-message {
  font-size: 1.5em;
  font-weight: bold;
}

.user-name {
  color: #2185d0; 
}

.ui.segment {
  font-size: 1.1em;
  line-height: 1.6;
}
</style>