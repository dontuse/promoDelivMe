ko.bindingHandlers.datepicker = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).datepicker(options);

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            observable($(element).datepicker("getDate"));
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).datepicker("destroy");
        });

    },
    //update the control when the view model changes
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            current = $(element).datepicker("getDate");

        if (value - current !== 0) {
            $(element).datepicker("setDate", value);
        }
    }
};



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

    self.folders = ['1', '2', '3', '4'];
    self.chosenFolderId = ko.observable();

    self.goToFolder = function(folder) {
        self.chosenFolderId(folder);
        console.log(folder)
    };

    this.fio = ko.observable('Абрахим Абрахим ').extend({
        required: true
    });

    this.email = ko.observable('mail@dd.ru').extend({
        email: true,
        required: true
    });

/*    this.phone = ko.observable(123213).extend({
        required: true,
        digit: true
    });*/

    this.birthday = ko.observable().extend({
        required: true
    });

    this.pff = function() {
        //$('#q').focus();
        console.log(this.datepicker);

        this.datepicker.show();
    }

    this.phone = {
        code: ko.observable(777).extend({
            required: true,
            digit: true
        }),
        num: ko.observable(213123123).extend({
            required: true,
            digit: true
        })
    }

    this.fullPhone = ko.computed(function(){
        return(self.phone.code() +' +++ '+ self.phone.num());
        //return 2 + 2;
    },this);


    this.educationValues = [
        'начальное',
        'основное',
        'среднее',
        'неполное высшее',
        'высшее'
    ];

    this.subscription = ko.observable().extend({ required: true });

    this.multipleSelectedOptionValues = [
        '05:00 – 06:00'
    ]

    this.done = ko.observable(false);
    this.form = ko.observable(true);



    this.submit = function () {
        console.log(this);
        console.log(self.fullPhone());
        $('#pr').width('90%');
        if (this.errors().length == 0) {
            $.ajax("ajax/cy.json", {
                data: ko.toJSON({tasks: self}),
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
    //this.errors = ko.validation.group(this.phone);

    this.next = function() {
        return false;
    };



}

// Activates knockout.js
$(function () {
    ko.applyBindings(new formViewModel());
});

