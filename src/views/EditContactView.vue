<script setup>
import { onMounted, reactive, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { vMaska } from 'maska'

const isDialogOpen = ref(false)
const modalTitle = ref('')
const modalText = ref('')

function closeModal() {
  isDialogOpen.value = false
  router.push({ name: 'dashboard' })
}

function openModal(title, text) {
  modalTitle.value = title
  modalText.value = text
  isDialogOpen.value = true
}

const route = useRoute()
const id = parseInt(route.params.id)

const name = ref('')
const email = ref('')
const address = ref('')
const phoneNumbers = reactive({
  phone1: '',
  id1: '',
  phone2: '',
  id2: '',
  phone3: '',
  id3: '',
  phone4: '',
  id4: ''
})

async function getContact() {
  try {
    const request = await fetch(`http://localhost/list-contact?id=${id}`)
    const response = await request.json()

    if (response.status === 'error') {
      router.push({ name: 'dashboard' })
      return
    }

    name.value = response.name
    email.value = response.email
    address.value = response.address
    phoneNumbers.phone1 = response.phones[0].number
    phoneNumbers.phone2 = response.phones[1]?.number
    phoneNumbers.phone3 = response.phones[2]?.number
    phoneNumbers.phone4 = response.phones[3]?.number
    phoneNumbers.id1 = response.phones[0].id
    phoneNumbers.id2 = response.phones[1]?.id
    phoneNumbers.id3 = response.phones[2]?.id
    phoneNumbers.id4 = response.phones[3]?.id
  } catch (error) {
    openModal(
      'Erro ao buscar contato',
      'Ocorreu um erro ao buscar o contato. Tente novamente mais tarde.'
    )
  }
}

async function editContact() {
  const formData = new FormData()

  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('address', address.value)
  formData.append(
    'phoneNumbers',
    JSON.stringify([
      {
        id: phoneNumbers.id1,
        number: phoneNumbers.phone1
      },
      {
        id: phoneNumbers.id2,
        number: phoneNumbers.phone2
      },
      {
        id: phoneNumbers.id3,
        number: phoneNumbers.phone3
      },
      {
        id: phoneNumbers.id4,
        number: phoneNumbers.phone4
      }
    ])
  )

  try {
    const request = await fetch(`http://localhost/save-contact?id=${id}`, {
      method: 'POST',
      body: formData
    })

    const response = await request.json()

    if (response.status === 'error') {
      openModal(
        'Erro ao atualizar contato',
        'Ocorreu um erro ao atualizar o contato. Tente novamente mais tarde.'
      )
      return
    }

    if (response.status === 'success') {
      openModal(
        'Contato atualizado com sucesso',
        `O contato ${name.value} com o e-mail ${email.value} foi salvo com sucesso.`
      )
      return
    }
  } catch (error) {
    openModal('Erro fatal', 'Ocorreu um erro inesperado. Tente novamente mais tarde.')
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
              v-maska
              data-maska="(##) #####-####"
              v-model="phoneNumbers.phone1"
              id="phone1"
              required
              pattern="^\(\d{2}\) \d{5}-\d{4}$"
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
              v-maska
              data-maska="(##) #####-####"
              v-model="phoneNumbers.phone2"
              id="phone2"
              pattern="^\(\d{2}\) \d{5}-\d{4}$"
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
              v-maska
              data-maska="(##) #####-####"
              v-model="phoneNumbers.phone3"
              id="phone3"
              pattern="^\(\d{2}\) \d{5}-\d{4}$"
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
              v-maska
              data-maska="(##) #####-####"
              v-model="phoneNumbers.phone4"
              id="phone4"
              pattern="^\(\d{2}\) \d{5}-\d{4}$"
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
