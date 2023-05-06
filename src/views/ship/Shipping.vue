<template>
    <div>
        <b-card no-body class="p-">
            <b-row>
                <b-col cols="12">
                    <div class="d-flex align-items-center pl-1 pt-1 mb-1">
                        <feather-icon
                            icon="TruckIcon"
                            size="18"
                        />
                        <h4 class="mb-0 ml-75">
                            إدارة شركات الشحن
                        </h4>
                    </div>
                </b-col>
                <b-col cols="12">
                    <b-tabs v-model="currentTab" class="px-1">
                        <b-tab title="العقود نشطة">
                        </b-tab>
                        <b-tab title="تفعيل العقود">
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>
        </b-card>
        <template v-if="currentTab == 0">
            <enable-channel />
        </template>
        <template v-else>
            <add-channel />
        </template>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'

import { required, url, domain, alphaNumDash, domainExist, domainExist2 } from '@validations'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BFormCheckbox, BTabs, BTab
} from 'bootstrap-vue'
import axios from 'axios'
import AddChannel from './AddChannel.vue'
import EnableChannel from './EnableChannel.vue'

export default {
    components: { 
        ToastificationContent, ValidationProvider,  ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BAvatar,
        BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
        BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup,
        BCardHeader, BCardTitle, BCardBody, BBadge, BFormCheckbox, BTabs, BTab,
        AddChannel, EnableChannel
    },
    directives: {
        'b-modal': VBModal,
        Ripple
    },
    data(){
        return {
            currentTab: 0,
            isHover: 0,
            loading: true,
            showEditModal: false,
            channel: {},
            channels: {},
        }
    },
    mounted(){
        this.getConstantChannels()
    },
    methods: {
        openModal(channel){
            this.channel = channel
            this.showEditModal =  true
        },
        getChannels(){
            axios.get("/channels")
            .then(response => {
                response.data.forEach(item => {
                    if(this.channels[item.type]){
                        this.channels[item.type].is_active = item.is_active
                        this.channels[item.type].id = item.id
                        item.fields.forEach(field => {
                            if(this.channels[item.type].fields[field.key]){
                                this.channels[item.type].fields[field.key].value = field.value
                            }
                        })
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
        },
        getConstantChannels(){
            axios.get("/get_constant_channels")
            .then(response => {
                response.data.forEach(item => {
                    var fields = {};
                    item.constant_fields.forEach(field => {
                        fields[field.key] = {
                            id: field.id,
                            key: field.key,
                            value: field.value
                        }
                    })
                    const obj = {
                        type: item.type,
                        name: item.name,
                        image_url: item.image_url,
                        fields: fields
                    }
                    this.channels[obj.type] = obj
                })
                setTimeout(() => {this.loading = false;this.getChannels()}, 500);
            })
        }
    }
}
</script>
<style>
  .popular { border: 1px solid #7367f0; }
</style>