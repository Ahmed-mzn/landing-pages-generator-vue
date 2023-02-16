<template>
    <div class="mt-2">
        <b-overlay
            :show="showLoader"
            opacity="1"
            spinner-variant="primary"
            variant="white"
            rounded="lg"
        >
            <h2 class="mb-2">صفحات الهبوط المؤرشفة</h2>
            <b-alert
                variant="warning"
                :show="templates.length == 0"
            >
                <div class="alert-body">
                    <span><strong>عفوًا ،!</strong> لا يوجد عنصر لإعادة تنشيطه.</span>
                </div>
            </b-alert>
            <b-row>
                <b-col class="mb-2" cols="6" xl="3" lg="3" md="4" v-for="t in templates" :key="t.id">
                    <b-card
                        class="mb-0"
                        no-body
                    >
                        <b-card-header>
                            <h6>{{handleTemplateName(t.template_name) + ' صفحة '}}</h6>
                        </b-card-header>
                        <b-card-body>
                            <b-link :to="getTemplateRoute(t)">
                                <b-img
                                    fluid
                                    class="mb-1"
                                    :src="require('@/assets/images/pages/skeleton400_still.gif')"
                                />
                            </b-link>
                            <b-card-text>
                                <small class="text-muted">{{moment(t.updated_at).locale('ar').startOf('day').fromNow()}}</small>
                                <b-button
                                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    v-b-tooltip.hover.v-primary
                                    title="اعادة تفعيل"
                                    variant="flat-primary"
                                    class="btn-icon rounded-circle float-right"
                                    size="sm"
                                    @click="showModal(t)"
                                    
                                >
                                    <feather-icon icon="EyeOffIcon" />
                                </b-button>
                            </b-card-text>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
        </b-overlay>

        <!-- reactive template modal -->
        <b-modal
            v-model="showDomainModal"
            id="modal-center"
            centered
            size="lg"
            cancel-variant="outline-secondary"
            title="اعادة تفعيل الصفحة"
            cancel-title="إلغاء"
            ok-title="اعادة تفعيل"
            @hidden="resetModalUpdateDomain"
            @ok="handleOkUpdateDomain"
        >
        <validation-observer ref="simpleRules3">
            <b-form @submit.prevent="handleOkUpdateDomain" class="mt-1 mb-3">
                <b-row>
                    <b-col cols="12">
                        <b-alert
                            variant="primary"
                            show
                        >
                            <h4 class="alert-heading">
                                إشعار
                            </h4>
                            <div class="alert-body">
                                <span>الرجاء إختيارا نطاق جديد من أجل اعادة تفعيل الصفحة</span>
                            </div>
                        </b-alert>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="تريد إضافة نطاق خاص بك؟">
                            <b-form-radio-group
                                v-model="templateForm.domain.type"
                                :options="DomainOptions"
                                @change="domainTypeChange"
                                class="demo-inline-"
                                name="radio-inline"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" v-if="templateForm.domain.type == 'custom'">
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
                                id="largeInput" v-model="templateForm.domain.name" placeholder="مثال: store.com"
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
                                id="largeInput" v-model="templateForm.domain.name" placeholder="اسم النطاق"
                                />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group
                            label="اسم الصفحة"
                            label-for="largeInput"
                        >
                            <validation-provider
                            #default="{ errors }"
                            name="اسم الصفحة"
                            >
                                <b-input-group aria-label="aaa" size="lg" :append="'/https://'+templateForm.domain.name">
                                    <b-form-input
                                        :state="errors.length > 0 ? false:null"
                                        id="largeInput" v-model="templateForm.template_name" readonly placeholder="اسم الصفحة"
                                    />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                </b-row>
                <button class="d-none" type="submit">s</button>
            </b-form>
        </validation-observer>
        </b-modal>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'

import { required, url, domain, alphaNumDash, domainExist, domainExist2 } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup, VBTooltip
} from 'bootstrap-vue'
import axios from 'axios'
export default {
    components: { 
        ToastificationContent, ValidationProvider,  ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BAvatar,
        BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
        BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup,
        BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup
    },
    directives: {
        'b-modal': VBModal,
        'b-tooltip': VBTooltip,
        Ripple
    },
    data() {
        return {
            showLoader: true,
            templates: [],
            DomainOptions: [
                { text: 'نعم', value: 'custom' },
                { text: 'لا', value: 'normal' }
            ],
            templateForm:{
                template: null,
                domain: {
                    name: '',
                    type: ''
                },
                template_name: ''
            },
            showDomainModal: false,
            required, url, domain, alphaNumDash, domainExist, domainExist2
        }
    },
    mounted(){
        localize('ar');
        this.getTemplates();
    },
    methods: {
        showModal(template){
            this.templateForm.template_name = template.template_name
            this.templateForm.template = template.id
            this.templateForm.domain.type = 'normal'
            this.showDomainModal = true
        },
        handleOkUpdateDomain(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.$refs.simpleRules3.validate().then(success => {
                if (success) {
                    this.activeTemplate()
                }
            })
        },
        resetModalUpdateDomain(){
            this.templateForm.template_name = ''
            this.templateForm.domain.name = ''
            this.templateForm.domain.type = 'normal'
        },
        domainTypeChange(){
            this.templateForm.domain.name = ''
            this.$refs.simpleRules3.reset();
        },
        activeTemplate(){
            axios.post("/templates/archive", this.templateForm)
            .then(response => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تمت اعادة تفعيل صفحة الهبوط بنجاح.',
                        variant: 'success',
                    },
                })
                this.getTemplates();
                this.showDomainModal = false
                setTimeout(() => {
                    this.$router.push({name: 'templates', params: {id: response.data.id}})
                }
                , 500);
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء اعادة تفعيل صفحة الهبوط.',
                    variant: 'danger',
                    },
                })
                console.log(JSON.stringify(error));
            })
        },
        handleTemplateName(name){
            if(name){
                if (name.length > 7) {
                    return '...' + name.substring(0,7);
                } else {
                    return name
                }
            }
        },
        getTemplateRoute(template){
            if(template.main_image == null || template.medals_image == null || 
                template.second_image == null || template.meta_title == '' || 
                template.customer_website == '' || template.primary_color == '' ||
                template.review_text == '' || template.description == ''
                || template.features.length == 0 || template.products.length == 0
                || template.reviews.length == 0){
                return {name: 'templates-setup', params: {id: template.id}}
            }
            else{
                return {name: 'templates', params: {id: template.id}}
            }
        },
        getTemplates(){
            axios.get("/templates/archive")
            .then(response => {
                this.templates = response.data
                setTimeout(() => {
                    this.showLoader = false;
                }
                , 500);
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            })
        }
    }
}
</script>