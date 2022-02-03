import { writable } from 'svelte/store';
export const loader = writable(true);
export const newCharacters = writable([]);