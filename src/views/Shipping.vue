<template>
    <div>
        <b-row>
            <b-col cols="3">
                <b-card no-body>
                    <div class="text-center">
                        <b-img class="p-2" src="https://torod.co/webshome/image/logo.png" height="80" alt="Fluid image" />
                    </div>
                    <div>
                        <ul>
                            <li>test</li>
                            <li>test</li>
                        </ul>
                    </div>
                    <div>
                        <div class="float-right">
                            <b-form-checkbox
                                class="custom-control-primary mb-1 mr-1"
                                name="check-button"
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

        }
    }
}
</script>