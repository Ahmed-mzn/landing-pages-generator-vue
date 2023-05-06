<template>
    <div>
        <b-overlay
            :show="loading"
            opacity="1"
            spinner-variant="primary"
            variant="white"
            rounded="lg"
        >
            <b-row>
                <b-col cols="12" lg="4" xl="4" md="4" v-for="channel in channels" :key="channel.name">
                    <b-card :update="update" @mouseleave="isHover=0" @mouseenter="isHover = channel.id" no-body :class="isHover == channel.id ? 'popular':''">
                        <div class="text-center">
                            <b-img class="p-2" :src="channel.image_url" height="80" alt="Fluid image" />
                            <h6>{{channel.name}}</h6>
                        </div>
                        <div>
                            <ul>
                                <li>{{channel.name}}</li>
                                <li>test</li>
                                <li>test</li>
                            </ul>
                        </div>
                        <div>
                            <div class="float-right">
                                <b-form-checkbox
                                    class="custom-control-primary mb-1 mr-1"
                                    name="check-button"
                                    v-model="channel.is_active"
                                    @change="openModal(channel)"
                                    switch
                                >
                                    <span class="switch-icon-left">
                                        <feather-icon icon="CheckIcon" />
                                    </span>
                                    <span class="switch-icon-right">
                                        <feather-icon icon="XIcon" />
                                    </span>
                                </b-form-checkbox>
                            </div>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </b-overlay>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'

import { required, url, domain, alphaNumDash, domainExist, domainExist2 } from '@validations'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge, BFormCheckbox 
} from 'bootstrap-vue'
import axios from 'axios'

export default {
    components: { 
        ToastificationContent, ValidationProvider,  ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BAvatar,
        BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
        BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup,
        BCardHeader, BCardTitle, BCardBody, BBadge, BFormCheckbox 
    },
    directives: {
        'b-modal': VBModal,
        Ripple
    },
    data(){
        return {
            update: 0,
            isHover: 0,
            loading: true,
            channel: {},
            channels: {},
        }
    },
    mounted(){
        this.getChannels()
    },
    methods: {
        openModal(channel){
            this.channel = channel
            this.prepareChannel(channel.is_active)
        },
        prepareChannel(is_active) {
            let msg = is_active ? 'تريد تفعيل شركة الشحن' : 'تريد توقيف شركة الشحن'
            this.$bvModal.msgBoxConfirm(msg, {
                title: 'يرجى تأكيد',
                size: 'sm',
                okVariant: 'primary',
                okTitle: 'نعم',
                cancelTitle: 'إلغاء',
                cancelVariant: 'outline-secondary',
                hideHeaderClose: false,
            })
            .then(value => {
                if(value){
                    this.updateChannel(is_active);
                } else {
                    this.getChannels()
                }
            })
            .catch(error => {
                this.getChannels()
                console.log(error);
            })
        },
        updateChannel(is_active){
            axios.patch(`/channels/${this.channel.id}/`, {is_active: is_active})
            .then(response => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تم تحديث بنجاح.',
                        variant: 'success',
                    },
                })
                this.getChannels()
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء تحديث.',
                        variant: 'danger',
                    },
                })
                console.log(error);
            })
        },
        getChannels(){
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

                axios.get("/channels")
                .then(response => {
                    response.data.forEach(item => {
                        if(this.channels[item.type]){
                            this.channels[item.type].is_active = item.is_active
                            this.channels[item.type].is_set = true
                            this.channels[item.type].id = item.id
                        }
                    })
                    for(const item in this.channels){
                        if(!this.channels[item].is_set){
                            delete this.channels[item]
                        }
                    }
                    this.update += 1
                })
                .catch(error => {
                    console.log(error);
                })

                setTimeout(() => {this.loading = false;}, 500);
            })
        }
    }
}
</script>
<style>
  .popular { border: 1px solid #7367f0; }
</style>