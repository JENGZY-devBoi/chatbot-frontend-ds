import { defineStore } from "pinia";

export const useAuthorStor = defineStore('author', {
    state: () => ({
        authorName: ''
    }),
});

export default useAuthorStor;