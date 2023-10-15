<template>
  <div class="h-screen w-full grid place-content-center">
    <form @submit.prevent="onSubmitAuthor" class="flex p-5 bg-[#D4C8BE] gap-2 rounded-xl md:w-[300px] sm:w-full">
      <input v-model="author" class="py-2 px-3 focus:ring-0 focus:outline-0 rounded-xl w-full" type="text"
        placeholder="Enter your name" />

      <button class="py-2 px-3 bg-white rounded-xl w-[150px] bg-primary" type="submit">
        Join chat
      </button>
    </form>
  </div>
</template>
  
<script setup>
import useAuthorStore from '@/stores/author';
const storeAuthor = useAuthorStore();

const author = ref('');

definePageMeta({
  middleware: ['auth']
})

import { io } from 'socket.io-client';

onMounted(() => {
  socket = io('https://chatbot-backend-applicaiton-fwfeo.ondigitalocean.app/',
    {
      transports: ['websocket', 'polling'],
      auth: {
        room: 'room1'
      },
    },
  );
})

const onSubmitAuthor = () => {
  if (author.value == '') {
    return;
  }

  const rd = Math.random();
  storeAuthor.authorName = author.value + 'USER' + rd;

  console.log(storeAuthor.authorName);
  author.value = '';

  navigateTo('/chat');
}
</script>