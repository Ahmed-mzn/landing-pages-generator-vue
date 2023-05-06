<template>
    <div>
        <b-card no-body class="mb-0">
            <div class="m-2">

                <!-- Table Top -->
                <b-row>
                    <!-- Per Page -->
                    <b-col
                        cols="12"
                        md="6"
                        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                    >
                        <label>عرض</label>
                        <v-select
                            v-model="perPage"
                            dir="rtl"
                            :options="pageOptions"
                            :clearable="false"
                            class="per-page-selector d-inline-block mx-50"
                        />
                        <label>إدخالات</label>
                    </b-col>
                    <!-- Search -->
                    <b-col
                        cols="12"
                        md="6"
                    >
                        <div class="d-flex align-items-center justify-content-end">
                            <b-form-input
                                v-model="filter"
                                class="d-inline-block mr-1"
                                placeholder="بحث..."
                            />
                            <b-button
                                variant="primary"
                                @click="openAddModal"
                            >
                                <span class="text-nowrap">Add Coupon</span>
                            </b-button>
                        </div>
                    </b-col>
                </b-row>

            </div>
            <b-row>
                <b-col cols="12">
                    <b-table
                        hover
                        responsive
                        class="position-relative"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :items="coupons"
                        :fields="fields"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-direction="sortDirection"
                        :filter="filter"
                        show-empty
                        empty-text="لم يتم العثور على سجلات مطابقة"
                        :filter-included-fields="filterOn"
                        @filtered="onFiltered"
                    >

                        <!-- Column: Id -->
                        <template #cell(code)="data">
                            <b-link
                                class="font-weight-bold"
                            >
                            {{ data.value }}
                            </b-link>
                        </template>

                        <!-- Column: Percentage -->
                        <template #cell(percentage)="data">
                            <span v-html="data.value ? data.value + '%' : '-'"></span>
                        </template>

                        <!-- Column: Amount -->
                        <template #cell(amount)="data">
                            <span v-html="data.value ? data.value : '-'"></span>
                        </template>

                        <template #cell(type)="data">
                            <b-badge :variant="data.value == 'amount' ? 'light-success' : 'light-info'">
                                <feather-icon
                                    :icon="data.value == 'amount' ? 'DollarSignIcon' : 'PercentIcon'"
                                    class="mr-25"
                                />
                                <span v-html="data.value == 'amount' ? 'مبلغ' : 'نسبة مئوية'"></span>
                            </b-badge>
                        </template>

                        <!-- Column: Actions -->
                        <template #cell(actions)="data">
                            <div class="text-nowrap">
                                <feather-icon
                                    icon="EditIcon"
                                    size="16"
                                    class="mx-1"
                                    @click="openUpdateModal(data.item)"
                                />

                                <feather-icon
                                    icon="Trash2Icon"
                                    size="16"
                                    class="mx-1"
                                    @click="deleteCoupon(data.item.id)"
                                />
                            </div>
                        </template>

                    </b-table>
                </b-col>
            </b-row>

            <div class="mx-2 mb-2">
                <b-row>
                    <b-col
                        cols="12"
                    >
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            class="mb-0 mt-1 mt-sm-0"
                            pills
                            first-number
                            last-number
                            prev-class="next-item"
                            next-class="prev-item"
                        />
                    </b-col>
                </b-row>
            </div>
        </b-card>

        <!-- add update modal -->
        <b-modal
            id="modal-2"
            ref="modal-add"
            v-model="showAddModal"
            title="أضف منتج"
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
                                label="كود خصم"
                                label-for="title"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="كود خصم"
                                    rules="required"
                                >
                                <b-form-input
                                    v-model="coupon.code"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="كود خصم"
                                    id="title"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group label="نوع الخصم">
                                <v-select
                                    v-model="coupon.type"
                                    dir="rtl"
                                    :options="couponsType"
                                    label="title"
                                    :reduce="item => item.value"
                                >
                                    <template #option="{ value, title, icon }">
                                        <feather-icon
                                            :icon="icon"
                                            size="16"
                                            class="align-middle mr-50"
                                        />
                                        <span> {{ title }}</span>
                                    </template>
                                </v-select>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="coupon.type == 'percentage'">
                            <b-form-group
                                label="نسبة مئوية"
                                label-for="description"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="نسبة مئوية"
                                    rules="required"
                                >
                                <b-form-input
                                    id="description"
                                    v-model="coupon.percentage"
                                    rows="3"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="أدخل نسبة مئوية"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" v-if="coupon.type == 'amount'">
                            <b-form-group
                                label="المبلغ"
                                label-for="label"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="المبلغ"
                                    rules="required|numbers"
                                >
                                <b-form-input
                                    v-model="coupon.amount"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="أدخل المبلغ"
                                    id="label"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="عدد الإستخدام "
                                label-for="price"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="عدد الإستخدام "
                                    rules="required|numbers"
                                >
                                <b-form-input
                                    id="price"
                                    v-model="coupon.num_available"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="أدخل عدد الإستخدام "
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
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, BInputGroupAppend, BTooltip,
    BDropdown, BDropdownItem
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import { required, url, numbers } from '@validations'
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    components:{
        BCard, BCardText, BRow, BCol, BButton, ToastificationContent, ValidationProvider, ValidationObserver,
        BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, 
        BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend, BFormCheckbox, vSelect, BTooltip, BDropdown, BDropdownItem
    },
    props: {
        template: {
            type: Object,
            default: () => {},
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => ({ text: f.label, value: f.key }))
        },
    },
    mounted(){
        localize('ar')
        this.getCoupons()
    },
    data(){
        return {
            perPage: 5,
            pageOptions: [3, 5, 10],
            totalRows: 1,
            currentPage: 1,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            fields: [
                {key: 'code', label: 'كود'},
                {key: 'type', label: 'نوع الخصم', sortable: true},
                {key: 'percentage', label: 'نسبة مئوية'},
                {key: 'amount', label: 'مبلغ'},
                // {key: 'active', label: 'active', sortable: true},
                {key: 'num_available', label: 'عدد المستخدم'},
                {key: 'num_used', label: 'عدد الإستخدام'},
                {key: 'created_at', label: 'created_at'},
                {key: 'actions', label: 'actions'},
            ],
            coupons: [],
            coupon: {
                id: 0,
                code: '',
                type: 'amount',
                percentage: 0,
                amount: 0,
                num_available: 0,
            },
            couponsType: [
                {value: "amount", title: "مبلغ", icon: "DollarSignIcon"},
                {value: "percentage", title: "نسبة مئوية", icon: "PercentIcon"},
            ],
            actionType: 'أضف الكوبون',
            showAddModal: false,
            required,
            url,
            numbers
        }
    },
    methods:{
        openUpdateModal(coupon){
            this.coupon.id = coupon.id
            this.coupon.code = coupon.code
            this.coupon.type = coupon.type
            this.coupon.amount = coupon.amount
            this.coupon.percentage = coupon.percentage
            this.coupon.num_available = coupon.num_available
            this.actionType = "احفظ التغييرات"
            this.showAddModal = true
        },
        openAddModal(){
            this.showAddModal = true
            this.actionType = 'أضف الكوبون'
            this.coupon.type = 'amount'
        },
        deleteCoupon(id){
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
                    axios.delete(`/coupons/${id}/`)
                    .then((response) =>{
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحذف!',
                            text: 'تم حذف الكوبون بنجاح.',
                            confirmButtonText: 'حسنا',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                        })
                        this.getCoupons();
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                    })
                }
            })
        },
        resetAddModal(){
            this.coupon.code = ''
            this.coupon.type = 'amount'
            this.coupon.percentage = 0
            this.coupon.amount = 0
            this.coupon.num_available = 0
        },
        handleOkAddModal(bvModalEvt){
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.$refs.simpleRules.validate().then(success => {
                if(success){
                    if (this.coupon.type == 'amount') this.coupon.percentage = 0 
                    else this.coupon.amount = 0

                    let method = 'post', endpoint = '/coupons/';
                    if (this.actionType == 'احفظ التغييرات'){
                        method = 'patch'
                        endpoint = `/coupons/${this.coupon.id}/`
                    }
                    axios[method](endpoint, this.coupon)
                    .then((response) => {    
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إشعار',
                                icon: 'CheckIcon',
                                text: 'تم تحديث الكوبون بنجاح.',
                                variant: 'success',
                            },
                        })
                        this.showAddModal = false
                        this.getCoupons()
                    })
                    .catch((error) => {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: 'إنذار',
                                icon: 'AlertCircleIcon',
                                text: 'هناك خطأ أثناء تحديث الكوبون.',
                                variant: 'danger',
                            },
                        })
                        JSON.stringify(error)
                    })
                }
            });
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        getCoupons(){
            axios.get('/coupons')
            .then((response) => {
                this.coupons = response.data
                this.totalRows = response.data.length
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        }
    }
}
</script>

<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>