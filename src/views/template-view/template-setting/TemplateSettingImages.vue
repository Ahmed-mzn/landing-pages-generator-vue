<template>
    <div class="mt-3">
        <b-overlay
            :show="showFormLoader"
            rounded="sm"
            spinner-variant="primary"
        >
            <!-- form -->
            <validation-observer ref="simpleRules">
                <b-form>
                    <b-row>
                        <b-col md="12">
                            <b-form-group
                                label="صورة الشعار"
                                label-for="logo"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="صورة الشعار"
                                rules="required|url"
                                >
                                <b-form-input
                                    v-model="template.logo"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="أدخل رابط صورة الشعار"
                                    id="logo"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                label="صورة الرئيسية"
                                label-for="main_image"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="صورة الرئيسية"
                                rules="required|url"
                                >
                                <b-form-input
                                    id="main_image"
                                    v-model="template.main_image"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="أدخل رابط صورة الرئيسية"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                label="صورة الميداليات"
                                label-for="medals_image"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="صورة الميداليات"
                                rules="required|url"
                                >
                                <b-form-input
                                    id="medals_image"
                                    v-model="template.medals_image"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="أدخل رابط صورة الميداليات"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                label="صورة الثانوية"
                                label-for="second_image"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="صورة الثانوية"
                                rules="required|url"
                                >
                                <b-form-input
                                    id="second_image"
                                    v-model="template.second_image"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="أدخل رابط صورة الثانوية"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-button
                                variant="primary"
                                type="submit"
                                @click.prevent="submitForm"
                            >
                                احفظ التغييرات
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
        </b-overlay>
    </div>
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab,
    BFormInput, BFormGroup, BForm, BFormTextarea, BImg, BOverlay
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required, url } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'

export default {
    components:{
        ValidationProvider,
        ValidationObserver,
        BCard,
        BCardText,
        BRow,
        BCol,
        BButton,
        BLink,
        BAvatar,
        BBadge,
        BTabs,
        BTab,
        BFormInput,
        BFormGroup,
        BFormTextarea,
        BForm,
        BImg,
        BOverlay
    },
    props: {
        template: {
            type: Object,
            default: () => {},
        }
    },
    data(){
        return {
            showFormLoader: false,
            required,
            url
        }
    },
    created(){
        localize('ar');
    },
    methods: {
        submitForm() {
            this.showFormLoader = true;
            this.$refs.simpleRules.validate().then(success => {
                if (success) {
                    const data = {
                        logo: this.template.logo,
                        main_image: this.template.main_image,
                        medals_image: this.template.medals_image,
                        second_image: this.template.second_image
                    }
                    
                    axios.patch(`/templates/${this.template.id}/`, data)
                    .then((response) => {
                        this.$emit('reloadComp')
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث الصور بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.showFormLoader = false;
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إنذار',
                                icon: 'AlertCircleIcon',
                                text: 'هناك خطأ أثناء تحديث الصور.',
                                variant: 'danger',
                            },
                        })
                        this.showFormLoader = false;
                        JSON.stringify(error)
                    })
                } else {
                    this.showFormLoader = false;
                }
            })
        },
    }
}
</script>