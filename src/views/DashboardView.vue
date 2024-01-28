<script setup>
import { computed, onMounted, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const isDialogOpen = ref(false)
const modalTitle = ref('')
const modalText = ref('')

function closeModal() {
  isDialogOpen.value = false
}

function openModal(title, text) {
  modalTitle.value = title
  modalText.value = text
  isDialogOpen.value = true
}

const contacts = ref([])
const perPage = ref(5)
const currentPage = ref(1)
const totalItems = ref(0)

async function getContacts() {
  const request = await fetch('http://localhost/list-contacts')
  const response = await request.json()

  totalItems.value = response.length

  response.forEach((contact) => {
    contacts.value.push({
      id: contact.id,
      name: contact.name,
      address: contact.address,
      email: contact.email,
      phone: contact.phones[0].number
    })
  })
}

async function deleteContact(id) {
  if (confirm('Tem certeza que deseja excluir este contato? Essa ação não pode ser desfeita.')) {
    try {
      const request = await fetch(`http://localhost/remove-contact?id=${id}`, {
        method: 'POST'
      })

      const response = await request.json()

      if (response.status === 'error') {
        openModal(
          'Erro ao deletar contato',
          'Ocorreu um erro ao deletar o contato. Tente novamente mais tarde.'
        )
        return
      }

      if (response.status === 'success') {
        contacts.value = contacts.value.filter((contact) => contact.id !== id)
        openModal('Contato excluído', 'O contato foi excluído com sucesso!')
        return
      }
    } catch (error) {
      openModal(
        'Erro ao deletar contato',
        'Ocorreu um erro ao deletar o contato. Tente novamente mais tarde.'
      )
    }
  }
}

onMounted(async () => {
  await getContacts()
})

const displayedContacts = computed(() => {
  const startIndex = currentPage.value * perPage.value - perPage.value
  const endIndex = startIndex + perPage.value
  return contacts.value.slice(startIndex, endIndex)
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
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Listagem de contatos
      </h2>
    </div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center pt-10">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Contatos</h1>
          <p class="mt-2 text-sm text-gray-700">
            Uma lista de todos os contatos cadastrados na sua conta, incluindo nome, email e
            telefone deles
          </p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <RouterLink
            to="create-contact"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Adicionar contato</RouterLink
          >
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Nome
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Endereço
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    E-mail
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Telefone
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Editar</span>
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Excluir</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  v-for="contact in displayedContacts"
                  :key="contact.email"
                  class="even:bg-gray-50"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                  >
                    {{ contact.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ contact.address }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ contact.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ contact.phone }}
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3"
                  >
                    <RouterLink
                      :to="{ name: 'edit-contact', params: { id: contact.id } }"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Editar<span class="sr-only">, {{ contact.name }}</span></RouterLink
                    >
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3"
                  >
                    <button
                      type="button"
                      @click.prevent="deleteContact(contact.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Excluir<span class="sr-only">, {{ contact.name }}</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <vue-awesome-paginate
        :total-items="totalItems"
        :items-per-page="perPage"
        :max-pages-shown="5"
        v-model="currentPage"
      >
        <template #prev-button>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
            </svg>
          </span>
        </template>

        <template #next-button>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
            </svg>
          </span>
        </template>
      </vue-awesome-paginate>
    </div>
  </div>
</template>

<style>
.pagination-container {
  width: 100%;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
}
.paginate-buttons {
  height: 35px;
  width: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  color: black;
}

.back-button,
.next-button {
  background-color: black;
  color: white;
  border-radius: 8px;
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active-page {
  background-color: #e5e5e5;
}
.paginate-buttons:hover {
  background-color: #f5f5f5;
}
.active-page:hover {
  background-color: #e5e5e5;
}

.back-button svg {
  transform: rotate(180deg) translateY(-2px);
}
.next-button svg {
  transform: translateY(2px);
}

.back-button:hover,
.next-button:hover {
  background-color: rgb(45, 45, 45);
}

.back-button:active,
.next-button:active {
  background-color: rgb(85, 85, 85);
}
</style>
