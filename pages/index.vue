<template>
  <div class="h-screen w-full">
    <form @submit.prevent="onSubmitAuthor" class="flex p-5 bg-[#D4C8BE] gap-2 pb-8">
      <input v-model="author" class="py-2 px-3 focus:ring-0 focus:outline-0 rounded-xl w-full" type="text"
        placeholder="Aa" />

      <button class="py-2 px-3 bg-white rounded-xl w-[50px]" type="submit" onclick="">
        <Icon name="ion:md-send" class="text-brown text-xl" />
      </button>
    </form>
  </div>
</template>
  
<script setup>
  import useAuthorStore from '@/stores/author';
  const storeAuthor = useAuthorStore();

  const author = ref('');

  const onSubmitAuthor = () => {
    if (author.value == '') {
      return;
    }

    storeAuthor.authorName = author.value;

    console.log(storeAuthor.authorName);
    author.value = '';

    navigateTo('/chat');
  }
</script>