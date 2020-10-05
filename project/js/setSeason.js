//-----------------Функція обробки кнопок зміни сезонів------------------------------------------
(() => {
    const btnList = document.querySelectorAll('.btn-season'); //Пошук по селектору серед всіх елементів
    const monthsContainer = document.getElementById('months_container');

    datePicker();

    const deleteChild = () => { //Видалення попередніх календарів 
        let child = monthsContainer.lastElementChild;
        while (child) {
            monthsContainer.removeChild(child);
            child = monthsContainer.lastElementChild;
        }
    };

    btnList.forEach(btn => { 
        btn.addEventListener('click', async ({ currentTarget: { dataset: { season }} }) => {
            await deleteChild();

            await datePicker(season);
        });
    });
})();
//-----------------------------------------------------------------------------------------------