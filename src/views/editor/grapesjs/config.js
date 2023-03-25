import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import exportPlugin from 'grapesjs-plugin-export';
import gjsForms from 'grapesjs-plugin-forms';
import gjsBasics from 'grapesjs-blocks-basic';
import customCodePlugin from 'grapesjs-custom-code';

export default {
    container  : '#gjs2',
    height: '100%',
    fromElement: true,
    storageManager: { type: 0 },
    allowScripts: true,
    plugins: [grapesjsPresetWebpage, exportPlugin, gjsBasics, customCodePlugin],
    pluginsOpts: {
      [grapesjsPresetWebpage]: {
        blocks: [],
        modalImportTitle: 'Import Template',
        modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
        modalImportContent: function(editor) {
          return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
        },
      },
      [gjsBasics]: {
        blocks: []
        // blocks: ['column1', 'column2', 'column3', 'column3-7', 'text'],
        // category: ''
      },
      [customCodePlugin]: {
        blockCustomCode: {
          category: ''
        }
      }
    },
    layerManager: {
        appendTo: '#layers-container'
    },
    blockManager: {
        appendTo: '#blocks'
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
        "https://https://landing.socialbot.dev/static/assets/js/ProductsForm.js",
        "https://https://landing.socialbot.dev/static/assets/js/ProductsForm2.js",
        "https://https://landing.socialbot.dev/static/assets/js/shareButton.js",
      ],
    },
    styleManager: {
        appendTo: '#style-manager-container',
        sectors: [{
                name: 'الأساسية',
                open: false,
                buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
            },{
                name: 'البعد والحجم',
                open: false,
                buildProps: [ 'width', 'height', 'max-width', 'min-height', 'margin', 'padding']
            },{
                name: 'الطباعة',
                open: false,
                buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow']
            },{
            name: 'التزين',
            open: false,
            buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
            },{
            name: 'إضافي',
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
        componentFirst: true,
    },
    traitManager: {
        appendTo: '#traits-container',
    },
    panels: {
        defaults: []
    }
}