import useAuthorStore from "@/stores/author";

export default defineNuxtRouteMiddleware((to, from) => {
    const storeAuthor = useAuthorStore();
    if (to.fullPath === '/chat' && storeAuthor.authorName === '') {
        return navigateTo('/');
    }
})