<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'

import { paginationMeta } from '@/@fake-db/utils'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { avatarText } from '@core/utils/formatters'

const userListStore = useUserListStore()
const itemsPerPage = ref(10)
const filter = ref('')
const sortBy = ref([])
const sortOrder = ref([])
const pagNumber = ref(1)
const pagSize = ref(10)
const totalUsers = ref(0)
const totalPages = ref(0)
const users = ref([])

// const options = ref({
//   filter: '',
//   sortBy: [],
//   sortOrder: [],
//   pagNumber: 1,
//   pagSize: 2,
// })

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
const fetchUsers = async () => {
  await userListStore.fetchUsers({
    filter: filter.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
    pagNumber: pagNumber.value,
    pagSize: pagSize.value,
  }).then(r => {
    console.log('response', r)
    users.value = r.data[0].data
    pagNumber.value = r.data[0].currentPage
    totalPages.value = r.data[0].totalPages
    totalUsers.value = r.data[0].totalItems
  })
}

watchEffect(() => {
  console.log(pagSize.value)
  fetchUsers()
})

const resolveUserRoleVariant = role => {
  const roleLowerCase = role

  // const roleLowerCase = role.toLowerCase()
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
  const statLowerCase = stat

  // const statLowerCase = stat.toLowerCase()
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
            <VBtn
              prepend-icon="tabler-plus"
              @click="isAddNewUserDrawerVisible = true"
            >
              Add New User
            </VBtn>
          </div>
        </VCardText>

        <VDivider />
        <VCard>
          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="itemsPerPage"
            v-model:page="pagNumber"
            :items="users"
            :items-length="totalUsers"
            :headers="headers"
            class="text-no-wrap custom-header"
            @update:options="options = $event"
          >
          <template v-slot:item="props">
            <tr>
              <td>
                {{props.item.props.title.email}}
              </td>
              <td>
                {{props.item.props.title.name}}
              </td>
              <td>
                <IconBtn>
                <VIcon icon="tabler-edit" />
                </IconBtn>

                <IconBtn @click="deleteUser(props.item.props.title.id)">
                  <VIcon icon="tabler-trash" />
                </IconBtn>

                <IconBtn @click="deleteUser(props.item.props.title.id)">
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
              </td>
            </tr>
          </template>
            <!-- Actions -->
            <template #item.actions="{ item }">
              
            </template>
            <!-- pagination -->
            <template #bottom>
              <VDivider />
              <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
                <div class="me-3 d-flex gap-3">
                  <AppSelect
                    :model-value="pagSize"
                    :items="[
                      { value: 10, title: '10' },
                      { value: 25, title: '25' },
                      { value: 50, title: '50' },
                      { value: 100, title: '100' },
                      { value: -1, title: 'All' },
                    ]"
                    style="width: 6.25rem;"
                    @update:model-value="pagSize = parseInt($event, 10)"
                  />
                </div>
                <VSpacer />
                <p class="text-sm text-disabled mb-0">
                  {{ paginationMeta({ page: pagNumber, itemsPerPage }, totalUsers) }}
                </p>

                <VPagination
                  v-model="pagNumber"
                  :length="Math.ceil(totalUsers / itemsPerPage)"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / itemsPerPage)"
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
        <VCard title="Pendientes por aprobar">
          <!-- SECTION datatable -->
          <VDataTableServer
            v-model:items-per-page="itemsPerPage"
            v-model:page="pagNumber"
            :items="users"
            :items-length="totalUsers"
            :headers="pending_headers"
            class="text-no-wrap custom-header"
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
                    :model-value="itemsPerPage"
                    :items="[
                      { value: 10, title: '10' },
                      { value: 25, title: '25' },
                      { value: 50, title: '50' },
                      { value: 100, title: '100' },
                      { value: -1, title: 'All' },
                    ]"
                    style="width: 6.25rem;"
                    @update:model-value="itemsPerPage = parseInt($event, 10)"
                  />
                </div>
                <VSpacer />
                <p class="text-sm text-disabled mb-0">
                  {{ paginationMeta(options, totalUsers) }}
                </p>

                <VPagination
                  v-model="pagNumber"
                  :length="Math.ceil(totalUsers / itemsPerPage)"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / itemsPerPage)"
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

.custom-header th {
  background-color: #FF5733 !important; /* Cambia el color de fondo del encabezado */
  color: white !important; /* Cambia el color del texto del encabezado */
}

// .custom-header tr:hover {
//   background: #FF5733 !important;
// }
// .qloq {
//   display: table-row !important;
// }
.qloq:hover {
  background-color: black !important; /* Cambia el color de fondo en hover */
}

</style>
