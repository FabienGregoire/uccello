export class ModuleManager {
    constructor() {
        this.initCheckboxListener()
    }

    initCheckboxListener() {
        $("input[type='checkbox'].module-activation").on('click', (event) => {
            let element = event.currentTarget
            let url = $("meta[name='module-activation-url']").attr('content')

            $.post(url, {
                _token: $("meta[name='csrf-token']").attr('content'),
                src_module: $(element).data('module'),
                active: $(element).is(':checked') === true ? '1' : '0'
            }).then(() => {
                let text = $(element).is(':checked') === true ? uctrans.trans('uccello::settings.module_manager.notification.module_activated') : uctrans.trans('uccello::settings.module_manager.notification.module_deactivated')
                M.toast({html: text})
            })
            .fail((error) => {
                swal(uctrans.trans('uccello::default.dialog.error.title'), uctrans.trans('uccello::settings.error.save'), 'error')
            })
        })
    }
}