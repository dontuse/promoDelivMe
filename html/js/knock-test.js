

ko.validation.localize({
    required: 'Необходимо заполнить это поле.',
    min: 'Значение должно быть больше или равно {0}.',
    max: 'Значение должно быть меньше или равно {0}.',
    minLength: 'Длина поля должна быть не меньше {0} символов.',
    maxLength: 'Длина поля должна быть не больше {0} символов.',
    pattern: 'Пожалуйста проверьте это поле.',
    step: 'Значение поле должно изменяться с шагом {0}',
    email: 'Введите в поле правильный адрес email',
    date: 'Пожалуйста введите правильную дату',
    dateISO: 'Пожалуйста введите правильную дату в формате ISO',
    number: 'Поле должно содержать число',
    digit: 'Поле должно содержать цифры',
    phoneUS: 'Поле должно содержать правильный номер телефона',
    equal: 'Значения должны быть равны',
    notEqual: 'Пожалуйста выберите другое значение.',
    unique: 'Значение должно быть уникальным.'
});
ko.validation.configure({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    errorMessageClass : "b-contol__error",
    errorElementClass : "b-contol__input_error",
    decorateInputElement: true
});



function formViewModel() {

    this.self = this;

    this.fio = ko.observable().extend({
        required: true
    });

    this.email = ko.observable().extend({
        email: true,
        required: true
    });

    this.phone = ko.observable().extend({
        required: true,
        digit: true
    });

    this.site = ko.observable().extend({
        required: true
    });



    this.fufu = function () {
        console.log(this);
        if (this.errors().length == 0) {
            alert('Thank you.');

        } else {
           // alert('Please check your submission.');
            this.errors.showAllMessages();
        }
    }

    this.errors = ko.validation.group(this);

}

// Activates knockout.js
$(function () {
    ko.applyBindings(new formViewModel());
});

