<template>
    <div>
        <validation-observer ref="simpleRules">
            <b-form @submit.stop.prevent="submitForm">
                <b-row>
                    <b-col cols="12">
                        <div class="d-flex align-items-center mb-2">
                            <feather-icon
                                icon="LockIcon"
                                size="18"
                            />
                            <h4 class="mb-0 ml-75">
                                تغيير كلمة المرور
                            </h4>
                        </div>
                    </b-col>

                    <!-- old password -->
                    <b-col md="12">
                        <b-form-group
                            label="كلمة المرور القديمة"
                            label-for="account-old-password"
                        >
                            <validation-provider
                                #default="{ errors }"
                                name="كلمة المرور القديمة"
                                vid="password_old"
                                rules="required|min:8|password"
                            >
                                <b-input-group :class="errors.length > 0 ? 'is-invalid':null" class="input-group-merge">
                                    <b-form-input
                                        id="account-old-password"
                                        v-model="form.odlPassword"
                                        name="كلمة المرور القديمة"
                                        :state="errors.length > 0 ? false:null"
                                        :type="passwordFieldTypeOld"
                                        placeholder="كلمة المرور القديمة"
                                    />
                                    <b-input-group-append is-text>
                                        <feather-icon
                                        :icon="passwordToggleIconOld"
                                        class="cursor-pointer"
                                        @click="togglePasswordOld"
                                        />
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>
                    <!--/ old password -->

                    <!-- password -->
                    <b-col cols="12">
                        <b-form-group
                            label="كلمة المرور"
                            label-for="a-كلمة المرور"
                        >
                            <validation-provider
                                #default="{ errors }"
                                name="كلمة المرور"
                                vid="Password"
                                rules="required|min:8|password"
                            >
                                <b-input-group :class="errors.length > 0 ? 'is-invalid':null" class="input-group-merge">
                                    <b-form-input
                                        id="a-password"
                                        v-model="form.password"
                                        :state="errors.length > 0 ? false:null"
                                        :type="passwordFieldTypeNew"
                                        placeholder="كلمة المرور"
                                    />
                                    <b-input-group-append is-text>
                                        <feather-icon
                                        :icon="passwordToggleIconNew"
                                        class="cursor-pointer"
                                        @click="togglePasswordNew"
                                        />
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>

                    <!-- confirm password -->
                    <b-col cols="12">
                        <b-form-group
                            label="تأكيد كلمة المرور"
                            label-for="ac-password"
                        >
                            <validation-provider
                            #default="{ errors }"
                            name="تأكيد كلمة المرور"
                            rules="required|confirmed:Password"
                            >
                                <b-input-group :class="errors.length > 0 ? 'is-invalid':null" class="input-group-merge">
                                    <b-form-input
                                        id="ac-password"
                                        v-model="form.password2"
                                        :state="errors.length > 0 ? false:null"
                                        :type="passwordFieldTypeRetype"
                                        placeholder="تأكيد كلمة المرور"
                                    />
                                    <b-input-group-append is-text>
                                        <feather-icon
                                        :icon="passwordToggleIconRetype"
                                        class="cursor-pointer"
                                        @click="togglePasswordRetype"
                                        />
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                    </b-col>

                    <!-- reset button -->
                    <b-col cols="12">
                        <b-button
                            variant="primary"
                            type="submit"
                        >
                            احفظ التغييرات
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'

import { required, min, confirmed } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup, BInputGroupAppend
} from 'bootstrap-vue'
import axios from 'axios'

export default {
    components: { 
        ToastificationContent, ValidationProvider,  ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BAvatar,
        BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
        BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup,
        BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup, BInputGroupAppend
    },
    data(){
        return {
            form: {
                odlPassword: '',
                password: '',
                password2: ''
            },
            passwordFieldTypeOld: 'password',
            passwordFieldTypeNew: 'password',
            passwordFieldTypeRetype: 'password',
            required, min, confirmed,
        }
    },
    mounted(){
        localize('ar')
    },
    computed: {
        passwordToggleIconOld() {
            return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
        passwordToggleIconNew() {
            return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
        passwordToggleIconRetype() {
            return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
        },
    },
    methods:{
        submitForm(){
            this.$refs.simpleRules.validate().then(success => {
                if (success) {                    
                    const data = {
                        old_password: this.form.odlPassword,
                        new_password: this.form.password,
                        new_password2: this.form.password2
                    };
                    
                    axios.post('/authentication/reset_password', data)
                    .then(response => {
                        if (response.status == 200){
                            this.$toast({
                                component: ToastificationContent,
                                props: {
                                    title: 'إشعار',
                                    icon: 'CheckIcon',
                                    text: 'تم تغيير كلمة المرور بنجاح.',
                                    variant: 'success',
                                },
                            })
                            this.form.odlPassword = ''
                            this.form.password = ''
                            this.form.password2 = ''
                            this.$refs.simpleRules.reset()
                        }
                    })
                    .catch(error => {
                        if(error.response && error.response.status == 400) {
                            this.$refs.simpleRules.setErrors({password_old: ['كلمة المرور القديمة غير صحيحة']});
                        } else {
                            this.$toast({
                                component: ToastificationContent,
                                props: {
                                    title: 'إنذار',
                                    icon: 'AlertCircleIcon',
                                    text: 'حدث خطأ أثناء تغيير كلمة المرور.',
                                    variant: 'danger',
                                },
                            })
                        }
                    })
                }
            })
        },
        togglePasswordOld() {
            this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
        },
        togglePasswordNew() {
            this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
        },
        togglePasswordRetype() {
            this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
        },
    }
}
</script>