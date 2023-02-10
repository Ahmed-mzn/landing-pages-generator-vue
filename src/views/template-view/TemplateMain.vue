<template>
    <div class="mt-2">
        <b-row>
            <b-col cols="8">
                <h3>الصفحات المرتبطة</h3>
            </b-col>
            <b-col cols="4">
                <div class="float-right">
                    <b-button
                        variant="primary"
                    >
                    <feather-icon
                        icon="PlusIcon"
                    />
                        إنشاء صفحة
                    </b-button>
                </div>
            </b-col>
        </b-row>
        <b-row align-v="stretch">
            <b-col cols="6" xl="3" lg="4" md="4">
                <b-link>
                    <b-card
                        style="height: 100%; display:flex; justify-content: center;align-items: center;"
                        border-variant="primary"
                        bg-variant="transparent"
                        class="shadow-none"
                    >   
                        <div style="height: 100%; display:flex; justify-content: center;align-items: center;">
                            <feather-icon class="text-primary" size="60" icon="PlusIcon" />
                        </div>
                    </b-card>
                </b-link>
            </b-col>
            <b-col cols="6" xl="3" lg="4" md="4">
                <b-card
                    style="height: 100%;"
                    header="template.template_name + ' صفحة الهبوط '"
                    header-tag="h6"
                >
                <b-link>
                    <b-img
                    fluid
                    class="mb-2"
                    :src="require('@/assets/images/pages/skeleton400_still.gif')"
                    />
                </b-link>
                <b-card-text>
                    <b-row>
                    <b-col cols="9">
                        <small class="text-muted">منذ 3 دقائق</small>
                    </b-col>
                    <!-- <b-link @click="moreTemplate"><feather-icon class="float-right" icon="MoreVerticalIcon" /></b-link> -->
                    <b-col cols="3">
                        <b-dropdown
                        no-caret
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="link"
                        >
                        <template #button-content>
                            <feather-icon
                            icon="MoreVerticalIcon"
                            size="16"
                            class="text-body align-middle mr-25"
                            />
                        </template>
                        <b-dropdown-item >حذف</b-dropdown-item>
                        <b-dropdown-item href="'http://'+template.domain.name+'/'+template.template_name" target="_blank">معاينة</b-dropdown-item>
                        </b-dropdown>
                    </b-col>
                    </b-row>
                </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'

import { required, url } from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import { BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup
} from 'bootstrap-vue'
import axios from 'axios'
export default {
    components: { 
        ToastificationContent, ValidationProvider,  ValidationObserver, BCard, BCardText, BRow, BCol, BButton, BAvatar,
        BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup,
        BInputGroupPrepend, BOverlay, BModal, VBModal, BFormRadio, BDropdown, BDropdownItem, BFormRadioGroup
    },
    directives: {
        Ripple
    },
    data(){
        return  {

        }
    }
}
</script>