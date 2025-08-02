<template>
  <div class="ui container" style="max-width: 500px; margin-top: 2em;">
    <div v-if="currentWord">
      <p><strong>Definition:</strong> {{ currentWord.definition }}</p>

      <!-- English Input -->
      <div class="ui input" style="width: 100%;">
        <input
          type="text"
          placeholder="Type the English word..."
          v-model="userAnswer"
          @keyup.enter="checkAnswer"
          autocomplete="off"
          autofocus
        />
      </div>

      <!-- German Input -->
      <div class="ui input" style="width: 100%; margin-bottom: 1em;">
        <input
          type="text"
          placeholder="Type the German word..."
          v-model="userAnswerGerman"
          @keyup.enter="checkAnswer"
          autocomplete="off"
        />
      </div>

      <!-- Spanish Input -->
      <div class="ui input" style="width: 100%; margin-bottom: 1em;">
       <input
         type="text"
         placeholder="Type the Spanish word..."
         v-model="userAnswerSpanish"
         @keyup.enter="checkAnswer"
         autocomplete="off"
        />
      </div>


      <button class="ui primary button" style="margin-top: 1em;" @click="checkAnswer">Submit</button>

      <div v-if="feedback" class="ui message" :class="feedbackClass" style="margin-top: 1em;">
        {{ feedback }}
      </div>

      <p style="margin-top: 1em;">Score: {{ score }} / {{ total }}</p>
    </div>

    <div v-else class="ui message info">
      <p>Loading words or test completed...</p>
      <p v-if="words.length === 0">No words available. Please add some words first.</p>
    </div>
  </div>
</template>


<script>
import { api } from '../helpers/helpers';

export default {
  name: 'VocabTest',
  data() {
    return {
      words: [],
      currentWord: null,
      userAnswer: '',
      userAnswerGerman: '',
      userAnswerSpanish: '',
      score: 0,
      total: 0,
      feedback: '',
      feedbackClass: '',
      usedIndices: new Set(),
    };
  },
  async mounted() {
    try {
      this.words = await api.getWords();
      console.log('Loaded words:', this.words);
      if (this.words.length > 0) {
        this.nextWord();
        console.log('Current word:', this.currentWord);
      }
    } catch (error) {
      console.error('Failed to load words:', error);
    }
  }
  ,
  methods: {
      nextWord() {
      if (!this.words.length) {
        console.warn('No words available');
        this.currentWord = null;
        return;
      }

      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.currentWord = this.words[randomIndex];
      console.log('Next word:', this.currentWord);
      this.userAnswer = '';
      this.userAnswerGerman = '';
      this.userAnswerSpanish = '';
      this.feedback = '';
      this.feedbackClass = '';
      this.total++;
    },
    checkAnswer() {
  if (
    !this.userAnswer.trim() ||
    !this.userAnswerGerman.trim() ||
    !this.userAnswerSpanish.trim()
  ) return;

  const correctEnglish = this.userAnswer.trim().toLowerCase() === this.currentWord.english.toLowerCase();
  const correctGerman = this.userAnswerGerman.trim().toLowerCase() === this.currentWord.german.toLowerCase();
  const correctSpanish = this.userAnswerSpanish.trim().toLowerCase() === this.currentWord.spanish.toLowerCase();

  if (correctEnglish && correctGerman && correctSpanish) {
    this.score++;
    this.feedback = 'All correct!';
    this.feedbackClass = 'positive';
  } else {
    const corrections = [];
    if (!correctEnglish) corrections.push(`English: "${this.currentWord.english}"`);
    if (!correctGerman) corrections.push(`German: "${this.currentWord.german}"`);
    if (!correctSpanish) corrections.push(`Spanish: "${this.currentWord.spanish}"`);
    this.feedback = `Incorrect! Correct answers: ${corrections.join(', ')}.`;
    this.feedbackClass = 'negative';
  }

  setTimeout(() => {
    this.nextWord();
  }, 3000);
}
  }
};
</script>


<style scoped>
.hint-letter {
  font-weight: bold;
  color: #2185d0;
}

.progress-bar {
  background-color: #e0e1e2;
  border-radius: 3px;
  height: 15px;
  width: 100%;
  margin-top: 1em;
  overflow: hidden;
}

.progress {
  background-color: #21ba45; 
  height: 100%;
  transition: width 0.5s ease;
}
</style>
