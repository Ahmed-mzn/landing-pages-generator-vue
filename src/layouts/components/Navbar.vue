<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{$store.state.auth.user.full_name}}
            </p>
            <span class="user-status">Customer</span>
          </div>
          <!-- <b-avatar
            variant="light-primary"
            badge
          /> -->
          <b-avatar
            variant="light-primary"
            class="mr-1 badge-minimal"
            size="40px"
            badge
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Profile</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="MailIcon"
            class="mr-50"
          />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="CheckSquareIcon"
            class="mr-50"
          />
          <span>Task</span>
        </b-dropdown-item>

        <b-dropdown-item :to="{name: 'account-setting'}" link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="SettingsIcon"
            class="mr-50"
          />
          <span>???????????? ????????????</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item @click="logout()" link-class="d-flex align-items-center">
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>?????????? ????????</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import axios from 'axios'
export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  methods:{
    async logout() {
        await axios
          .post('/token/logout/')
          .then(response => {
            console.log('Logged out')
          })
          .catch(error => {
              console.log(JSON.stringify(error))
          })
        
        axios.defaults.headers.common['Authorization'] = ''
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('userid')
        localStorage.removeItem('fullname')
        localStorage.removeItem('phonenumber')
        this.$store.commit('auth/removeToken')
        this.$router.push('/login')
    }
  }
}
</script>
