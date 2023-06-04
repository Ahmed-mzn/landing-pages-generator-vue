<template>
    <div>
        <b-row align-v="stretch">
            <b-col
                cols="12"
                xl="12"
                lg="12"
                md="12"
            >
                <b-card>
                    <b-row>
                        <!-- User Info: Left col -->
                        <b-col
                            cols="12"
                            xl="7"
                            lg="7"
                            md="7"
                            class="d-flex justify-content-between flex-column"
                        >
                            <!-- User Avatar & Action Buttons -->
                            <div class="d-flex justify-content-start">
                                <b-avatar size="lg" variant="light-primary">
                                    <feather-icon size="23" icon="MapPinIcon" />
                                </b-avatar>
                                <div class="d-flex flex-column ml-1">
                                    <div class="">
                                        <h3 class="mb-0">العناوين</h3>
                                        <span class="card-text">
                                            احفظ العناوين التي تستخدمها في باستمرار لتسريع عملية شراء وطباعة بوالص\بوليصات الشحن.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </b-col>

                        <!-- Right Col: Table -->
                        <b-col
                            cols="12"
                            xl="5"
                            lg="5"
                            md="5"
                        >
                            <b-button
                                variant="primary"
                                class="ml-1 float-right"
                                @click="showAddModal = true; actionType='أضف العنوان'"
                            >
                                <feather-icon
                                    icon="PlusIcon"
                                    class="mr-50"
                                />
                                إنشاء عنوان
                            </b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>    
        </b-row>

        <b-row>
            <b-col cols="4" v-for="warehouse in warehouses" :key="warehouse.id">
                <b-card no-body :class="warehouse.is_current ? 'popular':''">
                    <b-card-header>
                        <b-card-title>{{warehouse.title}}</b-card-title>
                        <b-dropdown
                            variant="link"
                            no-caret
                            class="chart-dropdown"
                            toggle-class="p-0"
                            right
                        >
                            <template #button-content>
                                <feather-icon
                                    icon="MoreVerticalIcon"
                                    size="18"
                                    class="text-body cursor-pointer"
                                />
                            </template>
                            <b-dropdown-item @click="openUpdateModal(warehouse)">
                                <feather-icon icon="EditIcon" />
                                <span class="align-middle ml-50">تعديل</span>
                            </b-dropdown-item>
                            <b-dropdown-item v-if="!warehouse.is_current" @click="deleteWarehouse(warehouse.id)">
                                <feather-icon icon="TrashIcon" />
                                <span class="align-middle ml-50">حذف</span>
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-card-header>
                    <b-card-body>
                        <div class="text-center">
                            <div class="profile-image-wrapper">
                                <div class="profile-image p-0">
                                    <b-avatar
                                        size="80"
                                        variant="light-primary"
                                        :text="warehouse.title.substring(0, 2)"
                                    />
                                </div>
                            </div>

                            <h6>{{warehouse.title}}</h6>
                            <b-badge
                                v-if="warehouse.is_current"
                                class="profile-badge"
                                variant="light-primary"
                            >الحالي</b-badge>
                        </div>
                        <hr class="mb-2">

                        <b-row>
                            <!-- Right Col: Table -->
                            <b-col cols="12">
                                <table class="mt-xl-0 w-100">
                                    <tr>
                                        <th class="pb-50">
                                            <feather-icon
                                                icon="UserIcon"
                                                class="mr-75"
                                            />
                                            <span class="font-weight-bold">مسؤول الإتصال</span>
                                        </th>
                                        <td class="pb-50">
                                            {{ warehouse.name }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="pb-50">
                                            <feather-icon
                                                icon="AtSignIcon"
                                                class="mr-75"
                                            />
                                            <span class="font-weight-bold">الإيميل الإلكتروني</span>
                                        </th>
                                        <td class="pb-50">
                                            {{warehouse.email}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <feather-icon
                                                icon="PhoneIcon"
                                                class="mr-75"
                                            />
                                            <span class="font-weight-bold">رقم الجوال</span>
                                        </th>
                                        <td>
                                            {{ warehouse.phone_number }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="pb-50">
                                            <feather-icon
                                                icon="MapPinIcon"
                                                class="mr-75"
                                            />
                                            <span class="font-weight-bold">العنوان</span>
                                        </th>
                                        <td class="pb-50">
                                            {{ warehouse.address }}
                                        </td>
                                    </tr>
                                </table>
                            </b-col>
                        </b-row>

                        <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            block
                            variant="primary"
                            v-if="!warehouse.is_current"
                            @click="makeCurrent(warehouse.id)"
                        >
                        تفعيل
                        </b-button>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>


        <!-- add update modal -->
        <b-modal
            id="modal-2"
            ref="modal-add"
            v-model="showAddModal"
            title="العنوان"
            :ok-title="actionType"
            cancel-title="إلغاء"
            cancel-variant="outline-secondary"
            @hidden="resetAddModal"
            @ok="handleOkAddModal"
        >
            <validation-observer ref="simpleRules">
                <b-form>
                    <b-row>
                        <b-col cols="12">
                            <b-form-group
                                label="اسم العنوان"
                                label-for="title"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="اسم العنوان"
                                    rules="required"
                                >
                                <b-form-input
                                    v-model="warehouse.title"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="اسم العنوان"
                                    id="title"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="بريد إلكتروني"
                                label-for="email"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="بريد إلكتروني"
                                    rules="required|email"
                                >
                                <b-form-input
                                    v-model="warehouse.email"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="بريد إلكتروني"
                                    id="email"
                                    dir="ltr"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="رقم الهاتف"
                                label-for="title"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="رقم الهاتف"
                                    rules="required"
                                >
                                <b-form-input
                                    v-model="warehouse.phone_number"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="رقم الهاتف"
                                    id="phone"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="مسؤول الإتصال"
                                label-for="title"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="مسؤول الإتصال"
                                    rules="required"
                                >
                                <b-form-input
                                    v-model="warehouse.name"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="مسؤول الإتصال"
                                    id="name"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="المدينة">
                                <v-select
                                    v-model="warehouse.city"
                                    dir="rtl"
                                    :options="cities"
                                    label="name_ar"
                                    :reduce="item => item.id"
                                >
                                </v-select>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="العنوان الكامل"
                                label-for="title"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="العنوان الكامل"
                                    rules="required"
                                >
                                <b-form-input
                                    v-model="warehouse.address"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="العنوان الكامل"
                                    id="address"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import { required, url, numbers } from '@validations'
import { 
    BCard, BCardHeader, BCardTitle, BCardBody, BAvatar, BBadge, BRow, BCol, BButton, BDropdown, BDropdownItem,
    BOverlay, BModal, BFormInput, BFormGroup, BForm
 } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    components: {
        BCard, BCardHeader, BCardTitle, BCardBody, BAvatar, BBadge, BRow, BCol, BButton, BDropdown, BDropdownItem, vSelect,
        ToastificationContent, ValidationProvider, ValidationObserver, BModal, BOverlay, BFormInput, BFormGroup, BForm
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            showAddModal: false,
            actionType: '',
            cities : [],
            warehouses: [],
            warehouse: {
                id: 0,
                city: 0,
                email: '',
                title: '',
                phone_number: '',
                address: '',
                name: '',
            },
            required, url, numbers
        }
    },
    mounted(){
        this.getCities()
        this.getWarehouses()
    },
    methods: {
        openUpdateModal(warehouse){
            console.log(warehouse);
            this.warehouse.id = warehouse.id
            this.warehouse.city = warehouse.city
            this.warehouse.email = warehouse.email
            this.warehouse.title = warehouse.title
            this.warehouse.phone_number = warehouse.phone_number
            this.warehouse.address = warehouse.address
            this.warehouse.name = warehouse.name
            this.actionType = "احفظ التغييرات"
            this.showAddModal = true
        },
        makeCurrent(id){
            axios.post(`/warehouses/${id}/make_current/`)
            .then((response) => {   
                console.log(response); 
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تم تفعيل العنوان بنجاح.',
                        variant: 'success',
                    },
                })
                this.getWarehouses()
            })
            .catch((error) => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'هناك خطأ أثناء تفعيل العنوان.',
                        variant: 'danger',
                    },
                })
                JSON.stringify(error)
            })
        },
        deleteWarehouse(id){
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
                    axios.delete(`/warehouses/${id}/`)
                    .then((response) =>{
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحذف!',
                            text: 'تم حذف العنوان بنجاح.',
                            confirmButtonText: 'حسنا',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                        })
                        this.getWarehouses();
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                    })
                }
            })
        },
        resetAddModal(){
            this.warehouse.city = 0
            this.warehouse.email = ''
            this.warehouse.title = ''
            this.warehouse.phone_number = ''
            this.warehouse.address = ''
            this.warehouse.name = ''
        },
        handleOkAddModal(bvModalEvt){
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.$refs.simpleRules.validate().then(success => {
                if(success){

                    let method = 'post', endpoint = '/warehouses/';
                    if (this.actionType == 'احفظ التغييرات'){
                        method = 'patch'
                        endpoint = `/warehouses/${this.warehouse.id}/`
                    }
                    axios[method](endpoint, this.warehouse)
                    .then((response) => {    
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث العنوان بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.showAddModal = false
                        this.getWarehouses()
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إنذار',
                                icon: 'AlertCircleIcon',
                                text: 'هناك خطأ أثناء تحديث العنوان.',
                                variant: 'danger',
                            },
                        })
                        JSON.stringify(error)
                    })
                }
            });
        },
        getCities(){
            axios.get("/cities/main/")
            .then(response => {
                this.cities = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        getWarehouses(){
            axios.get("/warehouses")
            .then(response => {
                this.warehouses = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>
<style>
  .popular { border: 1px solid #7367f0; }
</style>

<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>