import { ref } from 'vue';

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)

    fetch(url)
        .then(res => res.text())
        .then(text => (data.value = text))
        .catch(err => (error.value = err))

    return { data, error }
}
