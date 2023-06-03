export default (state, axios) => {
    state.editor.Commands.add('save-in-db', {
        run: editor => {
            // editor.store();
            state.loading = true
            const data = {
                html: state.editor.getHtml(),
                css: state.editor.getCss(),
                js: state.editor.getJs(),
                project_data: JSON.stringify(state.editor.getProjectData())
            }
            // console.log(data);
            axios.post(`/templates/${state.$route.params.id}/save_html/`, data)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
            setTimeout(()=> {state.loading=false}, 2000)
        }
    });
    state.editor.Commands.add('back-to-dashboard', {
        run: editor => {
            // state.$router.push("/landing-app")
            state.$router.go(-1)
        }
    });
    state.editor.Commands.add('add-section', {
        run: editor => {
            state.showSectionModal = true
        }
    });

    state.editor.Commands.add('open-template-settings', {
        run: editor => {
            state.showSettingModal = true
        }
    });

    state.editor.Commands.add('preview-template', {
        run: editor => {
            if (!state.is_child){
                window.open('http://'+state.template.domain.name + '/' + state.template.template_name, '_blank');
            }
        }
    });

    state.editor.Commands.add('test', {
        run: editor => {
            state.showScrapModal = true
            // axios.post('/templates/scarp_page/', {website_url: 'https://rashof.com/'})
            // .then(response => {
            //     console.log(response);
            //     editor.setComponents(response.data.content)
            // })
            // .catch(error => {
            //     console.log(error);
            // })
        }
    });
};
