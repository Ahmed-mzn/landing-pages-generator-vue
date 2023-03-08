const script = function(props) {
    const app1El = document.createElement("div");
    app1El.id = "app2";

    this.appendChild(app1El);
    const app1Script = document.createElement("script");
    app1Script.type = "text/javascript";
    app1Script.src = "http://localhost:8080/messi.js";

    this.appendChild(app1Script);

    const inputEl = document.createElement("input");
    inputEl.value = props.template
    inputEl.id = "props-template-id"
    inputEl.style = "display: none;"
    
    this.appendChild(inputEl);

    const inputElTemplateType = document.createElement("input");
    inputElTemplateType.value = props.template_code
    inputElTemplateType.id = "props-template-code"
    inputElTemplateType.style = "display: none;"

    this.appendChild(inputElTemplateType);
}
export default (editor, template_id) => {
    editor.Components.addType('stars',{
        model: {
            defaults: {
                components:`<div class="mt-1 mb-1 nowrap"></div>`,
                script: function(props) {
                    // const div = document.getElementById("stars-test");
                    this.innerHTML = ''
                    for(let i=0; i<props.number;i++){
                        this.innerHTML += `<span style="color: var(--bs-secondary);margin-left: 5px;"><i class="fas fa-star"></i></span>`
                    }
                },
                // Add some style, just to make the component visible
                style: {
                    fontSize: "12px",
                },
                // Define default values for your custom properties
                number: '2',
                // Define traits, in order to change your properties
                traits: [
                    {
                        type: 'select',
                        name: 'number',
                        changeProp: true,
                        options: [
                            { value: '1', name: '1 Star' },
                            { value: '2', name: '2 Stars' },
                            { value: '3', name: '3 Stars' },
                            { value: '4', name: '4 Stars' },
                            { value: '5', name: '5 Stars' },
                        ]
                    }
                ],
                'script-props': ['number'],
            }
        }
    });
    editor.Components.addType('productsForm',{
        model: {
            defaults: {
                components:``,
                script: script,
                template: template_id,
                template_code: 'template_one',
                traits: [
                    {
                        type: 'select',
                        name: 'template',
                        options: [
                            { value: template_id, name: 'dont change !' },
                        ],
                        attributes: {style: 'display: none'}
                    },
                    {
                        type: 'select',
                        name: 'template_code',
                        options: [
                            { value: 'template_one', name: 'dont change !' },
                        ],
                        attributes: {style: 'display: none'}
                    },
                ],
                'script-props': ['template', 'template_code']
            }
        } 
    });
    editor.Components.addType('productsForm2',{
        model: {
            defaults: {
                components:``,
                script: script,
                template: template_id,
                template_code: 'template_two',
                traits: [
                    {
                        type: 'select',
                        name: 'template',
                        options: [
                            { value: template_id, name: 'dont change !' },
                        ],
                        attributes: {style: 'display: none'}
                    },
                    {
                        type: 'select',
                        name: 'template_code',
                        options: [
                            { value: 'template_two', name: 'dont change !' },
                        ],
                        attributes: {style: 'display: none'}
                    },
                ],
                'script-props': ['template', 'template_code'],
            }
        } 
    });
}