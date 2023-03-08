<template>
    <div>
      <b-overlay
            :show="loading"
            rounded="sm"
            spinner-variant="primary"
            variant="transparent"
        >
          <div id="gjs">
          </div>
        </b-overlay>
    </div>
</template>

<script>
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import exportPlugin from 'grapesjs-plugin-export';
import gjsForms from 'grapesjs-plugin-forms';
import gjsBasics from 'grapesjs-blocks-basic';

import blocks from './grapesjs/blocks';
import components from './grapesjs/components';
import panels from './grapesjs/panels';

import {
    BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab,
    BFormInput, BFormGroup, BForm, BFormTextarea, BOverlay
} from 'bootstrap-vue'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios';
export default {
    components: {
        ToastificationContent,
        BCard, BCardText, BRow, BCol, BButton, BAvatar, BLink, BBadge, BTabs, BTab,
        BFormInput, BFormGroup, BForm, BFormTextarea, BOverlay
    },
    data(){
        return {
            editor: null,
            loading: false,
            htmlData: `
              <h1 style="color: var(--bs-secondary)">Hello World Component!</h1><button class="btn btn-primary">test</button>
              <div data-gjs-type="stars" data-gjs-number="3"></div>
            `
        }
    },
    mounted(){
        document.documentElement.setAttribute('dir', 'ltr')
        this.editor = grapesjs.init({
            container : '#gjs',
            fromElement: true,
            storageManager: false,
            selectorManager:{
              componentFirst: true,
            },
            plugins: [grapesjsPresetWebpage, exportPlugin, gjsForms, gjsBasics],
            pluginsOpts: {
              [grapesjsPresetWebpage]: {
                blocks: [],
                modalImportTitle: 'Import Template',
                modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                modalImportContent: function(editor) {
                  return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
                },
              },
              [gjsForms]: {
                blocks: []
              },
              [gjsBasics]: {
                blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'image', 'video', 'map']
              },
            },
            canvas: {
              styles: [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css'
              ],
              scripts: [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
                'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js',
                "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
                "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
                "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js",
                "http://localhost:8080/ProductsForm.js",
                "http://localhost:8080/ProductsForm2.js",
              ],
            }
        });


        // panels
        this.editor.Panels.removePanel('devices-c')
        this.editor.Panels.removePanel('views')
        this.editor.Panels.removePanel('options')
        panels(this.editor)

        components(this.editor, this.$route.params.id);

        this.editor.Commands.add('save-in-db', {
            run: editor => {
                editor.store();
                console.log(this.editor.getCss());
                // this.editor.setStyle(':root{--bs-secondary: #c725c2;--bs-primary: #31dbc6} html {direction: rtl;}');
                // this.editor.Css.setRule(':root','--bs-secondary: #c725c2;--bs-primary: #31dbc6');
                console.log(this.editor.getCss());
                const data = {
                    html: this.editor.getHtml(),
                    css: this.editor.getCss(),
                    js: this.editor.getJs()
                }
                axios.post(`/templates/${this.$route.params.id}/save_html/`, data)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                })
                this.loading = true
                setTimeout(()=> {this.loading=false}, 1000)
            }
        });

        // this.editor.Components.addType('stars', components.stars);
        this.editor.Blocks.add('stars', {
          label: 'Stars',
          category: 'Basic',
          attributes: { class: 'fa fa-star' },
          content: { type: 'stars' },
        });

        // this.editor.Components.addType('productsForm', components.products);
        this.editor.Blocks.add('productsForm', {
          label: 'productsForm',
          category: 'Forms',
          attributes: { class: 'fa fa-user' },
          content: { type: 'productsForm' },
        });

        this.editor.Blocks.add('productsForm2', {
          label: 'productsForm2',
          category: 'Forms',
          attributes: { class: 'fa fa-home' },
          content: { type: 'productsForm2' },
        });

        this.editor.BlockManager.add('Form', blocks.form)
        this.editor.BlockManager.add('Input', blocks.input)
        this.editor.BlockManager.add('Textarea', blocks.textarea)
        this.editor.BlockManager.add('Select', blocks.select)
        this.editor.BlockManager.add('Link', blocks.link)
        this.editor.BlockManager.add('Button', blocks.button)

        // this.editor.setStyle('html {direction: rtl;}')
        // this.editor.addStyle(':root{--bs-secondary: #F5D260;--bs-primary: #B7C226}');
        this.editor.Css.addRules('html {direction: rtl;} :root{--bs-secondary: #F5D260;--bs-primary: #B7C226}');

        // init editor
        this.editor.addComponents(`
        <section>
        <div class="container-fluid" style="padding-left: 0px;padding-right: 0px;"><img src="assets/img/hero.png" style="width: 100%;"></div>
    </section>
    <section>
        <div class="container">
            <div class="d-flex justify-content-start align-items-end pt-0 mt-2">
                <div data-gjs-type="stars" data-gjs-number="5"></div><span class="d-flex text-muted me-1" style="font-size: 12px;">48,120</span>
            </div>
            <h2 style="font-size: 30px;" class="mb-3">زيت زيتون صفوة الجوف</h2>
            <h3 style="font-size: 16px;color: #333;" class="mb-2">بكر ممتاز عصرة اولى</h3>
            <p style="font-size: 16px;color: #333;" class="mb-2">زيت زيتون صفوة الجوف، بمثابة الذهب الخالص، انتقيناه من أفضل محاصيلنا مزارعنا بالجوف، حيث يتم إنتاج زيت زيتون بكرة عضوي ١٠٠٪؜ عصرة أولى على البارد.</p><img src="assets/img/Rectangle%201249.png" style="width: 100%;margin-top: 22px;">
        </div>
    </section>
        <div data-gjs-type="productsForm"></div>`)
    },
    methods: {
    }
}
</script>

<style lang="scss">
// $primaryColor: #444;
// $secondaryColor: #ddd;
// $tertiaryColor: #804f7b;
// $quaternaryColor: #4469ee;

// @import "grapesjs/src/styles/scss/main.scss";

/* Reset some default styling */
.gjs-editor-cont{
    width: 100% !important;
    height: 100vh !important;
}

/* We can remove the border we've set at the beginnig */
#gjs {
  border: none;
}
/* Theming */

/* Primary color for the background */
.gjs-one-bg {
  background-color: #090446;
}


/* Secondary color for the text color */
.gjs-two-color {
  color: #f1f1f1 !important;
}

/* Tertiary color for the background */
.gjs-three-bg {
  background-color: #8e87e1;
  color: rgb(255, 255, 255);
}

.gjs-off-prv{
  background-color: #090446;
}

/* Quaternary color for the text color */
.gjs-four-color,
.gjs-four-color-h:hover {
  color: #8e87e1;
}

.gjs-btn-import {
  margin-top: 10px;
}

.gjs-pn-options{
  margin-right: 10px;
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
