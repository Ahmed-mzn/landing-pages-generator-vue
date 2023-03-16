export default (state, axios) => {
    state.editor.Commands.add('save-in-db', {
        run: editor => {
            // editor.store();
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
            state.loading = true
            setTimeout(()=> {state.loading=false}, 1000)
        }
    });
    state.editor.Commands.add('back-to-dashboard', {
        run: editor => {
            state.$router.push("/landing-app")
        }
    });
};
