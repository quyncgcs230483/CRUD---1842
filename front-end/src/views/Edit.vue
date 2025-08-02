<template>
  <div>
    <h1>Edit Word</h1>
    <word-form @create0rUpdate="create0rUpdate" :word="word"></word-form>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'word-form': WordForm
  },
  data: function () {
    return {
      word: {},
      originalWord: {} 
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
    this.originalWord = { ...this.word };
  },
  methods: {
    create0rUpdate: async function(word) {
      if (
        word.german === this.originalWord.german &&
        word.english === this.originalWord.english &&
        word.spanish === this.originalWord.spanish
      ) {
        this.flash('No changes to update!', 'error');
      } else {
        await api.updateWord(word);
        this.flash('Word updated successfully!', 'success');
        this.$router.push(`/words/${word._id}`);
      }
    }
  }
};
</script>