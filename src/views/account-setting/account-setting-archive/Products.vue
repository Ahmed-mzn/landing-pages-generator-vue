<template>
    <div class="mt-2">
        <div class="mb-2">

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
                    :items="products"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                    :filter="filter"
                    show-empty
                    empty-text="No matching records found"
                    :filter-included-fields="filterOn"
                    @filtered="onFiltered"
                >
                    <template #cell(image)="data">
                        <b-avatar :src="data.value" />
                    </template>

                    <template #cell(price)="data">
                        <b-badge 
                            v-if="data.item.price_after_discount"
                            variant="light-primary mr-1"
                        >
                            <del>SAR {{data.value}}</del>
                        </b-badge>
                            <b-badge 
                                v-else
                                variant="light-primary mr-1"
                            >
                                SAR {{data.value}}
                            </b-badge>
                    </template>

                    <template #cell(price_after_discount)="data">
                        <b-badge 
                            v-if="data.value"
                            variant="light-primary mr-1"
                        >
                            SAR {{data.value}}
                        </b-badge>
                        <b-badge 
                            v-else
                            variant="light-warning mr-1"
                        >
                            لايوجد خصم
                        </b-badge>
                    </template>

                    <template #cell(actions)="data">
                        <b-row>
                            <b-col
                                cols="12"
                                class="d-flex align-items-center justify-content-start"
                            >
                                <b-button
                                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                                    v-b-tooltip.hover.v-primary
                                    title="اعادة تفعيل"
                                    variant="flat-success"
                                    class="btn-icon rounded-circle"
                                    size="sm"
                                    @click="activateProduct(data.item.id)"
                                >
                                    <feather-icon icon="EyeOffIcon" />
                                </b-button>
                            </b-col>
                        </b-row>
                    </template>
                </b-table>
            </b-col>
        </b-row>

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
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, VBModal, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
    BInputGroupAppend, VBTooltip
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate'
import { required, url, numbers } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    components:{
        ToastificationContent, ValidationProvider, ValidationObserver, BCard, BCardText, BRow, BCol, BButton, 
        BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, VBModal, 
        BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend, vSelect, BFormCheckbox
    },
    directives: {
        'b-modal': VBModal,
        'b-tooltip': VBTooltip,
        Ripple
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
            file: null,
            products: [],
            activateDiscount: false,
            activateDiscount2: false,
            fields: [
                {key: 'image', label: 'المنتج'},
                {key: 'title', label: 'عنوان'},
                {key: 'description', label: 'وصف قصير'},
                {key: 'price', label: 'السعر'},
                {key: 'price_after_discount', label: 'السعر بعد الخصم'},
                {key: 'actions', label: 'إجراءات'},
            ],
            product: {
                app: 0,
                title: '',
                description: '',
                image: null,
                price: null,
                price_after_discount: 0
            },
            productEdit: {
                id: null,
                title: '',
                description: '',
                image: null,
                price: null,
                price_after_discount: 0
            },
            editModalShow: false,
            addModalShow: false,
            required,
            url,
            numbers
        }
    },
    created(){
        this.getProducts()
        this.getApp()
        localize('ar')
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => ({ text: f.label, value: f.key }))
        },
    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        activateProduct(id){
            this.$swal({
                title: 'هل أنت متأكد؟',
                text: "سيتم اعادة تفعيل المنتج من جديد !",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'إلغاء',
                confirmButtonText: 'نعم ، اعادة تفعيل!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    axios.post('/products/archive', {product: id})
                    .then((response) =>{
                        this.$swal({
                            icon: 'success',
                            title: 'تمت اعادة تفعيل!',
                            text: 'تمت اعادة تفعيل المنتج بنجاح، قم بزيارة قسم المنتجات لرؤيتها.',
                            confirmButtonText: 'حسنا',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                        })
                        this.getProducts();
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                    })
                }
            })
        },
        getProducts(){
            axios.get(`/products/archive`)
            .then((response) => {
                this.products = response.data
                this.totalRows = response.data.length
            })
            .catch((error) => {
                JSON.stringify(error);
            })
        },
        getApp(){
            axios.get('/get_app')
            .then((response) => {
                this.product.app = response.data.id
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        },
    }
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>