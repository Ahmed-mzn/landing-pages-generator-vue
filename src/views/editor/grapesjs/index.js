this.editor.Components.addType('comp-with-js2', {
    model: {
        defaults: {
        script: function() {
            const app1El = document.createElement("div");
            app1El.id = "app2";

            this.appendChild(app1El);
            const app1Script = document.createElement("script");
            app1Script.type = "text/javascript";
            app1Script.src = "./messi.js";

            this.appendChild(app1Script);
            },
        // Add some style, just to make the component visible
        style: {
            width: '100px',
            height: '100px',
            background: 'green',
        },
        // Define default values for your custom properties
        myprop1: 'value1',
        myprop2: '10',
        // Define traits, in order to change your properties
        traits: [
            {
            type: 'select',
            name: 'myprop1',
            changeProp: true,
            options: [
                { value: 'value1', name: 'Value 1' },
                { value: 'value2', name: 'Value 2' },
            ],
            }, {
            type: 'number',
            name: 'myprop2',
            changeProp: true,
            }
        ],
        // Define which properties to pass (this will also reset your script on their changes)
        'script-props': ['myprop1', 'myprop2'],
        // ...
        }
    }
    });
    this.editor.Blocks.add('test-block2', {
    label: 'Test block2',
    attributes: { class: 'fa fa-text' },
    content: { type: 'comp-with-js2' },
    });


//data-gjs-type="stars" data-gjs-number="5"