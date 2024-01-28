<script setup>
import { reactive, ref } from 'vue';

const name = ref('')
const email = ref('')
const address = ref('')
const phoneNumbers = reactive({
  phone1: '',
  phone2: '',
  phone3: '',
  phone4: ''
})

async function createContact() {
  const formData = new FormData();

  formData.append('name', name.value);
  formData.append('email', email.value);
  formData.append('address', address.value);
  formData.append('phoneNumbers', [
    phoneNumbers.phone1,
    phoneNumbers.phone2,
    phoneNumbers.phone3,
    phoneNumbers.phone4
  ]);

  try {
      const request = await fetch('http://localhost/save-contact', {
          method: 'POST',
          body: formData
      })

      const response = await request.json()
      console.log(response)
  } catch (error) {
      console.log(error)
  }
}
</script>

<template>
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 h-[calc(100vh-80px)]">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Criar novo contato</h2>
      </div>
      <form @submit.prevent="createContact"  class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
            <div class="mt-2.5">
              <input type="text" v-model="name" id="name" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">E-mail</label>
            <div class="mt-2.5">
              <input type="email" v-model="email" id="email" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="address" class="block text-sm font-semibold leading-6 text-gray-900">Endereço</label>
            <div class="mt-2.5">
              <input type="text" v-model="address" id="address" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="phone1" class="block text-sm font-semibold leading-6 text-gray-900">Número de telefone 1</label>
            <div class="relative mt-2.5">
              <input type="tel" v-model="phoneNumbers.phone1" id="phone1" required class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="phone2" class="block text-sm font-semibold leading-6 text-gray-900">Número de telefone 2</label>
            <div class="relative mt-2.5">
              <input type="tel" v-model="phoneNumbers.phone2" id="phone2" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="phone3" class="block text-sm font-semibold leading-6 text-gray-900">Número de telefone 3</label>
            <div class="relative mt-2.5">
              <input type="tel" v-model="phoneNumbers.phone3" id="phone3" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="phone4" class="block text-sm font-semibold leading-6 text-gray-900">Número de telefone 4</label>
            <div class="relative mt-2.5">
              <input type="tel" v-model="phoneNumbers.phone4" id="phone4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
        <div class="mt-10">
          <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Salvar</button>
        </div>
      </form>
    </div>
  </template>