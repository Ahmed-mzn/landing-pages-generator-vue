<template>
    <div>
        <div class="mb-2">

            <!-- Table Top -->
            <b-row>
                <!-- Per Page -->
                <b-col
                    cols="5"
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
                <b-col
                    cols="3"
                >
                    <div class="d-flex align-items-center justify-content-end">
                        <b-button
                            variant="primary"
                            @click="download"
                        >
                            <feather-icon
                                icon="DownloadIcon"
                                class="mr-50"
                            />
                            <span class="align-middle">تنزيل</span>
                        </b-button>
                    </div>
                </b-col>
                <!-- Search -->
                <b-col
                    cols="4"
                >
                    <div class="d-flex align-items-center justify-content-end">
                        <b-form-input
                            v-model="filter"
                            class="d-inline-block mr-1 ml-1"
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
                    :items="forms"
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
                    <template #cell(product)="data">
                        <b-media vertical-align="center">
                            <template #aside>
                                <b-avatar
                                    size="32"
                                    :src="data.item.product.image"
                                />
                            </template>
                            <b-link
                                class="font-weight-bold d-block text-nowrap"
                            >
                                {{ data.item.product.title }}
                            </b-link>
                            <small class="text-muted">{{ data.item.product.description.substring(0,15) }}</small>
                        </b-media>
                    </template>
                    <template #cell(created_at)="data">
                        {{moment(data.value).format('MMMM Do YYYY, H:MM:SS')}}
                    </template>
                    <template #cell(name)="data">
                        {{data.item.lead.name}}
                    </template>
                    <template #cell(phone_number)="data">
                        <span dir="ltr" class="text-primary">{{ '+966'+data.item.lead.phone_number }}</span>
                    </template>
                    <template #cell(city)="data">
                        {{data.item.lead.city}}
                    </template>
                    <template #cell(address)="data">
                        {{data.item.lead.address}}
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
require('js-file-download');
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
import fileDownload from 'js-file-download';
export default {
    components:{
        BCard, BCardText, BRow, BCol, BButton, ToastificationContent,
        BLink, BAvatar, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm, BOverlay, 
        BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend, BFormCheckbox, vSelect
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
        this.getVisist()
    },
    data(){
        return{
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
                {key: 'product', label: 'المنتج', sortable: true},
                {key: 'name', label: 'اسم الزبون', sortable: true},
                {key: 'phone_number', label: 'رقم الهاتف', sortable: true},
                {key: 'city', label: 'المدينة', sortable: true},
                {key: 'address', label: 'العنوان'},
                {key: 'quantity', label: 'الكمية', sortable: true},
                {key: 'created_at', label: 'التاريخ'},
            ],
            forms: []
        }
    },
    methods:{
        download(){
            axios.get("/templates/35/download_excel/", {responseType: 'blob'})
            .then(response => {
                if(response.status == 400 || response.status == 500){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء تنزيل.',
                        variant: 'danger',
                        },
                    })
                } else{
                    fileDownload(response.data, 'orders.xls')
                }
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                    title: 'إنذار',
                    icon: 'AlertCircleIcon',
                    text: 'حدث خطأ أثناء تنزيل.',
                    variant: 'danger',
                    },
                })
                console.log(error);
            })
        },
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        getVisist(){
            axios.get(`/forms?template_id=${this.template.id}`)
            .then((response) => {
                console.log(response);
                this.forms = response.data
                this.totalRows = response.data.length
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        }
    }
}
</script>