<script setup>
    import InputText from '@/components/InputText.vue'
    import { useFetch } from '../composables/fetch.js'

    console.log(useFetch('http://localhost'))
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">Sign up</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form class="space-y-6" method="POST" @submit.prevent="console.log(useFetch('http://localhost').data)">
          <div>
            <InputText name="username" lblText="Your name" required />
          </div>

          <div>
            <InputText name="email" lblText="Your email address" required />
          </div>

          <div>
            <InputText name="password" lblText="Your password" required />
          </div>
          
          <div>
            <InputText name="confirm_password" lblText="Confirm your password" required />
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
          </div>
        </form>

        <div>

        </div>
      </div>

    </div>
  </div>
</template>