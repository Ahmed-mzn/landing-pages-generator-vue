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
                                label="العنوان الرئيسي"
                                label-for="meta_title"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="العنوان الرئيسي"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="template.meta_title"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="العنوان الرئيسي"
                                    id="meta_title"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                label="رابط الموقع الرئيسي"
                                label-for="customer_website"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="رابط الموقع الرئيسي"
                                rules="required|url"
                                >
                                <b-form-input
                                    id="customer_website"
                                    v-model="template.customer_website"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="رابط الموقع الرئيسي"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                label="عنوان نص المراجعة"
                                label-for="review_text"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="عنوان نص المراجعة"
                                rules="required"
                                >
                                <b-form-input
                                    id="review_text"
                                    v-model="template.review_text"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="عنوان نص المراجعة"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="12">
                            <b-form-group
                                label="وصف قصير"
                                label-for="description"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="وصف قصير"
                                rules="required"
                                >
                                <b-form-textarea
                                    id="description"
                                    v-model="template.description"
                                    rows="3"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="وصف قصير"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                            <b-form-group
                                label="لوان الأساسية"
                                label-for="primary_color"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="لوان الأساسية"
                                rules="required"
                                >
                                <b-form-input
                                    id="primary_color"
                                    v-model="template.primary_color"
                                    :state="errors.length > 0 ? false:null"
                                    type="color"
                                    placeholder="لوان الأساسية"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                            <b-form-group
                                label="لوان ثانوية"
                                label-for="secondary_color"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="ألوان ثانوية"
                                rules="required"
                                >
                                <b-form-input
                                    id="secondary_color"
                                    v-model="template.secondary_color"
                                    :state="errors.length > 0 ? false:null"
                                    type="color"
                                    placeholder="لوان الأساسية"
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
                                v-show="!provider"
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
    BFormInput, BFormGroup, BForm, BFormTextarea, BOverlay
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import { required } from '@validations'
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
        BOverlay
    },
    props: {
        template: {
            type: Object,
            default: () => {},
        },
        provider: {
            type: String,
            default: () => '',
        }
    },
    data(){
        return {
            showFormLoader: false,
            required,
        }
    },
    created(){
        localize('ar');
    },
    methods: {
        validateSetup(){
            this.submitForm();
            if (this.template.meta_title == '' || this.template.customer_website == '' || this.template.primary_color == '' ||
                this.template.review_text == '' || this.template.description == '' || this.template.secondary_color == ''){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: 'إنذار',
                            icon: 'AlertCircleIcon',
                            text: 'هناك خطأ، الرجاء إدخال جميع البيانات الأساسية.',
                            variant: 'danger',
                        },
                    })
                return false;
            } else {
                return true;
            }
        },
        submitForm() {
            this.showFormLoader = true;
            this.$refs.simpleRules.validate().then(success => {
                if (success) {
                    const data = {
                        meta_title: this.template.meta_title,
                        customer_website: this.template.customer_website,
                        review_text: this.template.review_text,
                        description: this.template.description,
                        primary_color: this.template.primary_color,
                        secondary_color: this.template.secondary_color
                    }
                    
                    axios.patch(`/templates/${this.template.id}/`, data)
                    .then((response) => {
                        this.$emit('reloadComp')
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث البيانات الأساسية بنجاح.',
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
                                text: 'هناك خطأ أثناء تحديث البيانات الأساسية.',
                                variant: 'danger',
                            },
                        })
                        this.showFormLoader = false;
                        console.log(JSON.stringify(error))
                    })
                } else {
                    this.showFormLoader = false;
                }
            })
        },
    }
}
</script>