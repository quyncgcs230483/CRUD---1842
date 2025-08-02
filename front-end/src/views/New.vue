<template>
    <div>
        <h1>New Word</h1>
        <word-form @create0rUpdate="create0rUpdate"></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
    name: 'new-word',
    components: {
        'word-form': WordForm
    },
    methods: {
        create0rUpdate: async function(word) {
            if (word.english.trim() !== '' && word.german.trim() !== '' && word.spanish.trim() !== '') {
                const res = await api.createWord(word);
                this.flash('Word created', 'success');
                this.$router.push(`/words/${res._id}`);
            } else {
                this.flash('Please enter at least one letter or number', 'error');
            }
        }
    }
};
</script>