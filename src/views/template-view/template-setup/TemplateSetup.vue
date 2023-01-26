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
            @on-complete="goToTemplate"
        >
            <tab-content
                title="الصور"
                icon="feather icon-image"
                :before-change="validationImages"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            الصور
                        </h5>
                        <small class="text-muted">
                            أدخل الصور
                        </small>
                        <template-setting-images ref="childImages" @reloadComp="reloadComp" :template="template" />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="reloadComponent" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="البيانات الأساسية"
                icon="feather icon-align-center"
                :before-change="validationGeneral"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            البيانات الأساسية
                        </h5>
                        <small class="text-muted">
                            أدخل البيانات الأساسية
                        </small>
                        <template-setting-general ref="childGeneral" :provider="'TemplateSetup'" @reloadComp="reloadComp" :template="template" />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="reloadComponent" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="المنتجات"
                icon="feather icon-shopping-bag"
                :before-change="validationProducts"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            المنتجات
                        </h5>
                        <small class="text-muted">
                            أدخل المنتجات
                        </small>
                        <template-setting-products ref="childProducts" @reloadComp="reloadComp" :template="template" />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview  :key="reloadComponent" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="الميزات"
                icon="feather icon-star"
                :before-change="validationFeatures"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            الميزات
                        </h5>
                        <small class="text-muted">
                            أدخل الميزات
                        </small>
                        <template-setting-features ref="childFeatures" @reloadComp="reloadComp" />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="reloadComponent" :app_id="template.id"/>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="تقييمات العملاء"
                icon="feather icon-users"
                :before-change="validationReviews"
            >
                <b-row>
                    <b-col cols="8">
                        <h5 class="mb-0">
                            تقييمات العملاء
                        </h5>
                        <small class="text-muted">
                            أدخل تقييمات العملاء
                        </small>
                        <template-setting-reviews ref="childReviews" @reloadComp="reloadComp" />
                    </b-col>
                    <b-col cols="4">
                        <template-setting-preview :key="reloadComponent" :app_id="template.id"/>
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
            template: {},
            reloadComponent: 0,
        }
    },
    created(){
        this.getTemplate();
    },
    methods:{
        goToTemplate(){
            this.$router.push(`/templates/${this.template.id}`)
        },
        validationReviews(){
            let t = this.$refs.childReviews.validateSetup();
            return new Promise((resolve, reject) => {
                if(t){
                    resolve(true);
                }
                else {
                    reject();
                }
            })
        },
        validationProducts(){
            let t = this.$refs.childProducts.validateSetup();
            return new Promise((resolve, reject) => {
                if(t){
                    resolve(true);
                }
                else {
                    reject();
                }
            })
        },
        validationFeatures(){
            let t = this.$refs.childFeatures.validateSetup();
            return new Promise((resolve, reject) => {
                if(t){
                    resolve(true);
                }
                else {
                    reject();
                }
            })
        },
        validationGeneral(){
            let t = this.$refs.childGeneral.validateSetup();
            return new Promise((resolve, reject) => {
                if(t){
                    resolve(true);
                }
                else {
                    reject();
                }
            })
        },
        validationImages(){
            let t = this.$refs.childImages.validateSetup();
            return new Promise((resolve, reject) => {
                if(t){
                    resolve(true);
                }
                else {
                    reject();
                }
            })
        },
        getTemplate(){
            axios.get(`/templates/${this.$route.params.id}`)
            .then((response) => {
                this.template = response.data
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        },
        reloadComp(){
            this.reloadComponent += 1;
        }
    }
}
</script>

<style lang="scss">
    @import '~@core/assets/fonts/feather/iconfont.css';
    @import '~@core/scss/vue/libs/vue-wizard.scss';
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>