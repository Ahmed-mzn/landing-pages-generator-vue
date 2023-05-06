<template>
    <div>
        <b-card>
            <account-setting-domains />
        </b-card>
    </div>
</template>


<script>
import AccountSettingDomains from '@/views/account-setting/AccountSettingDomains.vue'
import { BCard } from 'bootstrap-vue';
export default {
    components: {
        AccountSettingDomains,
        BCard
    }
}
</script>