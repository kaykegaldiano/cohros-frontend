<script setup>
import { onMounted, ref } from 'vue'

const contacts = ref([])

async function getContacts() {
  const request = await fetch('http://localhost/list-contacts')
  const response = await request.json()

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

onMounted(async () => {
  await getContacts()
})
</script>

<template>
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
                <tr v-for="contact in contacts" :key="contact.email" class="even:bg-gray-50">
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
                    <a href="#" class="text-red-600 hover:text-red-900"
                      >Excluir<span class="sr-only">, {{ contact.name }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
