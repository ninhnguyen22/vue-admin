<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Permission"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Permission List"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="total"
        :loading="loading"
        class="elevation-1"
      />
    </base-material-card>

    <div class="py-3" />
  </v-container>
</template>

<script>
  import { getData } from '@/api/permisison'

  export default {
    name: 'PermissionIndex',

    data: () => ({
      expandOnHover: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Created At',
          value: 'created_at',
        },
      ],
      items: [],
      options: {},
      total: 0,
      loading: true,
    }),
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.items = data.items
              this.total = data.total
            })
        },
        deep: true,
      },
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve, reject) => {
          const { sortBy, sortDesc, page, itemsPerPage } = this.options
          // console.log({ sortBy, sortDesc, page, itemsPerPage })
          // let items = this.getItems(this.options)

          getData({ sortBy, sortDesc, page, itemsPerPage })
            .then(data => {
              if (data) {
                let items = data

                const total = items.length

                if (sortBy.length === 1 && sortDesc.length === 1) {
                  items = items.sort((a, b) => {
                    const sortA = a[sortBy[0]]
                    const sortB = b[sortBy[0]]

                    if (sortDesc[0]) {
                      if (sortA < sortB) return 1
                      if (sortA > sortB) return -1
                      return 0
                    } else {
                      if (sortA < sortB) return -1
                      if (sortA > sortB) return 1
                      return 0
                    }
                  })
                }

                if (itemsPerPage > 0) {
                  items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                }

                setTimeout(() => {
                  this.loading = false
                  resolve({
                    items,
                    total,
                  })
                }, 1000)
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
      },
      getItems (options) {
        getData(options)
          .then(data => {
            if (data) {
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
    },
  }
</script>
