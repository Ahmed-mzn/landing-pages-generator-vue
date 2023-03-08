<template>
    <div>
        <b-row>
            <b-col cols="2" style="width: 100%;margin 0;padding: 0;">
                <b-tabs fill>
                    <b-tab active>
                        <template #title>
                            <feather-icon icon="ToolIcon" />
                        </template>
                            <div class="p-1" id="style-manager" style="width: 100%;">
                                <div id="selectors-container"></div>
                                <div id="traits-container"></div>
                                <div id="style-manager-container"></div>
                            </div>
                    </b-tab>
                    <b-tab>
                        <template #title>
                            <feather-icon icon="TabletIcon" />
                        </template>
                        <div class="p-1">
                            <h1>hjk</h1>
                            <div id="blocks"></div>
                        </div>
                    </b-tab>
                    <b-tab>
                        <template #title>
                            <feather-icon icon="GridIcon" />
                        </template>
                        <div class="">
                            <h5>jdjkdo</h5>
                            <div class="p-2" id="layers" style="width: 100%;">
                                <div id="layers-container"></div>
                                <b-button class="mt-2" variant="primary" size="sm" block>add section</b-button>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-col>
            <b-col cols="10" style="width: 100%;margin 0;padding: 0;">
                <!-- <div class="container" style="padding: 7px;">
                    <b-row>
                        <b-col>
                            <b-button variant="primary" size="sm" >add section</b-button>
                        </b-col>
                    </b-row>
                </div> -->
                <div id="gjs2">
                    <div style="padding: 25px 50px; margin: 50px 50px 0;" data-gjs-name="Text1">
                        Text 1
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import exportPlugin from 'grapesjs-plugin-export';
import gjsForms from 'grapesjs-plugin-forms';
import gjsBasics from 'grapesjs-blocks-basic';

import useAppConfig from '@core/app-config/useAppConfig'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import panels from '../editor/grapesjs/panels'

import { BTabs, BTab, BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge } from 'bootstrap-vue'
export default {
    components:{
        ToastificationContent, BTabs, BTab,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BImg, BForm, BFormFile, BFormGroup, BFormInput, BFormRadio,
        BAlert, BMedia, BMediaAside, BMediaBody, BInputGroup, BInputGroupPrepend, BOverlay, BModal, VBModal, BDropdown, BDropdownItem,
        BFormRadioGroup, BCardHeader, BCardTitle, BCardBody, BBadge
    },
    data(){
        return {
            editor: null,
        }
    },
    mounted(){
        this.$store.commit('appConfig/UPDATE_SKIN', 'dark')
        document.documentElement.setAttribute('dir', 'ltr')
        this.editor = grapesjs.init({
            container  : '#gjs2',
            height: '100%',
            fromElement: true,
            storageManager: { type: 0 },
            plugins: [grapesjsPresetWebpage,exportPlugin, gjsBasics],
            pluginsOpts: {
              [grapesjsPresetWebpage]: {
                blocks: [],
                modalImportTitle: 'Import Template',
                modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                modalImportContent: function(editor) {
                  return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
                },
              },
            },
            layerManager: {
                appendTo: '#layers-container'
            },
            blockManager: {
                appendTo: '#blocks'
            },
            styleManager: {
                appendTo: '#style-manager-container',
                sectors: [{
                        name: 'General',
                        open: false,
                        buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
                    },{
                        name: 'Dimension',
                        open: false,
                        buildProps: [ 'width', 'height', 'max-width', 'min-height', 'margin', 'padding']
                    },{
                        name: 'Typography',
                        open: false,
                        buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow']
                    },{
                    name: 'Decorations',
                    open: false,
                    buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
                    },{
                    name: 'Extra',
                    open: false,
                    buildProps: ['opacity', 'transition', 'perspective', 'transform'],
                    properties: [{
                        type: 'slider',
                        property: 'opacity',
                        defaults: 1,
                        step: 0.01,
                        max: 1,
                        min:0,
                    }]
                }],
            },
            selectorManager: {
                appendTo: '#selectors-container',
            },
            traitManager: {
                appendTo: '#traits-container',
            },
            panels: {
                defaults: []
            }
        });
        this.editor.Panels.removePanel('devices-c')
        this.editor.Panels.removePanel('views')
        this.editor.Panels.removePanel('options')
        this.editor.Panels.addPanel({
            id: "commands",
        })
        panels(this.editor)

        const bm = this.editor.BlockManager;
        this.editor.on('load', () => {
            this.editor.BlockManager.render([
                bm.get('column1').set('category', ''),
                bm.get('column2').set('category', ''),
                bm.get('column3').set('category', ''),
                bm.get('text').set('category', ''),
                bm.get('image').set('category', '')
            ])
        });

        this.editor.runCommand('sw-visibility');
    }
}
</script>
<style>
.gjs-one-bg {
  background-color: #161d31;
}
.gjs-two-color {
  color: #d0d2d6 !important;
}
.gjs-editor-cont {
    width: 100% !important;
    height: 100vh !important;
}
.gjs-four-color,
.gjs-four-color-h:hover {
  color: #7367f0;
}

.gjs-cv-canvas{
    width: 99%;
    
}
.gjs-pn-commands{
  height: 47px;
}

.fa-desktop {
    content: url('~@/assets/icons/screen.svg');
}
.fa-tablet {
    content: url('~@/assets/icons/tablet.svg');
}
.fa-mobile {
    content: url('~@/assets/icons/mobile.svg');
}
.fa-pen {
  content: url('~@/assets/icons/pen-tool.svg');
}

.fa-setting {
  content: url('~@/assets/icons/settings.svg');
}

.fa-layers {
  content: url('~@/assets/icons/layers.svg');
}
.fa-add {
  content: url('~@/assets/icons/plus-square.svg');
}
.fa-square {
  content: url('~@/assets/icons/square.svg');
}
.fa-eye {
  content: url('~@/assets/icons/eye.svg');
}
.fa-eye-slash {
  content: url('~@/assets/icons/eye-off.svg') !important;
}
.fa-full {
  content: url('~@/assets/icons/maximize.svg');
}
.fa-code {
  content: url('~@/assets/icons/code.svg');
}
.fa-undo {
  content: url('~@/assets/icons/rotate-ccw.svg');
}
.fa-redo {
  content: url('~@/assets/icons/rotate-cw.svg');
}
.fa-import {
  content: url('~@/assets/icons/download.svg');
}
.fa-clear {
  content: url('~@/assets/icons/trash.svg');
}
.fa-save {
  content: url('~@/assets/icons/save-success.svg');
}
</style>