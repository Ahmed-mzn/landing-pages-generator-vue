<template>
    <div>
        <b-overlay
            :show="showFormLoader"
            rounded="sm"
            spinner-variant="primary"
        >
            <div
                class="d-flex justify-content-start align-items-center mt-2"
                v-for="city in cities"
                :key="city.id"
            >
                <b-avatar
                    variant="light-primary"
                    class="mr-50"
                    size="40"
                >
                    <feather-icon icon="MapIcon" />
                </b-avatar>
                <div class="user-page-info">
                    <h6 class="mb-0">
                    {{city.name}}
                    </h6>
                    <small class="text-muted">city.description</small>
                </div>
                <div class="ml-auto">
                    <b-button
                        variant="flat-success"
                        class="btn-icon rounded-circle mr-1"
                        size="sm"
                        @click="showEditModal(city)"
                        >
                        <feather-icon icon="EditIcon" />
                    </b-button>
                    <b-button
                        variant="flat-danger"
                        class="btn-icon rounded-circle"
                        size="sm"
                        @click="deleteCity(city.id)"
                    >
                        <feather-icon icon="Trash2Icon" />
                    </b-button>
                </div>
            </div>
            <validation-observer ref="simpleRules">
                <b-form class="mt-3">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="اسم المدينة"
                                label-for="name"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="اسم المدينة"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="city.name"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="اسم المدينة"
                                    id="name"
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
                                أضف المدينة
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
        </b-overlay>
        <!-- basic modal -->
        <b-modal
            id="modal-1"
            ref="modal-edit"
            v-model="editModalShow"
            title="تحديث المدينة"
            ok-title="احفظ التغييرات"
            cancel-title="إلغاء"
            cancel-variant="outline-secondary"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <validation-observer ref="simpleRules2">
                <b-form class="mt-3" @submit.stop.prevent="updateCity()">
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="اسم المدينة"
                                label-for="name"
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="اسم المدينة"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="cityEdit.name"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="اسم المدينة"
                                    id="name"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
        </b-modal>
    </div>
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, VBModal, BFormRating, BModal
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import { required, url, numbers } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import axios from 'axios'
export default {
    components:{
        ToastificationContent,
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
        BMedia,
        BImg,
        BFormInput,
        BFormGroup,
        BForm,
        BOverlay,
        VBModal,
        BModal,
        BFormRating
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
            showFormLoader: false,
            cities: [],
            city: {
                name: '',
                app: null
            },
            app: null,
            cityEdit: {
                id: null,
                name: '',
            },
            editModalShow: false,
            required,
            url,
            numbers
        }
    },
    created(){
        this.getCities()
        this.getApp()
        localize('ar')
    },
    methods: {
        showEditModal(city){
            this.cityEdit.id = city.id
            this.cityEdit.name = city.name
            this.editModalShow = true
        },
        resetModal(){
            this.city.name = ''
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.updateCity()
        },
        updateCity(){
            this.$refs.simpleRules2.validate().then(success => {
                if(success){
                    axios.patch(`/cities/${this.cityEdit.id}/`, this.cityEdit)
                    .then((response) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث المدينة بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.getCities()
                        // Hide the modal manually
                        this.$nextTick(() => {
                            this.$refs['modal-edit'].toggle('#toggle-btn')
                        })
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                            title: 'إنذار',
                            icon: 'AlertCircleIcon',
                            text: 'حدث خطأ أثناء تحديث المدينة.',
                            variant: 'danger',
                            },
                        })
                        console.log(JSON.stringify(error));
                    })
                }
            });
        },
        deleteCity(id){
            this.$swal({
                title: 'هل أنت متأكد؟',
                text: "لن تتمكن من التراجع عن هذا!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'إلغاء',
                confirmButtonText: 'نعم ، احذفه!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    axios.delete(`/cities/${id}`)
                    .then((response) =>{
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحذف!',
                            text: 'تم حذف المدينة بنجاح.',
                            confirmButtonText: 'حسنا',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                        })
                        this.getCities();
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                    })
                }
            })
        },
        submitForm(){
            this.showFormLoader = true;
            this.$refs.simpleRules.validate().then(success => {
                if (success) {
                    axios.post('/cities/', this.city)
                    .then((response) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم اضافة المدينة بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.getCities()
                        this.city.name = ''
                        this.$refs.simpleRules.reset();
                        this.showFormLoader = false
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                            title: 'إنذار',
                            icon: 'AlertCircleIcon',
                            text: 'حدث خطأ أثناء إضافة المدينة.',
                            variant: 'danger',
                            },
                        })
                        this.showFormLoader = false;
                        JSON.stringify(error);
                    })
                } else {
                    this.showFormLoader = false;
                }
            })
        },
        getCities(){
            axios.get(`/cities/`)
            .then((response) => {
                this.cities = response.data
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
        getApp(){
            axios.get('/get_app')
            .then((response) => {
                this.city.app = response.data.id
                this.app = response.data
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        },
    }
}
</script>