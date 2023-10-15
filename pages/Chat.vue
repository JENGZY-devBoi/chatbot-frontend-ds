<template>
    <main class="w-full h-screen bg-grey-200  lg:bg-grey-200 grid place-content-center">
        <section class="md:w-[500px] w-full flex flex-col bg-secondary h-[400px]">
            <div class="flex items-center gap-x-3 w-full bg-primary justify-between p-2 px-4 rounded-t-xl ">
                <h1 class="text-xl font-bold text-brown">
                    Chat room 
                </h1>

                <span class="text-[12px] font-normal flex gap-x-1 items-center text-brown text-opacity-80">
                    <Icon name="ion:radio-button-on-outline" class="text-[#26cc00] text-[9px]" /> 
                    {{ members }} online
                </span>
            </div>

            <ul 
                class="flex flex-col flex-grow mb-2 px-3 pt-3 overflow-y-auto"
                ref="elScroll"
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
                            {{ item.author?.split('USER')[0] }}
                        </div>

                        <div 
                            v-if="chats?.at(idx-1)?.author !== item.author && idx !== 0"
                            class="text-author text-xs mb-1"
                            :class="{
                                'text-chat-other-color text-start pl-1': item.author !== storeAuthor.authorName,
                                'text-chat-owner-color text-end pr-1': item.author === storeAuthor.authorName
                            }"
                        >
                            {{ item.author?.split('USER')[0] }}
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

            <form @submit.prevent="onSubmitSendMessage" class="flex p-5 bg-[#D4C8BE] gap-2 rounded-b-xl">
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
    import { io } from 'socket.io-client';
    import dayjs from 'dayjs';
    import useAuthorStore from '@/stores/author';

    import { toast } from 'vue3-toastify';

    definePageMeta({
        middleware: ['auth']
    })

    const storeAuthor = useAuthorStore();

    let socket;
    const chats = ref([]);
    const members = ref(0);
    const messageSend = ref('');
    const elScroll = ref();

    onMounted(() => {
        socket = io('https://chatbot-backend-applicaiton-fwfeo.ondigitalocean.app/', 
        // socket = io('http://localhost:8080', 
            {
                transports: ['polling'],
                auth: {
                    name: storeAuthor.authorName,
                    room: 'room1'
                }
            }
        );

        
        if (storeAuthor.authorName === '') {
            socket.disconnect();
            return navigateTo('/');
        }

        socket.emit('room', 'room1');
    

        socket.on('new-message', (chat) => {
            chats.value.push(chat);

            nextTick(() => {
                const lastChild = elScroll.value?.lastElementChild;

                lastChild?.scrollIntoView({
                    block: 'end',
                    behavior: 'smooth'
                });
            });
        });

        socket.on('user-connect', (data) => {
            members.value = data.users;

            toast.success(`${data.userConnect?.split('USER')[0]} has joined`, {
                autoClose: 1500,
                position: 'top-center',
                theme: 'colored',
                
            })
        })

        socket.on('user-disconnect', (data) => {
            members.value = data.users;
        })
    })

    onUnmounted(() => {
        socket.disconnect();
    })

    const onSubmitSendMessage = () => {
        if (messageSend.value === '') {
            return console.log('cannot send');
        } 

        socket?.emit('send-message', {
            author: storeAuthor.authorName,
            msg: messageSend.value
        });

        messageSend.value = '';
    }
</script>