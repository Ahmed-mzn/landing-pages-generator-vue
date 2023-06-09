<template>
    <div>
        <form-wizard
            color="#7367F0"
            :title="null"
            :subtitle="null"
            layout="vertical"
            finish-button-text="إرسال"
            next-button-text="التالي"
            back-button-text="السابق"
            class="wizard-vertical mb-3"
        >
            <tab-content
                title="البيانات الأساسية"
                icon="feather icon-info"
                :before-change="validationGeneral"
            >
                <b-row>
                    <b-col
                        cols="12"
                        class="mb-2"
                    >
                        <h5 class="mb-0">
                            البيانات الأساسية
                        </h5>
                        <small class="text-muted">
                            أعط صفحتك اسم و نطاق خاص بها.
                        </small>
                    </b-col>
                    <b-col cols="12">
                        <validation-observer ref="simpleRules3">
                            <b-form class="mt-1 mb-3">
                            <b-row>
                                <b-col cols="12">
                                    <label class="label">اختر النطاق</label>
                                </b-col>
                                <b-col cols="10">
                                    <b-form-group> 
                                        <validation-provider
                                            #default="{ errors }"
                                            name="اختر نطاق"
                                            rules="required"
                                        >
                                            <v-select
                                                v-model="templateForm.domain"
                                                :state="errors.length > 0 ? false:null"
                                                :dir="'rtl'"
                                                label="name"
                                                :options="domains"
                                            />
                                            <small class="text-danger">{{ errors[0] }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col cols="2">
                                    <b-button
                                        variant="primary"
                                        block
                                        class="btn-icon"
                                        @click="addModalShow = true"
                                    >   
                                        <span>إضافة نطاق</span>
                                        <feather-icon icon="PlusIcon" />
                                    </b-button>
                                </b-col>
                                <b-col cols="12">
                                    <b-form-group
                                        label="اسم الصفحة"
                                        label-for="largeInput"
                                    >
                                        <validation-provider
                                            #default="{ errors }"
                                            name="اسم الصفحة"
                                            rules="required|alphaNumDash"
                                            vid="template_name"
                                        >
                                        <b-input-group aria-label="aaa" :append="getAppendDomain">
                                            <b-form-input
                                                dir="ltr"
                                                :state="errors.length > 0 ? false:null"
                                                id="largeInput" v-model="templateForm.template_name" placeholder="اسم الصفحة"
                                            />
                                        </b-input-group>
                                        <small class="text-danger">{{ errors[0] }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            </b-form>
                        </validation-observer>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="المجال (إختياري)"
                icon="feather icon-list"
            >
                <b-row>
                    <b-col
                        cols="12"
                        class="mb-2"
                    >
                        <h5 class="mb-0">
                            المجال (إختياري)
                        </h5>
                        <small class="text-muted">
                            اختر المجال الخاص بك.
                        </small>
                    </b-col>
                    <b-col cols="12">
                        <section id="feather-icons">
                            <div class="icon-search-wrapper my-3 mx-auto">
                                <b-form-group>
                                    <b-input-group class="input-group-merge">
                                    <b-input-group-prepend is-text>
                                        <feather-icon icon="SearchIcon" />
                                    </b-input-group-prepend>
                                    <b-form-input
                                        id="icons-search"
                                        v-model="seachQuery"
                                        placeholder="بحث مجال..."
                                    />
                                    </b-input-group>
                                </b-form-group>
                            </div>
                            <div
                                id="icons-container"
                                class="d-flex flex-wrap justify-content-center"
                            >
                                <b-card
                                    v-for="icon in filterIcons"
                                    :key="icon"
                                    class="icon-card cursor-pointer text-center mb-2 mx-50"
                                    :class="templateForm.category == icon ? 'popular' : ''"
                                    @click="selectCategory(icon)"
                                >
                                    <div class="icon-wrapper">
                                        <feather-icon
                                            :icon="icon"
                                            size="24"
                                        />
                                    </div>
                                    <b-card-text class="icon-name text-truncate mb-0 mt-1">
                                    {{ icon }}
                                    </b-card-text>
                                </b-card>
                            </div>
                        </section>
                    </b-col>
                </b-row>
            </tab-content>
            <tab-content
                title="اختيار نموذج"
                icon="feather icon-check"
                :before-change="alwaysFalse"
            >
                <b-row>
                    <b-col cols="12">
                        <b-row>
                            <b-col cols="2">
                                <b-form-group label="Category">
                                    <b-form-checkbox
                                        v-for="category in categories"
                                        :key="category.id"
                                        v-model="selected"
                                        :value="category.id"
                                        name="flavour-3a"
                                        class="mt-1"
                                    >
                                        {{ category.name }}
                                    </b-form-checkbox>
                                </b-form-group>
                            </b-col>
                            <b-col cols="10">
                                <b-row align-v="start" align-h="start">
                                    <b-col class="mt-2" cols="4" v-for="theme in themes" :key="theme.id">
                                        <b-link @mouseenter="selectTheme(theme)" @mouseleave="resetTheme">
                                            <b-overlay rounded="sm" opacity="0.98" :show="theme.id == templateForm.theme" variant="transparent" >
                                                <b-img class="theme" :src="theme.image_url" fluid alt="Responsive image" />
                                                <template #overlay>
                                                    <div class="text-center">
                                                        <b-button
                                                            variant="primary" size="sm"
                                                            @click="createTemplate"
                                                        >
                                                            <feather-icon
                                                                icon="PlusCircleIcon"
                                                                class="mr-50"
                                                            />
                                                            <span class="align-middle">استخدم النموذج</span>
                                                        </b-button><br>
                                                        <b-button @click="previewTheme(theme)" variant="outline-primary" class="mt-1" size="sm" >معاينة</b-button>
                                                    </div>
                                                </template>
                                            </b-overlay>
                                        </b-link>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </tab-content>
        </form-wizard>
        <b-modal
            id="modal-scrollable"
            scrollable
            size="xl"
            title="معاينة النموذج"
            title-tag="h3"
            cancel-title="إلغاء"
            ok-title="استخدم النموذج"
            cancel-variant="outline-secondary"
            v-model="showPreviewThemeModal"
        >
            <b-row>
                <b-col cols="12">
                    <template-setting-preview :app_id="id"/>
                </b-col>
            </b-row>
        </b-modal>

        
        <!-- add domain modal -->
        <b-modal
            v-model="addModalShow"
            id="modal-center"
            centered
            size="lg"
            cancel-variant="outline-secondary"
            title="إضافة نطاق جديدة"
            cancel-title="إلغاء"
            ok-title="إنشاء"
            @hidden="resetModalAddDomain"
            @ok="handleOkAddDomain"
        >
            <validation-observer ref="simpleRules4">
                <b-form class="mt-1 mb-3">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group label="تريد إضافة نطاق خاص بك؟">
                                <b-form-radio-group
                                    v-model="domainForm.type"
                                    :options="DomainOptions"
                                    @change="domainTypeChange"
                                    class="demo-inline-"
                                    name="radio-inline"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="domainForm.type == 'custom'">
                            <b-form-group
                                label="اسم النطاق"
                                label-for="largeInput"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="اسم النطاق"
                                    rules="required|domain|domainExist"
                                >
                                    <b-input-group aria-label="aaa" size="lg" >
                                        <b-form-input
                                            :state="errors.length > 0 ? false:null"
                                            id="largeInput" v-model="domainForm.name" placeholder="مثال: store.com"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-else>
                            <b-form-group
                                label="اسم النطاق"
                                label-for="largeInput"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="اسم النطاق"
                                    rules="required|alphaNumDash|domainExist2"
                                >
                                    <b-input-group aria-label="aaa" append="//:https" prepend="sfhat.io" size="lg" >
                                        <b-form-input
                                        :state="errors.length > 0 ? false:null"
                                        id="largeInput" v-model="domainForm.name" placeholder="اسم النطاق"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <h1 class="mb-2">اختر الفئة</h1>
                    <b-card no-body class="p-1 popular">
                        <b-link>
                        <b-row class="d-flex flex-row">
                            <b-col cols="10">
                            <b-media>
                                <template #aside>
                                <b-avatar
                                    rounded
                                    variant="light-info"
                                    size="55"
                                >
                                    <feather-icon size="25" icon="BriefcaseIcon" />
                                </b-avatar>
                                </template>
                                <h6 class="media-heading ">
                                صفحة هبوط عروض أفقيًا
                                </h6>
                                <small class="text-muted">
                                وصف هنا أيضا.
                                </small>
                            </b-media>
                            </b-col>
                            <b-col cols="2" class="align-self-center">
                            <b-form-radio
                                name="some-radios"
                                value="template_one"
                            />
                            </b-col>
                        </b-row>
                        </b-link>
                    </b-card>
                    <b-card no-body class="p-1" >
                        <b-link>
                        <b-row class="d-flex flex-row ">
                            <b-col cols="10">
                            <b-media>
                                <template #aside>
                                <b-avatar
                                    rounded
                                    variant="light-warning"
                                    size="55"
                                >
                                    <feather-icon size="25" icon="ShoppingBagIcon" />
                                </b-avatar>
                                </template>
                                <h6 class="media-heading">
                                صفحة هبوط عروض عموديا
                                </h6>
                                <small class="text-muted">
                                وصف هنا أيضا.
                                </small>
                            </b-media>
                            </b-col>
                            <b-col cols="2" class="align-self-center">
                            <b-form-radio
                                name="some-radios"
                                value="template_two"
                            />
                            </b-col>
                        </b-row>
                        </b-link>
                    </b-card>
                    <button class="d-none" type="submit">s</button>
                </b-form>
            </validation-observer>
        </b-modal>
    </div>
</template>

<script>
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BTabs, BTab, BInputGroupPrepend, BFormCheckboxGroup, BFormCheckbox,
    BFormRadio, BMedia,
    BInputGroup, BFormInput, BFormGroup, BFormRadioGroup, BForm, BImg, BOverlay, BModal, VBModal } from 'bootstrap-vue'

import { FormWizard, TabContent } from 'vue-form-wizard'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required, url, domain, alphaNumDash, domainExist, domainExist2 } from '@validations'

import TemplateSettingPreview from './template-view/template-setting/TemplateSettingPreview.vue'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import vSelect from 'vue-select'
export default {
    components:{
        ValidationProvider, ValidationObserver, FormWizard, TabContent, ToastificationContent, TemplateSettingPreview,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BTabs, BTab, BImg, BOverlay, BModal, VBModal, vSelect,
        BInputGroup, BFormInput, BFormGroup, BFormRadioGroup, BForm, BInputGroupPrepend, BFormCheckboxGroup, BFormCheckbox,
        BFormRadio, BMedia,
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
            addModalShow: false,
            id: 30,
            domainForm: {
                id: 0,
                name: '',
                type: 'custom'
            },
            showPreviewThemeModal: false,
            DomainOptions: [
                { text: 'نعم', value: 'custom' },
                { text: 'لا', value: 'normal' }
            ],
            templateForm:{
                app: null,
                category: '',
                theme: 0,
                domain: null,
                template_code: 'template_one',
                template_name: '',
            },
            domains: [],
            themes: [],
            categories: [],
            selected: [],
            seachQuery: '',
            icons: ['ShieldIcon','ShoppingBagIcon','ShoppingCartIcon','ShuffleIcon','SidebarIcon','SkipBackIcon','SkipForwardIcon','SlackIcon','SlashIcon','SlidersIcon','SmartphoneIcon','SmileIcon','SpeakerIcon','SquareIcon','StarIcon','UserCheckIcon','UserMinusIcon','UserPlusIcon',],
            required,
            url,
            domain,
            alphaNumDash,
            domainExist,
            domainExist2
        }
    },
    computed: {
        filterIcons() {
            const seachQueryIcon = this.seachQuery.toLowerCase()
            return this.icons.filter(item => item.toLowerCase().includes(seachQueryIcon))
        },
        getAppendDomain(){
            if(this.templateForm.domain){
                return '/https://'+this.templateForm.domain.name
            }
            return '/https://'
        },
    },
    mounted(){
        localize('ar');
        this.getThemes()
        this.getCategories()
        this.getDomains()
    },
    methods: {
        createTemplate(){
            const data = {
                domain: this.templateForm.domain.id,
                theme: this.templateForm.theme,
                template_code: 'template_one',
                template_name: this.templateForm.template_name
            }

            axios.post("/templates/", data)
            .then(response => {
                if(response.status == 400 || response.status == 500){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء إضافة صفحة الهبوط.',
                        variant: 'danger',
                        },
                    })
                } else{
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إشعار',
                            icon: 'CheckIcon',
                            text: 'تم إضافة صفحة الهبوط بنجاح.',
                            variant: 'success',
                        },
                    })
                    this.$router.push({name: 'editor', params: {id: response.data.id}})   
                }
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء إضافة صفحة الهبوط.',
                    variant: 'danger',
                    },
                })
                console.log(error);
            })
        },
        validationGeneral(){
            return new Promise((resolve, reject) => {
                this.$refs.simpleRules3.validate().then(success => {
                    if(success){
                        axios.post(`/domains/${this.templateForm.domain.id}/check_template_name/`, {template_name: this.templateForm.template_name})
                        .then(response => {
                            if (response.data.result){
                                this.$refs.simpleRules3.setErrors({template_name: ['اسم الصفحة مأخوذ الرجاء اختيار واحد آخر']});
                                reject();
                            } else {
                                resolve(true);
                            }
                        })
                        .catch(error => {
                            reject();
                            console.log(error);
                        })
                    }
                    else {
                        reject();
                    }
                })
            })
        },
        alwaysFalse(){
            return new Promise((resolve, reject) => {
                reject();
            })
        },
        previewTheme(theme){
            this.showPreviewThemeModal = true
            this.templateForm.theme = theme.id
        },
        getDomains(){
            axios.get("/domains")
            .then(response => {
                this.domains = response.data
                if (response.data.length != 0 ){
                    this.templateForm.domain = response.data[0]
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        getThemes(){
            axios.get("/themes")
            .then(response => {
                this.themes = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        getCategories(){
            axios.get("/themes/categories")
            .then(response => {
                this.categories = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        domainTypeChange(){
            this.templateForm.domain.name = ''
            this.$refs.simpleRules3.reset();
        },
        selectCategory(icon){
            this.templateForm.category = icon
        },
        selectTheme(theme){
            this.templateForm.theme = theme.id
        },
        resetTheme(){
            this.templateForm.theme = 0
        },
        createDomain(){
            axios.post('/domains/', this.domainForm)
            .then(response => {
                if(response.status == 400 || response.status == 500){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء إضافة النطاق.',
                        variant: 'danger',
                        },
                    })
                } else{
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إشعار',
                            icon: 'CheckIcon',
                            text: 'تم إضافة النطاق بنجاح.',
                            variant: 'success',
                        },
                    })
                    this.getDomains();
                    this.addModalShow = false
                }
            })
            .catch(error => {
                console.log(error);
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء إضافة النطاق.',
                    variant: 'danger',
                    },
                })
            })
        },
        handleOkAddDomain(bvModalEvt){
            bvModalEvt.preventDefault()

            this.$refs.simpleRules4.validate().then(success => {
                if (success) {
                    this.createDomain()
                }
            })
        },
        resetModalAddDomain(){
            this.domainForm.name = ''
            this.domainForm.type = 'custom'
        },
        domainTypeChange(){
            this.domainForm.name = ''
            this.$refs.simpleRules4.reset()
        }
    }
}
</script>
<style>
.popular { border: 1px solid #7367f0 !important;color: #7367f0; }
.theme { border: 1px solid rgba(0,0,0,.1) !important; border-radius: 3px; }

</style>
<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
    @import '~@core/assets/fonts/feather/iconfont.css';
    @import '~@core/scss/vue/libs/vue-wizard.scss';
    @import '~@core/scss/vue/libs/vue-select.scss';
    @import '@core/scss/vue/pages/ui-feather.scss';
</style>