export default (editor) => {
    editor.Panels.addPanel(
    {
      id: "options",
      buttons: [
        {
          id: "save-in-db-2",
          label: `<button class="btn btn-success btn-sm">حفظ</button>`,
          command: "save-in-db",
        },
        {
          id: "color",
          label: `<input style="width: 35px;height: 28px;" type="color" placeholder="لوان الأساسية" class="form-control">`,
        },
        {
          id: "save-in-db",
          className: "fa-save mr-3",
          command: "save-in-db",
        },
        {
          id: "sw-visibility",
          className: "fa-square",
          context: "sw-visibility",
          command: "sw-visibility",
        },
        {
          id: "preview",
          className: "fa-eye",
          context: "preview",
          command: () => editor.runCommand("preview"),
        },
        {
          id: "fullscreen",
          className: "fa-full",
          context: "fullscreen",
          command: "fullscreen",
        },
        {
          id: "export-template",
          className: "fa-code",
          context: "export-template",
          command: "export-template",
        },
        {
          id: "undo",
          className: "fa-undo",
          command: () => editor.runCommand("core:undo"),
        },
        {
          id: "redo",
          className: "fa-redo",
          command: () => editor.runCommand("core:redo"),
        },
        {
          id: "gjs-open-import-webpage",
          className: "fa-import",
          command: () => editor.runCommand("gjs-open-import-webpage"),
        },
        {
          id: "canvas-clear",
          className: "fa-clear",
          command: () => editor.runCommand("canvas-clear"),
        },
      ],
    });
    editor.Panels.addPanel({
      id: "views",
      buttons: [
        {
          id: "open-sm",
          className: "fa-pen",
          command: "open-sm",
          active: true,
        },
        {
          id: "open-tm",
          className: "fa-setting",
          command: "open-tm",
        },
        {
          id: "open-layers",
          className: "fa-layers",
          command: "open-layers",
        },
        {
          id: "open-blocks",
          className: "fa-add",
          command: "open-blocks",
        },
      ],
    });
    editor.Panels.addPanel({
      id: "devices-c1",
      buttons: [
        {
          id: "device-desktop",
          className: "fa-desktop",
          active: true,
          command: "set-device-desktop",
          togglable: false,
        },
        {
          id: "device-tablet",
        //   label: `<svg style="display: block; max-width:22px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#f1f1f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon fill="#044B94" fill-opacity="0.4" points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline fill="#044B94" fill-opacity="0.4" points="2 17 12 22 22 17"></polyline><polyline fill="#044B94" fill-opacity="0.4" points="2 12 12 17 22 12"></polyline></svg>`,
          command: "set-device-tablet",
          className  : "fa-tablet",
          togglable: false,
        },
        {
          id: "device-mobile",
          label: `
                <svg style="display: block; max-width:22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M11 17.25C10.5858 17.25 10.25 17.5858 10.25 18C10.25 18.4142 10.5858 18.75 11 18.75V17.25ZM11.0092 18.75C11.4234 18.75 11.7592 18.4142 11.7592 18C11.7592 17.5858 11.4234 17.25 11.0092 17.25V18.75ZM11 18.75H11.0092V17.25H11V18.75ZM7.33333 3.75H14.6667V2.25H7.33333V3.75ZM15.75 5V19H17.25V5H15.75ZM14.6667 20.25H7.33333V21.75H14.6667V20.25ZM6.25 19V5H4.75V19H6.25ZM7.33333 20.25C6.79512 20.25 6.25 19.7531 6.25 19H4.75C4.75 20.456 5.8465 21.75 7.33333 21.75V20.25ZM15.75 19C15.75 19.7531 15.2049 20.25 14.6667 20.25V21.75C16.1535 21.75 17.25 20.456 17.25 19H15.75ZM14.6667 3.75C15.2049 3.75 15.75 4.24688 15.75 5H17.25C17.25 3.54398 16.1535 2.25 14.6667 2.25V3.75ZM7.33333 2.25C5.8465 2.25 4.75 3.54398 4.75 5H6.25C6.25 4.24688 6.79512 3.75 7.33333 3.75V2.25Z" fill="#fff"/>
                </svg>
                `,
          command: "set-device-mobile",
          togglable: false,
        },
      ],
    });

    const openBl = editor.Panels.getButton('views', 'open-blocks');
    editor.on('load', () => openBl?.set('active', true));

    // On component change show the Style Manager
    editor.on('component:selected', () => {
        const openSmBtn = editor.Panels.getButton('views', 'open-sm');
        const openLayersBtn = editor.Panels.getButton('views', 'open-layers');

        // Don't switch when the Layer Manager is on or
        // there is no selected component
        if ((!openLayersBtn || !openLayersBtn.get('active')) && editor.getSelected()) {
        openSmBtn?.set('active', true);
        }
    });
};
