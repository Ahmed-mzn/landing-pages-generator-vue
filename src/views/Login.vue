<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          سوشيال بوت
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            مرحبا في سوشيال بوت! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            الرجاء تسجيل الدخول إلى حسابك وبدء المغامرة
          </b-card-text>

          <b-alert
            show
            variant="danger"
            v-if="hasError"
          >
            <div class="alert-body">
              <feather-icon
                class="mr-25"
                icon="AlertCircleIcon"
              />
              <span class="ml-25">يرجى التحقق من البريد الإلكتروني وكلمة المرور!</span>
            </div>
          </b-alert>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
              <!-- email -->
              <b-form-group
                label="البريد الإلكتروني"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="البريد الإلكتروني"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">كلمة المرور</label>
                  <b-link :to="{name:'auth-forgot-password-v2'}">
                    <small>هل نسيت كلمة السر ؟</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="كلمة المرور"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
              >
                تسجيل الدخول
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>جديد على منصتنا؟ </span>
            <b-link :to="{name:'page-auth-register-v2'}">
              <span>&nbsp;انشئ حساب</span>
            </b-link>
          </b-card-text>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">
              أو
            </div>
          </div>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BAlert, BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      hasError: false,
      status: '',
      password: '',
      userEmail: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
    }
  },
  mounted(){
    localize('ar');
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validationForm() {
      
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          axios.defaults.headers.common['Authorization'] = ''
          localStorage.removeItem('token')

          const formData = {
              email: this.userEmail,
              password: this.password
          }
          axios.post('/token/login/', formData)
          .then(response => {
            const token = response.data.auth_token
            this.$store.commit('auth/setToken', token)
            axios.defaults.headers.common['Authorization'] = 'Token ' + token
            localStorage.setItem('token', token)

            axios.get('/authentication/me')
            .then(response => {
              console.log(response);
                this.$store.commit('auth/setUser', 
                  {
                    'id': response.data.id,
                    'email': response.data.email,
                    'full_name': response.data.full_name,
                    'phone_number': response.data.phone_number
                  }
                )
                localStorage.setItem('email', response.data.username)
                localStorage.setItem('fullname', response.data.full_name)
                localStorage.setItem('phonenumber', response.data.phone_number)
                localStorage.setItem('userid', response.data.id)

                this.$router
                .push('/')
                .then(() => { this.$router.go() });
            })
            .catch(error => {
              console.log(error)
            })
          })
          .catch(error => {
            if (error.response) {
              this.hasError = true;
            } else if (error.message) {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'حدث خطأ!',
                  text: 'هناك خطأ ما. حاول مرة اخرى',
                  variant: 'danger',
                  icon: 'AlertCircleIcon'
                },
              })
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
