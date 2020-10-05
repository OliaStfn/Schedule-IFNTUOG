//---------------------------------Створення об'єкту Date з поточною датою-----------------------
(function () {
    var now = new Date();

}());
//-----------------------------------------------------------------------------------------------


//---------------------------Конвертер дати------------------------------------------------------
function convertDate(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }

    var d = new Date(inputFormat);

    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('.');
}
//-----------------------------------------------------------------------------------------------


//-----------------Функція створення календарів---------------------------------------------------
function datePicker(month = 8) {


    var dt = new Date();
    dt.setMonth(month);

    options = {

        onSelect: instance => {
            var pickerEl = document.getElementById('pick');
            var instanceDateSelected = instance.dateSelected;
            var beginDate = convertDate(instanceDateSelected);

            // Show which date was selected.
            pickerEl.value = instanceDateSelected;

            console.log(instanceDateSelected);
			
			setCurrentDate(beginDate);
        },

        // Customizations.
        formatter: (input, date, instance) => {
            // This will display the date as `1/1/2019`.
            input.value = date.toDateString()
        },

        //position: 'tr', // Top right.
        startDay: 1, // Calendar week starts on a Monday.
        customDays: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        customMonths: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень',
            'Жовтень', 'Листопад', 'Грудень'],

        // Settings.
        alwaysShow: true, // Never hide the calendar.
        dateSelected: new Date(), // Today is selected.
        maxDate: new Date(2099, 0, 1), // Jan 1st, 2099.
        minDate: new Date(2016, 5, 1), // June 1st, 2016.
        startDate: dt, // This month.

     
        disableYearOverlay: true, // Clicking the year or month will *not* bring up the year overlay.

    }

    function createDataPicker(name) {
        var monthsContainer = document.getElementById('months_container');
        var currentPicker = document.createElement('div');
        currentPicker.id = name.replace('#', '');

        monthsContainer.append(currentPicker); //Додає контент всередину обраних елементів в кінець, після наявних

        var picker = datepicker(name, options);
        picker.calendarContainer.style.setProperty('font-size', '1.4rem');
        picker.show();
        dt.setMonth(dt.getMonth() + 1);
    }

    createDataPicker('#month1');
    createDataPicker('#month2');
    createDataPicker('#month3');
    createDataPicker('#month4');
    createDataPicker('#month5');

}
//-----------------------------------------------------------------------------------------------