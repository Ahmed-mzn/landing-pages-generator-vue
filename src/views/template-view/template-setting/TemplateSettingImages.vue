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
                            <!-- Media -->
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar
                                        :src="template.logo"
                                        text="avatarText"
                                        variant="light-primary"
                                        size="90px"
                                        rounded
                                    />
                                </template>
                                <h5 class="mb-1">
                                    صورة الشعار
                                </h5>
                                <div class="d-flex flex-wrap ">
                                    <b-button
                                        variant="success"
                                        @click="$refs.refInputEllogo.click()"
                                    >
                                    <input
                                        ref="refInputEllogo"
                                        type="file"
                                        class="d-none"
                                        accept="image/*"
                                        @input="handleImage('logo')"
                                    >
                                    <span class="d-none d-sm-inline">تغيير</span>
                                    <feather-icon
                                        icon="EditIcon"
                                        class="d-inline ml-1"
                                    />
                                    </b-button>
                                </div>
                            </b-media>
                        </b-col>
                        <b-col md="12">
                            <!-- Media -->
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar
                                        :src="template.main_image"
                                        text="avatarText"
                                        variant="light-primary"
                                        size="90px"
                                        rounded
                                    />
                                </template>
                                <h5 class="mb-1">
                                    صورة الرئيسية
                                </h5>
                                <div class="d-flex flex-wrap ">
                                    <b-button
                                        variant="success"
                                        @click="$refs.refInputElmain_image.click()"
                                    >
                                    <input
                                        ref="refInputElmain_image"
                                        type="file"
                                        class="d-none"
                                        accept="image/*"
                                        @input="handleImage('main_image')"
                                    >
                                    <span class="d-none d-sm-inline">تغيير</span>
                                    <feather-icon
                                        icon="EditIcon"
                                        class="d-inline ml-1"
                                    />
                                    </b-button>
                                </div>
                            </b-media>
                        </b-col>
                        <b-col md="12">
                            <!-- Media -->
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar
                                        :src="template.medals_image"
                                        text="avatarText"
                                        variant="light-primary"
                                        size="90px"
                                        rounded
                                    />
                                </template>
                                <h5 class="mb-1">
                                    صورة الميداليات
                                </h5>
                                <div class="d-flex flex-wrap ">
                                    <b-button
                                        variant="success"
                                        @click="$refs.refInputElmedals_image.click()"
                                    >
                                    <input
                                        ref="refInputElmedals_image"
                                        type="file"
                                        class="d-none"
                                        accept="image/*"
                                        @input="handleImage('medals_image')"
                                    >
                                    <span class="d-none d-sm-inline">تغيير</span>
                                    <feather-icon
                                        icon="EditIcon"
                                        class="d-inline ml-1"
                                    />
                                    </b-button>
                                </div>
                            </b-media>
                        </b-col>
                        <b-col md="12">
                            <!-- Media -->
                            <b-media class="mb-2">
                                <template #aside>
                                    <b-avatar
                                        :src="template.second_image"
                                        text="avatarText"
                                        variant="light-primary"
                                        size="90px"
                                        rounded
                                    />
                                </template>
                                <h5 class="mb-1">
                                    صورة الثانوية
                                </h5>
                                <div class="d-flex flex-wrap ">
                                    <b-button
                                        variant="success"
                                        @click="$refs.refInputElsecond_image.click()"
                                    >
                                    <input
                                        ref="refInputElsecond_image"
                                        type="file"
                                        class="d-none"
                                        accept="image/*"
                                        @input="handleImage('second_image')"
                                    >
                                    <span class="d-none d-sm-inline">تغيير</span>
                                    <feather-icon
                                        icon="EditIcon"
                                        class="d-inline ml-1"
                                    />
                                    </b-button>
                                </div>
                            </b-media>
                        </b-col>
                        <!-- <b-col cols="12">
                            <b-button
                                variant="primary"
                                type="submit"
                                @click.prevent="submitForm"
                            >
                                احفظ التغييرات
                            </b-button>
                        </b-col> -->
                    </b-row>
                </b-form>
            </validation-observer>
        </b-overlay>
    </div>
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab,
    BFormInput, BFormGroup, BForm, BFormTextarea, BImg, BOverlay, BFormFile, BMedia
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
        BOverlay,
        BFormFile,
        BMedia
    },
    props: {
        template: {
            type: Object,
            default: () => {},
        }
    },
    data(){
        return {
            file: null,
            showFormLoader: false,
            required,
            url
        }
    },
    created(){
        localize('ar');
    },
    methods: {
        async handleImage(imageName){
            this.showFormLoader = true;

            let formData = new FormData()
            formData.append(imageName, this.$refs['refInputEl'+imageName].files[0])

            await axios.patch(`/templates/${this.template.id}/`, formData, {headers:{"Content-Type": "multipart/form-data"}})
            .then((response) => {
                this.template.logo = response.data.logo
                this.template.main_image = response.data.main_image
                this.template.medals_image = response.data.medals_image
                this.template.second_image = response.data.second_image
                this.$emit('reloadComp')
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تم تحديث الصورة بنجاح.',
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
                        text: 'هناك خطأ أثناء تحديث الصورة.',
                        variant: 'danger',
                    },
                })
                this.showFormLoader = false;
                JSON.stringify(error)
            })
            this.showFormLoader = false;
        },
        // submitForm() {
        //     this.showFormLoader = true;
        //     this.$refs.simpleRules.validate().then(success => {
        //         if (success) {
        //             const data = {
        //                 logo: this.template.logo,
        //                 main_image: this.template.main_image,
        //                 medals_image: this.template.medals_image,
        //                 second_image: this.template.second_image
        //             }
                    
        //             axios.patch(`/templates/${this.template.id}/`, data)
        //             .then((response) => {
        //                 this.$emit('reloadComp')
        //                 this.$toast({
        //                     component: ToastificationContent,
        //                     props: {
        //                         title: 'إشعار',
        //                         icon: 'CheckIcon',
        //                         text: 'تم تحديث الصور بنجاح.',
        //                         variant: 'success',
        //                     },
        //                 })
        //                 this.showFormLoader = false;
        //             })
        //             .catch((error) => {
        //                 this.$toast({
        //                     component: ToastificationContent,
        //                     props: {
        //                         title: 'إنذار',
        //                         icon: 'AlertCircleIcon',
        //                         text: 'هناك خطأ أثناء تحديث الصور.',
        //                         variant: 'danger',
        //                     },
        //                 })
        //                 this.showFormLoader = false;
        //                 JSON.stringify(error)
        //             })
        //         } else {
        //             this.showFormLoader = false;
        //         }
        //     })
        // },
    }
}
</script>