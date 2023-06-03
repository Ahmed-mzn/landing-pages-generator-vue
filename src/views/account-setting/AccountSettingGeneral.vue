<template>
    <div>
        <b-card>
            <account-setting-ship />
        </b-card>

        <b-card>
            <account-setting-password />
        </b-card>
    </div>
</template>

<script>
import { BTabs, BTab, BCard } from 'bootstrap-vue'
import AccountSettingPassword from './components/AccountSettingPassword.vue'
import AccountSettingShip from './components/AccountSettingShip.vue'
export default {
    components: {
        AccountSettingPassword, AccountSettingShip,
        BTabs, BTab, BCard
    }
}
</script>