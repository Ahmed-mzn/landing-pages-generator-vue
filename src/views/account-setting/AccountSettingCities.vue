<template>
    <div>
        <b-overlay
            :show="showFormLoader"
            rounded="sm"
            spinner-variant="primary"
        >
            <b-alert
                variant="primary"
                show
            >
                <h4 class="alert-heading">
                    إشعار
                </h4>
                <div class="alert-body">
                    <span>المدن أدناه ، هي  المدن التي يتوفر فيها الشحن، لذا يرجى التأكد من إضافة أو إزالة المدن التي توفر أو لا توفر فيها الشحن </span>
                </div>
            </b-alert>
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
                    {{city.main_city.name_ar}}
                    </h6>
                    <small class="text-muted">السعودية</small>
                </div>
                <div class="ml-auto">
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
                        <b-col cols="12" class="mb-2">
                            <v-select
                                v-model="selectedCities"
                                dir="rtl"
                                multiple
                                :options="mainCities"
                                label="name_ar"
                                placeholder="حدد المدن"
                            >
                                <template #option="{ name_ar, name_en }">
                                    <div
                                        class="d-flex justify-content-start align-items-center"
                                    >
                                        <b-avatar
                                            variant="light-secondary"
                                            class="mr-50"
                                            size="40"
                                        >
                                            <feather-icon class="text-dark" icon="MapPinIcon" />
                                        </b-avatar>
                                        <div class="user-page-info">
                                            <h6 class="mb-0">
                                            {{name_ar}}
                                            </h6>
                                            <small class="text-muted">{{name_en}}</small>
                                        </div>
                                    </div>
                                </template>
                            </v-select>
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
    </div>
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, VBModal, BFormRating, BModal, BAlert
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    components:{
        ToastificationContent, ValidationProvider, ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BLink, BAvatar, 
        BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, VBModal, BModal, BFormRating, BAlert, vSelect
    },
    directives: {
        'b-modal': VBModal,
    },
    data(){
        return {
            selectedCities: [],
            showFormLoader: false,
            mainCities: [],
            cities: []
        }
    },
    created(){
        this.getCities()
    },
    methods: {
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
            if(this.selectedCities.length == 0){
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'لم تقم بإختيار أي مدن المدينة.',
                    variant: 'danger',
                    },
                })
            } else{
                axios.post('/cities/bulk/', this.selectedCities)
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
                    this.selectedCities = []
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
            }
            this.showFormLoader = false;
        },
        getCities(){
            axios.get(`/cities/`)
            .then((response) => {
                this.cities = response.data
                
                setTimeout(() => {this.getMainCities();}, 200);
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
        getMainCities(){
            axios.get("/cities/main")
            .then(response => {
                this.mainCities = []
                response.data.forEach(element => {
                    if (!this.checkCityById(element.id)){
                        this.mainCities.push(element)
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
        },
        checkCityById(id){
            let result = false;
            this.cities.forEach(element => {
                if (element.main_city.id == id){
                    result = true;
                }
            })
            return result;
        }
    }
}
</script>
<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>