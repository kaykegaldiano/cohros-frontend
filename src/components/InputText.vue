<script setup>
    defineProps({
        name: {
            type: String,
            required: true
        },
        lblText: {
            type: String,
            required: true
        },
        disabled: Boolean,
        required: Boolean
    })
</script>

<template>
    <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ lblText }}</label>
        <div class="mt-2">
            <input :id="name" :name="name" :disabled="disabled" :required="required" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
</template>