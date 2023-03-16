<template>
    <div>
        <b-card>
            <account-setting-password />
        </b-card>
    </div>
</template>

<script>
import { BTabs, BTab, BCard } from 'bootstrap-vue'
import AccountSettingPassword from './AccountSettingPassword.vue'
export default {
    components: {
        AccountSettingPassword,
        BTabs, BTab, BCard
    }
}
</script>