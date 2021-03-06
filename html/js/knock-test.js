

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

    var self = this;

    this.fio = ko.observable('qwewqe').extend({
        required: true
    });

    this.email = ko.observable('mail@dd.ru').extend({
        email: true,
        required: true
    });

    this.phone = ko.observable(123213).extend({
        required: true,
        digit: true
    });

    this.site = ko.observable('site').extend({
        required: true
    });

    this.optionValues = [
        '00:00 – 01:00',
        '01:00 – 02:00',
        '03:00 – 04:00',
        '04:00 – 05:00',
        '05:00 – 06:00'

    ];

    this.multipleSelectedOptionValues = [
        '05:00 – 06:00'

    ]

    this.done = ko.observable(false);
    this.form = ko.observable(true);



    this.submit = function () {
        console.log(this);
        if (this.errors().length == 0) {
            $.ajax("ajax/cy.json", {
                data: ko.toJSON({ tasks: self }),
                type: "post", contentType: "application/json",
                success: function(result) {
                    self.done(true);
                    self.form(false);
                }
            });


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

