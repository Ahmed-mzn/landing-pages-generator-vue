<template>
    <div>
        <b-form>
            <b-row>
                <b-col cols="12">
                    <div class="d-flex align-items-center mb-2">
                        <feather-icon
                            icon="PackageIcon"
                            size="18"
                        />
                        <h4 class="mb-0 ml-75">
                            أتمتة الشحنات
                        </h4>
                    </div>
                </b-col>

                <h6 class="section-label mx-1 mb-2">
                    الطلبات
                </h6>
                <b-col
                    cols="12"
                    class="mb-2"
                >
                    <b-form-checkbox
                        id="auto_ship_cod"
                        name="auto_ship_cod"
                        v-model="config.auto_ship_cod"
                        switch
                        inline
                    >
                        <span>Auto ship cod</span>
                    </b-form-checkbox>
                </b-col>
                <b-col
                    cols="12"
                    class="mb-2"
                >
                    <b-form-checkbox
                        id="auto_ship_cc"
                        v-model="config.auto_ship_cc"
                        name="auto_ship_cc"
                        switch
                        inline
                    >
                        <span>Auto ship cc</span>
                    </b-form-checkbox>
                </b-col>

                <b-col cols="12">
                    <b-button
                        variant="primary"
                        class="mr-1 mt-1"
                        @click="saveChange"
                    >احفظ التغييرات</b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup, BInputGroupAppend, BFormCheckbox
} from 'bootstrap-vue'
import axios from 'axios'

export default {
    components: { 
        ToastificationContent, BCard, BCardText, BRow, BCol, BButton, BAvatar,
        BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
        BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup,
        BCardHeader, BCardTitle, BCardBody, BBadge, BCardGroup, BInputGroupAppend, BFormCheckbox
    },
    data(){
        return {
            config: {
                auto_ship_cod: false,
                auto_ship_cc: true
            }
        }
    },
    mounted(){
        this.getConfig()
    },
    methods:{
        saveChange(){
            axios.put('/apps', this.config)
            .then(response => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تم تحديث الإعدادات بنجاح.',
                        variant: 'success',
                    },
                })
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء تحديث الإعدادات.',
                        variant: 'danger',
                    },
                })
                console.log(error);
            })
        },
        getConfig(){
            axios.get('/apps')
            .then(response => {
                this.config = response.data
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
</script>