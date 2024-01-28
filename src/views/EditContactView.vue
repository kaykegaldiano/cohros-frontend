<script setup>
import { onMounted, reactive, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const isDialogOpen = ref(false)
const modalTitle = ref('')
const modalText = ref('')

function closeModal() {
  isDialogOpen.value = false
}

function openModal() {
  isDialogOpen.value = true
}

const route = useRoute()
const id = parseInt(route.params.id)

const name = ref('')
const email = ref('')
const address = ref('')
const phoneNumbers = reactive({
  phone1: '',
  phone2: '',
  phone3: '',
  phone4: ''
})

async function getContact() {
  try {
    const request = await fetch(`http://localhost/list-contact?id=${id}`)
    const response = await request.json()

    if (response.status === 'error') {
      router.push({ name: 'dashboard' })
      return
    }

    console.log(response)

    name.value = response.name
    email.value = response.email
    address.value = response.address
    phoneNumbers.phone1 = response.phones[0].number
    phoneNumbers.phone2 = response.phones[1]?.number
    phoneNumbers.phone3 = response.phones[2]?.number
    phoneNumbers.phone4 = response.phones[3]?.number
  } catch (error) {
    console.log(error)
  }
}

async function editContact() {
  const formData = new FormData()

  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('address', address.value)
  formData.append('phoneNumbers', [
    phoneNumbers.phone1,
    phoneNumbers.phone2,
    phoneNumbers.phone3,
    phoneNumbers.phone4
  ])

  try {
    const request = await fetch(`http://localhost/save-contact?id=${id}`, {
      method: 'POST',
      body: formData
    })

    const response = await request.json()

    console.log(response)

    if (response.status === 'error') {
      modalTitle.value = 'Erro ao atualizar contato'
      modalText.value = 'Ocorreu um erro ao atualizar o contato. Tente novamente mais tarde.'
      openModal()
      return
    }

    if (response.status === 'success') {
      modalTitle.value = 'Contato atualizado com sucesso'
      modalText.value = `O contato ${name.value} com o e-mail ${email.value} foi salvo com sucesso.`
      openModal()
      return
    }

    //   console.log(response)
  } catch (error) {
    console.log(error)
    modalTitle.value = 'Erro fatal'
    modalText.value = 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
    openModal()
  }
}

onMounted(async () => {
  await getContact()
})
</script>

<template>
  <TransitionRoot appear :show="isDialogOpen" as="template">
    <Dialog as="div" :open="isDialogOpen" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ modalTitle }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ modalText }}
                </p>
              </div>
              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Entendi
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <div class="isolate bg-white px-6 py-24 sm:py-20 lg:px-8 h-[calc(100vh-80px)]">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Editar contato</h2>
    </div>
    <form @submit.prevent="editContact" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Nome</label>
          <div class="mt-2.5">
            <input
              type="text"
              v-model="name"
              id="name"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900"
            >E-mail</label
          >
          <div class="mt-2.5">
            <input
              type="email"
              v-model="email"
              id="email"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="address" class="block text-sm font-semibold leading-6 text-gray-900"
            >Endereço</label
          >
          <div class="mt-2.5">
            <input
              type="text"
              v-model="address"
              id="address"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="phone1" class="block text-sm font-semibold leading-6 text-gray-900"
            >Número de telefone 1</label
          >
          <div class="relative mt-2.5">
            <input
              type="tel"
              v-model="phoneNumbers.phone1"
              id="phone1"
              required
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="phone2" class="block text-sm font-semibold leading-6 text-gray-900"
            >Número de telefone 2</label
          >
          <div class="relative mt-2.5">
            <input
              type="tel"
              v-model="phoneNumbers.phone2"
              id="phone2"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="phone3" class="block text-sm font-semibold leading-6 text-gray-900"
            >Número de telefone 3</label
          >
          <div class="relative mt-2.5">
            <input
              type="tel"
              v-model="phoneNumbers.phone3"
              id="phone3"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label for="phone4" class="block text-sm font-semibold leading-6 text-gray-900"
            >Número de telefone 4</label
          >
          <div class="relative mt-2.5">
            <input
              type="tel"
              v-model="phoneNumbers.phone4"
              id="phone4"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <button
          type="submit"
          class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>
