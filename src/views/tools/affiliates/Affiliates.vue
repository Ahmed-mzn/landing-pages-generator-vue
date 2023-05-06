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
                                @click="showAddModal = true;actionType = 'أضف الكوبون'"
                            >
                                <span class="text-nowrap">Add affiliate</span>
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
                        :items="affiliates"
                        :fields="fields"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-direction="sortDirection"
                        :filter="filter"
                        show-empty
                        empty-text="لم يتم العثور على سجلات مطابقة"
                        :filter-included-fields="filterOn"
                        @filtered="onFiltered"
                        @row-clicked="onRowClicked"
                    >


                        <template #cell(customer)="data">
                            <b-media vertical-align="center">
                                <template #aside>
                                    <b-avatar
                                        size="32"
                                        :id="`invoice-row-${data.item.id}`"
                                    />
                                    <b-tooltip
                                        :target="`invoice-row-${data.item.id}`"
                                        placement="bottom"
                                        variant="secondary"
                                    >
                                        <p class="mb-0">
                                            {{data.item.full_name}}
                                        </p>
                                        <p class="mb-0">
                                            هاتف: {{data.item.phone_number}}
                                        </p>
                                        <p class="mb-0">
                                            عنوان: {{data.item.email}}
                                        </p>
                                    </b-tooltip>
                                </template>
                                <b-link
                                    class="font-weight-bold d-block text-nowrap"
                                    
                                >
                                    {{ data.item.full_name }}
                                </b-link>
                                <small class="text-muted">{{ data.item.email }}</small>
                            </b-media>
                        </template>

                        <template #cell(affiliate_identifier)="data">
                            {{ '...' + data.value.substring(0, 8)}}
                        </template>

                        <template #cell(affiliate_secret)="data">
                            {{ '...' + data.value.substring(0, 8)}}
                        </template>


                        <!-- Column: Actions -->
                        <template #cell(actions)="data">
                            <div class="text-nowrap">
                                <feather-icon
                                    icon="EditIcon"
                                    size="16"
                                    class="mr-1"
                                    @click="openUpdateModal(data.item)"
                                />

                                <feather-icon
                                    icon="Trash2Icon"
                                    size="16"
                                    class="mr-1"
                                    @click="deleteAffiliate(data.item.id)"
                                />

                                <feather-icon
                                    icon="EyeIcon"
                                    size="16"
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

        <!-- Selected affiliate -->
        <b-overlay
            :show="selectLoading"
            opacity="1"
            spinner-variant="primary"
            variant="white"
            rounded="lg"
        >

            <b-card class="mt-3">

                <b-row>
                    <b-col cols="12">
                        <div class="d-flex align-items-center mb-2">
                            <feather-icon
                                icon="ClipboardIcon"
                                size="18"
                            />
                            <h4 class="mb-0 ml-75">معلومات العميل</h4>
                        </div>
                    </b-col>

                    <!-- User Info: Left col -->
                    <b-col
                        cols="21"
                        xl="6"
                        class="d-flex justify-content-between flex-column"
                    >
                        <!-- User Avatar & Action Buttons -->
                        <div class="d-flex justify-content-start">
                            <b-avatar
                                variant="light-primary"
                                size="104px"
                                rounded
                            />
                            <div class="d-flex flex-column ml-1">
                                <div class="mb-1">
                                    <h4 class="mb-0">
                                        {{selected_affiliate.full_name}}
                                    </h4>
                                    <span class="card-text">{{selected_affiliate.email}}</span>
                                </div>
                                <div class="d-flex flex-wrap">
                                    <b-button
                                        variant="primary"
                                    >
                                        Edit
                                    </b-button>
                                    <b-button
                                        variant="outline-danger"
                                        class="ml-1"
                                    >
                                        Delete
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </b-col>

                    <!-- Right Col: Table -->
                    <b-col
                        cols="12"
                        xl="6"
                    >
                        <table class="mt-2 mt-xl-0 w-100">
                        <tr>
                            <th class="pb-50">
                                <feather-icon
                                    icon="AtSignIcon"
                                    class="mr-75"
                                />
                                <span class="font-weight-bold">Email</span>
                            </th>
                            <td class="pb-50">
                                {{selected_affiliate.email}}
                            </td>
                        </tr>
                        <tr>
                            <th class="pb-50">
                            <feather-icon
                                icon="CheckIcon"
                                class="mr-75"
                            />
                            <span class="font-weight-bold">Status</span>
                            </th>
                            <td class="pb-50 text-capitalize">
                                Active
                            </td>
                        </tr>
                        <tr>
                            <th class="pb-50">
                            <feather-icon
                                icon="FlagIcon"
                                class="mr-75"
                            />
                            <span class="font-weight-bold">Country</span>
                            </th>
                            <td class="pb-50">
                                SA
                            </td>
                        </tr>
                        <tr>
                            <th>
                            <feather-icon
                                icon="PhoneIcon"
                                class="mr-75"
                            />
                            <span class="font-weight-bold">Phone</span>
                            </th>
                            <td>
                                {{selected_affiliate.phone_number}}
                            </td>
                        </tr>
                        </table>
                    </b-col>
                </b-row>
            </b-card>

            <b-card>
                <b-row>
                    <b-col cols="12">
                        <div class="d-flex align-items-center mb-2">
                            <feather-icon
                                icon="KeyIcon"
                                size="18"
                            />
                                <h4 class="mb-0 ml-75">Keys</h4>
                        </div>
                    </b-col>

                    <b-col md="6">
                        <b-form-group
                            label-for="account-twitter"
                            label="Twitter"
                        >
                            <b-form-input
                                id="account-twitter"
                                v-model="selected_affiliate.affiliate_identifier"
                                placeholder="Add link"
                            />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group
                            label-for="account-facebook"
                            label="Facebook"
                        >
                            <b-form-input
                                id="account-facebook"
                                v-model="selected_affiliate.affiliate_secret"
                                placeholder="Add link"
                            />
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group>
                            <label for="affiliate_identifier">affiliate_identifier</label>
                            <b-input-group class="input-group-merge">
                                <b-form-input
                                    id="affiliate_identifier"
                                    type="text"
                                    disabled
                                    v-model="selected_affiliate.affiliate_identifier"
                                />
                                <b-input-group-append is-text>
                                <feather-icon
                                    icon="CopyIcon"
                                    class="cursor-pointer"
                                    
                                />
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>

                    <b-col md="6">
                        <b-form-group>
                            <label for="affiliate_secret">affiliate_secret</label>
                            <b-input-group class="input-group-merge">
                                <b-form-input
                                    id="affiliate_secret"
                                    type="text"
                                    disabled
                                    v-model="selected_affiliate.affiliate_secret"
                                />
                                <b-input-group-append is-text>
                                <feather-icon
                                    icon="CopyIcon"
                                    class="cursor-pointer"
                                    
                                />
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>

            <!-- Stats Card w/ line chart -->
            <b-row class="mt-3">
                <b-col
                    md="4"
                    sm="6"
                >
                    <statistic-card-with-line-chart
                        icon="EyeIcon"
                        statistic="78.9k"
                        statistic-title="الزيارات"
                        :chart-data="[{data: [150, 200, 125, 225, 200, 250], name: 'الزيارات'}]"
                    />
                </b-col>
                <b-col
                    md="4"
                    sm="6"
                >
                    <statistic-card-with-line-chart
                        icon="TrendingUpIcon"
                        color="success"
                        statistic="659.8k"
                        statistic-title="المبيعات"
                        :chart-data="[{data: [750, 1000, 900, 1250, 1000, 1200, 1100], name: 'المبيعات'}]"
                    />
                </b-col>
                <b-col
                    md="4"
                    sm="6"
                >
                    <statistic-card-with-line-chart
                        icon="ShareIcon"
                        color="warning"
                        statistic="28.7k"
                        statistic-title="المشاركات"
                        :chart-data="[{data: [365, 390, 365, 400, 375, 400], name: 'المشاركات'}]"
                    />
                </b-col>
            </b-row>

            <b-row class="match-height">
                <b-col lg="8">
                    <card-analytic-revenue />
                </b-col>
                <b-col lg="4">
                    <card-analytic-sales-radar-chart />
                </b-col>
            </b-row>

        </b-overlay>

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
                                label="email"
                                label-for="title"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="email"
                                    rules="required|email"
                                >
                                <b-form-input
                                    v-model="affiliate.email"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="email"
                                    id="email"
                                    dir="ltr"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="phone_number"
                                label-for="title"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="phone_number"
                                    rules="required"
                                >
                                <b-form-input
                                    v-model="affiliate.phone_number"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="phone_number"
                                    id="phone"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12">
                            <b-form-group
                                label="full_name"
                                label-for="title"
                            >
                                <validation-provider
                                    #default="{ errors }"
                                    name="full_name"
                                    rules="required"
                                >
                                <b-form-input
                                    v-model="affiliate.full_name"
                                    :state="errors.length > 0 ? false:null"
                                    placeholder="full_name"
                                    id="full_name"
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
import CardAnalyticRevenue from './components/CardAnalyticRevenue.vue'
import CardAnalyticSalesRadarChart from './components/CardAnalyticSalesRadarChart.vue'
import StatisticCardWithLineChart from '@core/components/statistics-cards/StatisticCardWithLineChart.vue'
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
        BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, StatisticCardWithLineChart,
        BInputGroupAppend, BFormCheckbox, vSelect, BTooltip, BDropdown, BDropdownItem,
        CardAnalyticSalesRadarChart, CardAnalyticRevenue
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
        this.getAffiliates()
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
                {key: 'customer', label: 'العميل'},
                {key: 'affiliate_identifier', label: 'affiliate identifier'},
                {key: 'affiliate_secret', label: 'affiliate secret'},
                {key: 'created_at', label: 'created_at'},
                {key: 'actions', label: 'actions'},
            ],
            affiliates: [],
            affiliate: {
                id: 0,
                email: '',
                phone_number: '',
                full_name: ''
            },
            selected_affiliate: {
                id: 0,
                email: '',
                affiliate_identifier: '',
                affiliate_secret: '',
                phone_number: '',
                full_name: ''
            },
            selectLoading: false,
            actionType: 'أضف الكوبون',
            showAddModal: false,
            required,
            url,
            numbers
        }
    },
    methods:{
        openUpdateModal(affiliate){
            this.affiliate.id = affiliate.id
            this.affiliate.email = affiliate.email
            this.affiliate.phone_number = affiliate.phone_number
            this.affiliate.full_name = affiliate.full_name
            this.actionType = "احفظ التغييرات"
            this.showAddModal = true
        },
        deleteAffiliate(id){
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
                    axios.delete(`/affiliates/${id}/`)
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
                        this.getAffiliates();
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                    })
                }
            })
        },
        resetAddModal(){
            this.affiliate.id = 0
            this.affiliate.email = ''
            this.affiliate.phone_number = ''
            this.affiliate.full_name = ''
        },
        handleOkAddModal(bvModalEvt){
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.$refs.simpleRules.validate().then(success => {
                if(success){
                    let method = 'post', endpoint = '/affiliates/';
                    if (this.actionType == 'احفظ التغييرات'){
                        method = 'patch'
                        endpoint = `/affiliates/${this.affiliate.id}/`
                    }

                    axios[method](endpoint, this.affiliate)
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
                        this.getAffiliates()
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
        getAffiliates(){
            axios.get('/affiliates')
            .then((response) => {
                this.affiliates = response.data
                this.totalRows = response.data.length

                if (response.data.length != 0){
                    this.selected_affiliate.id = response.data[0].id
                    this.selected_affiliate.affiliate_identifier = response.data[0].affiliate_identifier
                    this.selected_affiliate.affiliate_secret = response.data[0].affiliate_secret
                    this.selected_affiliate.email = response.data[0].email
                    this.selected_affiliate.phone_number = response.data[0].phone_number
                    this.selected_affiliate.full_name = response.data[0].full_name
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        },
        onRowClicked(item, index, event){
            this.selectLoading = true
            this.selected_affiliate.id = item.id
            this.selected_affiliate.affiliate_identifier = item.affiliate_identifier
            this.selected_affiliate.affiliate_secret = item.affiliate_secret
            this.selected_affiliate.email = item.email
            this.selected_affiliate.phone_number = item.phone_number
            this.selected_affiliate.full_name = item.full_name
            setTimeout(() => {this.selectLoading = false;}, 500);
        }
    }
}
</script>

<style lang="scss">
    @import '~@core/scss/vue/libs/vue-select.scss';
</style>