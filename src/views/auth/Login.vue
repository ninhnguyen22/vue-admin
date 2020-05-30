<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form
                  id="main-form"
                  ref="form"
                  v-model="valid"
                  @submit.prevent="handleForm"
                >
                  <p class="font-italic">
                    {{ getError }}
                  </p>
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    :rules="rules.email"
                  />

                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="rules.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  type="submit"
                  form="main-form"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { login } from '@/api/auth'
  import { setToken } from '../../util/auth'
  import { getNotify, resetNotify } from '@/util/notify'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      valid: true,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          v => !!v || 'Email is required',
        ],
        password: [
          v => !!v || 'Password is required',
        ],
      },
    }),
    computed: {
      getError () {
        const { show, message } = getNotify()
        if (show) {
          return message
        }
        return ''
      },
    },
    methods: {
      handleForm () {
        if (this.$refs.form.validate()) {
          // api
          login(this.form)
            .then(data => {
              if (data.access_token) {
                resetNotify()
                setToken(data.access_token)
                this.$router.push('/')
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
    },
  }
</script>
