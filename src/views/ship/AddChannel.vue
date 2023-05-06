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
                    <b-card @mouseleave="isHover=0" @mouseenter="isHover = channel.id" no-body :class="isHover == channel.id ? 'popular':''">
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
                            <template v-if="channel.is_set">
                                <b-badge variant="light-success" class="ml-1 mb-75">
                                    <feather-icon
                                        icon="CheckIcon"
                                        class="mr-25"
                                    />
                                    <span>تم الربط </span>
                                </b-badge>
                            </template>
                            <template v-else>
                                <b-badge variant="light-danger" class="ml-1 mb-75">
                                    <feather-icon
                                        icon="XIcon"
                                        class="mr-25"
                                    />
                                    <span>تم الربط </span>
                                </b-badge>
                            </template>
                            <div class="float-right">
                                <b-link
                                    @click="openModal(channel)"
                                    class="mr-75 mb-75"
                                >
                                    <feather-icon icon="SettingsIcon" />
                                </b-link>
                            </div>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </b-overlay>
        
        <!-- Edit Field -->
        <b-modal
            v-model="showModal"
            id="modal-center"
            centered
            cancel-variant="outline-secondary"
            title="تفعيل العقد"
            cancel-title="إلغاء"
            ok-title="احفظ التغييرات"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <validation-observer ref="simpleRules4">
                <b-form>
                    <b-row>
                        <template v-if="channel.name">
                            <b-col md="12" v-for="field, index in channel.fields" :key="index+'field-id-unique'">
                                <b-form-group
                                    :label="field.key"
                                    :label-for="field.key+'_key_unique'"
                                >
                                    <validation-provider
                                        #default="{ errors }"
                                        :name="field.key"
                                        rules="required"
                                    >
                                    <b-form-input
                                        :id="field.key+'_key_unique'"
                                        v-model="field.value"
                                        :state="errors.length > 0 ? false:null"
                                        :placeholder="'enter '+field.key"
                                    />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                        </template>
                    </b-row>
                </b-form>
            </validation-observer>
        </b-modal>
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
            isHover: 0,
            loading: true,
            showModal: false,
            channel: {},
            channels: {},
        }
    },
    mounted(){
        this.getChannels()
    },
    methods: {
        createChannel(){
            axios.post("/channels/", this.channel)
            .then(response => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تم تفعيل العقد بنجاح.',
                        variant: 'success',
                    },
                })
                this.showModal = false
                this.getChannels()
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء تفعيل العقد.',
                        variant: 'danger',
                    },
                })
                console.log(error);
            })
        },
        updateChannel(){
            axios.put(`/channels/${this.channel.id}/`, this.channel)
            .then(response => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إشعار',
                        icon: 'CheckIcon',
                        text: 'تم تحديث بيانات العقد بنجاح.',
                        variant: 'success',
                    },
                })
                this.showModal = false
            })
            .catch(error => {
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: 'إنذار',
                        icon: 'AlertCircleIcon',
                        text: 'حدث خطأ أثناء تحديث بيانات العقد.',
                        variant: 'danger',
                    },
                })
                console.log(error);
            })
        },
        handleOk(bvModalEvt){
            bvModalEvt.preventDefault()

            this.$refs.simpleRules4.validate().then(success => {
                if (success) {
                    var new_fields = [];
                    Object.entries(this.channel.fields).forEach(item => {
                        new_fields.push(item[1])
                    })
                    this.channel.fields = new_fields

                    if(this.channel.is_set){
                        this.updateChannel()
                    } else {
                        this.createChannel()
                    }
                }
            })
        },
        resetModal(){
            this.channel = {}
        },
        openModal(channel){
            this.channel = channel
            this.showModal =  true
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
                            this.channels[item.type].is_active = true
                            this.channels[item.type].is_set = true
                            this.channels[item.type].id = item.id
                            var isSet = true
                            item.fields.forEach(field => {
                                if(field.value == ''){
                                    isSet = false
                                }
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

                setTimeout(() => {this.loading = false;}, 500);
            })
        }
    }
}
</script>
<style>
  .popular { border: 1px solid #7367f0; }
</style>