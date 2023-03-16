<template>
    <b-tabs
        vertical
        content-class="col-12 col-md-9 mt-1 mt-md-0"
        pills
        nav-wrapper-class="col-md-3 col-12"
        nav-class="nav-left"
    >
        <!-- general tab -->
        <b-tab lazy active>
            <!-- title -->
            <template #title>
                <feather-icon
                icon="UserIcon"
                size="18"
                class="mr-50"
                />
                <span class="font-weight-bold">الإعدادات العامة</span>
            </template>
            <account-setting-general />
        </b-tab>
        <!--/ general tab -->

        <!-- change password tab -->
        <b-tab lazy>
            <template #title>
                <feather-icon
                    icon="AtSignIcon"
                    size="18"
                    class="mr-50"
                />
                <span class="font-weight-bold">النطاقات</span>
            </template>
            <b-card>
                <account-setting-domains />
            </b-card>
        </b-tab>
        <!--/ change password tab -->

        <!-- products -->
        <b-tab lazy>
            <!-- title -->
            <template #title>
                <feather-icon
                icon="ShoppingBagIcon"
                size="18"
                class="mr-50"
                />
                <span class="font-weight-bold">المنتجات</span>
            </template>
            <b-card title="المنتجات">
                <account-setting-products />
            </b-card>
        </b-tab>

        <!-- cities -->
        <b-tab lazy>
            <!-- title -->
            <template #title>
                <feather-icon
                icon="MapIcon"
                size="18"
                class="mr-50"
                />
                <span class="font-weight-bold">مدن الشحن</span>
            </template>
            <b-card title="مدن الشحن">
                <account-setting-cities />
            </b-card>
        </b-tab>

        <!-- archive -->
        <b-tab lazy>
            <!-- title -->
            <template #title>
                <feather-icon
                icon="EyeOffIcon"
                size="18"
                class="mr-50"
                />
                <span class="font-weight-bold">أرشيف</span>
            </template>

            <account-setting-archive />
        </b-tab>
    </b-tabs>
</template>

<script>
import { BTabs, BTab, BCard } from 'bootstrap-vue'
import AccountSettingGeneral from './AccountSettingGeneral.vue'
import AccountSettingProducts from './AccountSettingProducts.vue'
import AccountSettingDomains from './AccountSettingDomains.vue'
import AccountSettingCities from './AccountSettingCities.vue'
import AccountSettingArchive from './account-setting-archive/AccountSettingArchive.vue'

export default {
    components: {
        BTabs,
        BTab,
        BCard,
        AccountSettingGeneral,
        AccountSettingProducts,
        AccountSettingDomains,
        AccountSettingCities,
        AccountSettingArchive
    },
    data() {
        return {
        }
    },
}
</script>
