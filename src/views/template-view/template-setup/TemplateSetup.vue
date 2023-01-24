<template>
    <div>
        <form-wizard
            color="#7367F0"
            :title="null"
            :subtitle="null"
            shape="square"
            finish-button-text="إرسال"
            next-button-text="التالي"
            back-button-text="السابق"
            class="mb-3"
        >
            <tab-content
                title="الصور"
                icon="feather icon-image"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            الصور
                        </h5>
                        <small class="text-muted">
                            أدخل الصور
                        </small>
                        <template-setting-images :template="template" />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="1" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="البيانات الأساسية"
                icon="feather icon-align-center"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            البيانات الأساسية
                        </h5>
                        <small class="text-muted">
                            أدخل البيانات الأساسية
                        </small>
                        <template-setting-general :provider="'TemplateSetup'" :template="template" />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="1" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="المنتجات"
                icon="feather icon-shopping-bag"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            المنتجات
                        </h5>
                        <small class="text-muted">
                            أدخل المنتجات
                        </small>
                        <template-setting-products :template="template" />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="1" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="الميزات"
                icon="feather icon-star"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            الميزات
                        </h5>
                        <small class="text-muted">
                            أدخل الميزات
                        </small>
                        <template-setting-features/>
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="1" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="تقييمات العملاء"
                icon="feather icon-users"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            تقييمات العملاء
                        </h5>
                        <small class="text-muted">
                            أدخل تقييمات العملاء
                        </small>
                        <template-setting-reviews />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="1" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
        </form-wizard>
    </div>
</template>

<script>
import TemplateSettingFeatures from '../template-setting/TemplateSettingFeatures.vue'
import TemplateSettingImages from '../template-setting/TemplateSettingImages.vue'
import TemplateSettingGeneral from '../template-setting/TemplateSettingGeneral.vue'
import TemplateSettingPreview from '../template-setting/TemplateSettingPreview.vue'
import TemplateSettingProducts from '../template-setting/TemplateSettingProducts.vue'
import TemplateSettingReviews from '../template-setting/TemplateSettingReviews.vue'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink } from 'bootstrap-vue'

import { FormWizard, TabContent } from 'vue-form-wizard'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
export default {
    components:{ 
        TemplateSettingFeatures, TemplateSettingImages, TemplateSettingGeneral, TemplateSettingPreview, 
        TemplateSettingProducts, TemplateSettingReviews, 
        ValidationProvider, ValidationObserver, FormWizard, TabContent, ToastificationContent,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink
    },
    data(){
        return {
            template: {}
        }
    },
    created(){
        this.getTemplate();
    },
    methods:{
        getTemplate(){
            axios.get(`/templates/${this.$route.params.id}`)
            .then((response) => {
                this.template = response.data
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        }
    }
}
</script>

<style lang="scss">
    @import '~@core/assets/fonts/feather/iconfont.css';
    @import '~@core/scss/vue/libs/vue-wizard.scss';
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>