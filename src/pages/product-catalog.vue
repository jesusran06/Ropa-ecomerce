<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { avatarText } from '@/@core/utils/formatters'
import { useUserListStore } from '@/views/apps/user/useUserListStore2'
import pages1 from '@images/pages/1.png'

// import data from '@/views/demos/forms/tables/data-table/datatable'

const userListStore = useUserListStore()

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const users = ref([])
const totalPage = ref(1)
const totalUsers = ref(0)

const fetchUsers = () => {
  const response = userListStore.fetchUsers()

  users.value = response.users
  totalPage.value = response.totalPage
  totalUsers.value = response.totalUsers
  options.value.page = response.page
}

watchEffect(fetchUsers)

const headers = [
  {
    title: 'NAME',
    key: 'full_name',
  },
  {
    title: 'EMAIL',
    key: 'email',
  },
  {
    title: 'DATE',
    key: 'start_date',
  },
  {
    title: 'SALARY',
    key: 'salary',
  },
  {
    title: 'AGE',
    key: 'age',
  },
  {
    title: 'STATUS',
    key: 'status',
  },
]

const resolveStatusVariant = status => {
  if (status === 1) {
    return {
      color: 'primary',
      text: 'Current',
    }
  }
  else if (status === 2) {
    return {
      color: 'success',
      text: 'Professional',
    }
  }
  else if (status === 3) {
    return {
      color: 'error',
      text: 'Rejected',
    }
  }
  else if (status === 4) {
    return {
      color: 'warning',
      text: 'Resigned',
    }
  }
  else {
    return {
      color: 'info',
      text: 'Applied',
    }
  }
}
</script>

<template>
  <VRow>
    <VCol cols="10">
      <VDataTable
        :headers="headers"
        :items="users"
        :items-per-page="5"
        show-select
        class="my-table"
      >
        <!-- full name -->
        <template #item.full_name="{ item }">
          <div class="d-flex align-center">
            <VAvatar
              size="32"
              :color="item.raw.avatar ? '' : 'primary'"
              :class="item.raw.avatar ? '' : 'v-avatar-light-bg primary--text'"
              :variant="!item.raw.avatar ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.raw.avatar"
                :src="item.raw.avatar"
              />
              <span v-else>{{ avatarText(item.raw.full_name) }}</span>
            </VAvatar>
            <div class="d-flex flex-column ms-3">
              <span class="d-block font-weight-medium text--primary text-truncate">{{ item.raw.full_name }}</span>
              <small>{{ item.raw.post }}</small>
            </div>
          </div>
        </template>

        <!-- status -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveStatusVariant(item.raw.status).color"
            density="comfortable"
            class="font-weight-medium"
            size="small"
          >
            {{ resolveStatusVariant(item.raw.status).text }}
          </VChip>
        </template>
      </VDataTable>
    </VCol>
    <VCol cols="2">
      <VCard>
        <VCardTitle class="text-lg">
          Notifications
        </VCardTitle>

        <VImg
          :src="pages1"
          cover
        />

        <VCardItem>
          <VCardTitle>Influencing The Influencer</VCardTitle>
        </VCardItem>

        <VCardText>
          Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago.
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.v-table tr {
  background-color: #000 !important;
}
.my-table thead th {
    background-color: #000; /* Cambia el color de fondo del encabezado */
    color: #fff; /* Cambia el color del texto del encabezado */
  }

  .my-table tbody tr {
    background-color: #000; /* Cambia el color de fondo de las filas */
    color: #fff; /* Cambia el color del texto de las filas */
  }
</style>
