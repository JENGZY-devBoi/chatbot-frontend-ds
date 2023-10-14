<template>
    <main class="w-full h-screen bg-grey-200  lg:bg-grey-200">
        <section class="md:w-[500px] w-full md:mx-auto mx-0 h-screen  rounded-md flex flex-col bg-secondary">
            <h1 class="bg-primary p-2 text-xl font-bold text-brown">
                Chat room
            </h1>

            <ul 
                class="flex flex-col flex-grow mb-2 px-3 pt-3 overflow-y-auto"
            >
                <li 
                    v-for="item,idx of chats"
                    :key="idx"
                    class="w-full flex items-center mt-2 gap-2"
                    :class="{
                        'justify-start': item.author !== storeAuthor.authorName,
                        'justify-end': item.author === storeAuthor.authorName
                    }"
                >
                    <div 
                        class="text-[9px] self-end text-brown text-opacity-70"
                        :class="{ 'order-last': item.author !== storeAuthor.authorName }"
                    >
                        {{ dayjs(item.create_at).format('HH:mm') }}
                    </div>

                    <div class="flex flex-col">
                        <div 
                            v-if="idx === 0"
                            class="text-author text-xs mb-1"
                            :class="{
                                'text-chat-other-color text-start pl-1': item.author !== storeAuthor.authorName,
                                'text-chat-owner-color text-end pr-1': item.author === storeAuthor.authorName
                            }"
                        >
                            {{ item.author }}
                        </div>

                        <div 
                            v-if="chats?.at(idx-1)?.author !== item.author"
                            class="text-author text-xs mb-1"
                            :class="{
                                'text-chat-other-color text-start pl-1': item.author !== storeAuthor.authorName,
                                'text-chat-owner-color text-end pr-1': item.author === storeAuthor.authorName
                            }"
                        >
                            {{ item.author }}
                        </div>
            
                        <div 
                            class="py-2 px-4 rounded-2xl w-max-[300px]"
                            :class="{
                                'bg-chat-other text-chat-other-color': item.author !== storeAuthor.authorName,
                                'bg-chat-owner text-chat-owner-color': item.author === storeAuthor.authorName,
                            }"
                        >
                            {{ item.msg }}
                        </div>
                    </div>
                </li>
            </ul>

            <form @submit.prevent="onSubmitSendMessage" class="flex p-5 bg-[#D4C8BE] gap-2 pb-8">
                <input 
                    v-model="messageSend"
                    class="py-2 px-3 focus:ring-0 focus:outline-0 rounded-xl w-full" 
                    type="text" 
                    placeholder="Aa"
                />

                <button 
                    class="py-2 px-3 bg-white rounded-xl w-[50px]"
                    type="submit"
                    onclick=""
                >
                    <Icon name="ion:md-send" class="text-brown text-xl" />
                </button>
            </form>
        </section>
    </main>
</template>

<script setup>
    import dayjs from 'dayjs';
    import useAuthorStore from '@/stores/author';
    const storeAuthor = useAuthorStore();

    const chats = ref([]);

    onMounted(() => {
        socket.on('connect', () => {
            console.log('connect socket success');
        })
    })
    
    socket.on('new-message', (chat) => {
        console.log(chat)
        chats.value.push(chat);
    });

    const messageSend = ref('');

    const onSubmitSendMessage = () => {
        if (messageSend.value === '') {
            return console.log('cannot send');
        }

        socket.emit('send-message', {
            author: storeAuthor.authorName,
            msg: messageSend.value
        });
        
        messageSend.value = '';
    }
</script>