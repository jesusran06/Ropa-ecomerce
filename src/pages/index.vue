<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'

import { paginationMeta } from '@/@fake-db/utils'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore2'
import { avatarText } from '@core/utils/formatters'

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

// Headers
const headers = [
  {
    title: 'Correo',
    key: 'user',
  },
  {
    title: 'Nombre',
    key: 'role',
  },
  {
    title: 'Apellidos',
    key: 'plan',
  },
  {
    title: 'Perfil',
    key: 'billing',
  },
  {
    title: 'Acciones',
    key: 'actions',
    sortable: false,
  },
]

const pending_headers = [
  {
    title: 'Correo',
    key: 'user',
  },
  {
    title: 'Nombre',
    key: 'role',
  },
  {
    title: 'Apellidos',
    key: 'plan',
  },
  {
    title: 'Perfil',
    key: 'billing',
  },
  {
    title: 'Permiso de venta',
    key: 'status',
  },
  {
    title: 'Acciones',
    key: 'actions',
    sortable: false,
  },
]

// 👉 Fetching users
// const fetchUsers = () => {
//   userListStore.fetchUsers({
//     q: searchQuery.value,
//     status: selectedStatus.value,
//     plan: selectedPlan.value,
//     role: selectedRole.value,
//     options: options.value,
//   }).then(response => {
//     console.log('response', response)
//     users.value = response.data.users
//     totalPage.value = response.data.totalPage
//     totalUsers.value = response.data.totalUsers
//     options.value.page = response.data.page
//   }).catch(error => {
//     console.error(error)
//   })
// }

const fetchUsers = () => {
  const response = userListStore.fetchUsers()

  users.value = response.users
  totalPage.value = response.totalPage
  totalUsers.value = response.totalUsers
  options.value.page = response.page
}

watchEffect(fetchUsers)

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'subscriber') {
    return {
      color: 'warning',
      icon: 'tabler-circle-check',
    }
  }
  if (roleLowerCase === 'author') {
    return {
      color: 'success',
      icon: 'tabler-user',
    }
  }
  if (roleLowerCase === 'maintainer') {
    return {
      color: 'primary',
      icon: 'tabler-chart-pie-2',
    }
  }
  if (roleLowerCase === 'editor') {
    return {
      color: 'info',
      icon: 'tabler-edit',
    }
  }
  if (roleLowerCase === 'admin') {
    return {
      color: 'secondary',
      icon: 'tabler-device-laptop',
    }
  }

  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}

const deleteUser = id => {
  userListStore.deleteUser(id)

  // refetch User
  fetchUsers()
}
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCardText class="d-flex justify-end flex-wrap py-4 px-0 gap-4">
          <div class="app-user-search-filter d-flex justify-end flex-wrap gap-4">
            <!-- 👉 Add user button -->
            <VBtn @click="isAddNewUserDrawerVisible = false">
              Ejecutar
            </VBtn>
          </div>
        </VCardText>

        <VDivider />
        <VCard title="Ordenes de Compra">
          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="users"
            :items-length="totalUsers"
            :headers="headers"
            class="text-no-wrap"
            @update:options="options = $event"
          >
            <!-- User -->
            <template #item.user="{ item }">
              <div class="d-flex align-center">
                <VAvatar
                  size="34"
                  :variant="!item.raw.avatar ? 'tonal' : undefined"
                  :color="!item.raw.avatar ? resolveUserRoleVariant(item.raw.role).color : undefined"
                  class="me-3"
                >
                  <VImg
                    v-if="item.raw.avatar"
                    :src="item.raw.avatar"
                  />
                  <span v-else>{{ avatarText(item.raw.fullName) }}</span>
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    <a
                      :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }"
                      class="font-weight-medium user-list-name"
                    >
                      {{ item.raw.fullName }}
                    </a>
                  </h6>

                  <span class="text-sm text-medium-emphasis">@{{ item.raw.email }}</span>
                </div>
              </div>
            </template>

            <!-- 👉 Role -->
            <template #item.role="{ item }">
              <div class="d-flex align-center gap-4">
                <VAvatar
                  :size="30"
                  :color="resolveUserRoleVariant(item.raw.role).color"
                  variant="tonal"
                >
                  <VIcon
                    :size="20"
                    :icon="resolveUserRoleVariant(item.raw.role).icon"
                  />
                </VAvatar>
                <span class="text-capitalize">{{ item.raw.role }}</span>
              </div>
            </template>

            <!-- Plan -->
            <template #item.plan="{ item }">
              <span class="text-capitalize font-weight-medium">{{ item.raw.currentPlan }}</span>
            </template>

            <!-- Status -->
            <template #item.status="{ item }">
              <VChip
                :color="resolveUserStatusVariant(item.raw.status)"
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.status }}
              </VChip>
            </template>

            <!-- Actions -->
            <template #item.actions="{ item }">
              <IconBtn>
                <VIcon icon="tabler-edit" />
              </IconBtn>

              <IconBtn @click="deleteUser(item.raw.id)">
                <VIcon icon="tabler-trash" />
              </IconBtn>

              <IconBtn @click="deleteUser(item.raw.id)">
                <VTooltip
                  location="top"
                  transition="scale-transition"
                  activator="parent"
                >
                  <span>Información</span>
                </VTooltip>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-info-circle"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >

                  <path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M12 9h.01" />
                  <path d="M11 12h1v4h1" />
                </svg>
              </IconBtn>
            </template>

            <!-- pagination -->
            <template #bottom>
              <VDivider />
              <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
                <div class="me-3 d-flex gap-3">
                  <AppSelect
                    :model-value="options.itemsPerPage"
                    :items="[
                      { value: 10, title: '10' },
                      { value: 25, title: '25' },
                      { value: 50, title: '50' },
                      { value: 100, title: '100' },
                      { value: -1, title: 'All' },
                    ]"
                    style="width: 6.25rem;"
                    class=""
                    @update:model-value="options.itemsPerPage = parseInt($event, 10)"
                  />
                </div>
                <VSpacer />
                <p class="text-sm text-disabled mb-0">
                  {{ paginationMeta(options, totalUsers) }}
                </p>

                <VPagination
                  v-model="options.page"
                  :length="Math.ceil(totalUsers / options.itemsPerPage)"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / options.itemsPerPage)"
                >
                  <template #prev="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Previous
                    </VBtn>
                  </template>

                  <template #next="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Next
                    </VBtn>
                  </template>
                </VPagination>
              </div>
            </template>
          </VDataTableServer>
          <!-- SECTION -->
        </VCard>

        <!-- 👉 Add New User -->
        <AddNewUserDrawer
          v-model:isDrawerOpen="isAddNewUserDrawerVisible"
          @user-data="addNewUser"
        />
      </vcol>
    </vrow>
    <VRow>
      <VCol cols="12">
        <VCardText class="d-flex justify-end flex-wrap py-4 px-0 gap-4">
          <div class="app-user-search-filter d-flex justify-end flex-wrap gap-4">
            <!-- 👉 Add user button -->
            <VBtn @click="isAddNewUserDrawerVisible = false">
              Ejecutar
            </VBtn>
          </div>
        </VCardText>

        <VDivider />
        <VCard title="Ordenes de Producción">
          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="users"
            :items-length="totalUsers"
            :headers="pending_headers"
            class="text-no-wrap"
            @update:options="options = $event"
          >
            <!-- User -->
            <template #item.user="{ item }">
              <div class="d-flex align-center">
                <VAvatar
                  size="34"
                  :variant="!item.raw.avatar ? 'tonal' : undefined"
                  :color="!item.raw.avatar ? resolveUserRoleVariant(item.raw.role).color : undefined"
                  class="me-3"
                >
                  <VImg
                    v-if="item.raw.avatar"
                    :src="item.raw.avatar"
                  />
                  <span v-else>{{ avatarText(item.raw.fullName) }}</span>
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    <a
                      :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }"
                      class="font-weight-medium user-list-name"
                    >
                      {{ item.raw.fullName }}
                    </a>
                  </h6>

                  <span class="text-sm text-medium-emphasis">@{{ item.raw.email }}</span>
                </div>
              </div>
            </template>

            <!-- 👉 Role -->
            <template #item.role="{ item }">
              <div class="d-flex align-center gap-4">
                <VAvatar
                  :size="30"
                  :color="resolveUserRoleVariant(item.raw.role).color"
                  variant="tonal"
                >
                  <VIcon
                    :size="20"
                    :icon="resolveUserRoleVariant(item.raw.role).icon"
                  />
                </VAvatar>
                <span class="text-capitalize">{{ item.raw.role }}</span>
              </div>
            </template>

            <!-- Plan -->
            <template #item.plan="{ item }">
              <span class="text-capitalize font-weight-medium">{{ item.raw.currentPlan }}</span>
            </template>

            <!-- Status -->
            <template #item.status="{ item }">
              <VChip
                :color="resolveUserStatusVariant(item.raw.status)"
                size="small"
                label
                class="text-capitalize"
              >
                {{ item.raw.status }}
              </VChip>
            </template>

            <!-- Actions -->
            <template #item.actions="{ item }">
              <IconBtn @click="deleteUser(item.raw.id)">
                <VIcon icon="tabler-trash" />
              </IconBtn>

              <IconBtn>
                <VIcon icon="tabler-edit" />
              </IconBtn>
            </template>

            <!-- pagination -->
            <template #bottom>
              <VDivider />
              <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
                <div class="me-3 d-flex gap-3">
                  <AppSelect
                    :model-value="options.itemsPerPage"
                    :items="[
                      { value: 10, title: '10' },
                      { value: 25, title: '25' },
                      { value: 50, title: '50' },
                      { value: 100, title: '100' },
                      { value: -1, title: 'All' },
                    ]"
                    style="width: 6.25rem;"
                    @update:model-value="options.itemsPerPage = parseInt($event, 10)"
                  />
                </div>
                <VSpacer />
                <p class="text-sm text-disabled mb-0">
                  {{ paginationMeta(options, totalUsers) }}
                </p>

                <VPagination
                  v-model="options.page"
                  :length="Math.ceil(totalUsers / options.itemsPerPage)"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / options.itemsPerPage)"
                >
                  <template #prev="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Previous
                    </VBtn>
                  </template>

                  <template #next="slotProps">
                    <VBtn
                      variant="tonal"
                      color="default"
                      v-bind="slotProps"
                      :icon="false"
                    >
                      Next
                    </VBtn>
                  </template>
                </VPagination>
              </div>
            </template>
          </VDataTableServer>
          <!-- SECTION -->
        </VCard>
      </vcol>
    </vrow>
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}

.v-table tr {
  background-color: #000 !important;
}
</style>
