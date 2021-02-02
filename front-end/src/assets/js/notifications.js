import $ from 'jquery';

const closable = 
    `<div class='icon-close-notify'>
        <i class='fa fa-times' aria-hidden='true'></i>
    </div>`


const template = (obj) => (
    `<div class='${obj.type}-notify alerts ${obj.closable ? 'alert-notify' : ''}'>
        <div class='content-text'>
            <div class='icon-notify'>
                <i class="fa fa-exclamation-circle fa-3x" aria-hidden="true"></i>
            </div>
            <div class='text-info-notify'>
                <label class='title-notify mb-0'>${obj.title}</label>
                <p class='text-message'>${obj.message}</p>
            <div>
            ${obj.closable ? closable : ''}
        </div>
    </div>`
)

const close = () => {
    $('.alert-notify').each(function () {
        $(this).find('.icon-close-notify').click(function () {
            $(this).parents('div.alert-notify').fadeOut(700, () => {
                $(this).remove();
            });
        })
    })
}

const execute = (obj) => {
    let ele = $(template(obj)).appendTo($('#container-notify'));
    if (obj.time) {
        setTimeout(() => {
            ele.fadeOut(3000, () => {
                ele.remove();
            });
        }, obj.time * 1000)
    }
}
export const error = (obj) => {
    execute(obj);
    close();
}



