<template>
    <div>
        <div class="m-2">

            <!-- Table Top -->
            <b-row>
                <!-- Per Page -->
                <b-col
                    cols="7"
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
                    cols="5"
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
                    :items="visists"
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
                    <template #cell(created_at)="data">
                        {{moment(data.value).locale('ar').startOf('second').fromNow()}}
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
    </div>
</template>

<script>
import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab, BMedia, BImg, BFormInput, BFormGroup, BForm,
    BOverlay, BFormCheckbox, BModal, BFormFile, BTable, BFormSelect, BPagination, BInputGroup, 
        BInputGroupAppend
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from 'axios'
export default {
    components:{
        BCard, BCardText, BRow, BCol, BButton, 
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
            perPage: 15,
            pageOptions: [15, 25, 100],
            totalRows: 1,
            currentPage: 1,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            fields: [
                {key: 'country', label: 'الدولة', sortable: true},
                {key: 'region', label: 'المنطقة', sortable: true},
                {key: 'city', label: 'المدينة', sortable: true},
                {key: 'duration', label: 'المدة الزمنية'},
                {key: 'ip_address', label: 'عنوان IP'},
                {key: 'location', label: 'الموقع'},
                {key: 'created_at', label: 'التاريخ'},
            ],
            visists: []
        }
    },
    methods:{
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        getVisist(){
            axios.get(`/visits?template_id=${this.template.id}`)
            .then((response) => {
                this.visists = response.data
                this.totalRows = response.data.length
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            })
        }
    }
}
</script>