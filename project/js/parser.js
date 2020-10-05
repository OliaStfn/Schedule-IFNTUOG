//---------------------Ініціалізація парсера---------------------------------------------------
var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest(); //об'єкт, який дає можливість робити HTTP-запити до сервера без перезавантаження сторінки.
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) //З використанням обробника подій onreadystatechange, що викликається при запуску події readystatechange, тобто при кожній зміні властивості readyState об'єкта XMLHttpRequest ми викликаємо функцію, яка перевіряє стан запиту, воно повинно відповідати значенню 4 (операція повністю завершена) і числовий код стану HTTP відповіді (властивість status) повинен відповідати значенням 200 (успішний запит).
				
				
                aCallback(anHttpRequest.responseText); //Ініціалізація аргумента ф-ції, яка приймає текст опираючись на url
        }
        anHttpRequest.open("GET", aUrl, true); //Ініціалізує запит
        anHttpRequest.send(null); //Надсилає запит. Якщо запит є асинхронним, цей метод повертається, як тільки запит буде надісланий.
    }
}
//---------------------------------------------------------------------------------------------

//-----------------------Оголошення глобальних змінних-----------------------------------------

var client = new HttpClient();
var currentDate = '31.03.2020';
var currentLesson = 1;
var currentType = 0;
var currentPlace = 0;

//-----------------------------------------------------------------------------------------------


//-----------------Функція обробки кнопок--------------------------------------------------------
(function () {
    createSchedule();
    const btnList = document.querySelectorAll('.btn-lesson');

    btnList.forEach(btn => {
        btn.addEventListener('click', async ({ currentTarget: { dataset: { lesson } } }) => {
            await setCurrentLesson(lesson);
        });
    });
	
	 const btnType = document.querySelectorAll('.btn-type');

    btnType.forEach(btn1 => {
        btn1.addEventListener('click', async ({ currentTarget: { dataset: { type } } }) => {
            await setCurrentType(type);
        });
    });
	
	 const btnPlace = document.querySelectorAll('.btn-place');

    btnPlace.forEach(btn2 => {
        btn2.addEventListener('click', async ({ currentTarget: { dataset: { place } } }) => {
            await setCurrentPlace(place);
        });
    });

}());
//-----------------------------------------------------------------------------------------------


//--------------------------------Оновлення глобальної змінної date------------------------------
function setCurrentDate(date) {
    currentDate=date;
    createSchedule();
	filterFunction();
}
//-----------------------------------------------------------------------------------------------

//-----------------------------Оновлення глобальної змінної lesson-------------------------------
function setCurrentLesson(lesson) {
    currentLesson=lesson;
    createSchedule();
	filterFunction();
}
//-----------------------------------------------------------------------------------------------


//------------------------------Оновлення глобальної змінної type--------------------------------
function setCurrentType(type) {
    currentType=type.toUpperCase();
    filterFunction();
}
//-----------------------------------------------------------------------------------------------


//---------------------------------Оновлення глобальної змінної place----------------------------
function setCurrentPlace(place) {
    currentPlace=place;
    filterFunction();
}
//-----------------------------------------------------------------------------------------------



//---------------------Створення таблиці з даними про аудиторії корпусу--------------------------
function tableparser(elemtid,block){
	var prevTable, prevTbody;
	prevTable= document.getElementById(elemtid); //Отримання зовнішнього div(у) таблиць
	prevTbody= prevTable.firstChild;// Отримання дочірнього блоку
	if(prevTbody){   //Якщо таблиця існує, то видаляємо її
		prevTable.removeChild(prevTbody);
	}
	
//	'http://iit.nung.edu.ua/jsonhelper/get.php?block_name='+block+'&begin_date='+currentDate+'&lesson='+currentLesson;
	
	
//	http://194.44.112.6/cgi-bin/timetable_export.cgi?req_type=free_rooms_list&req_mode=room&block_name='+block+'&begin_date='+currentDate+'&lesson='+currentLesson+'&req_format=json&coding_mode=UTF8&bs=ok
	
    var theurl = 'http://194.44.112.6/cgi-bin/timetable_export.cgi?req_type=free_rooms_list&req_mode=room&block_name='
        +block+'&begin_date='+currentDate+'&lesson='+currentLesson+'&req_format=json&coding_mode=UTF8&bs=ok'  //Адреса
    client.get(theurl, function (response) {  //Запит до сервера 
        var response1 = JSON.parse(response); // прийняття даних формату json
        var test = document.getElementById(elemtid); //Отримання зовнішнього діву таблиць
        var ulelement = document.createElement("div");  //Створення таблиці корпусу
        for (var i = 0; i < Object.keys(response1.psrozklad_export.free_rooms[0].rooms).length; i++) {  //Заповнення таблиці даними
            var data = response1.psrozklad_export.free_rooms[0].rooms[i];  
            ulelement.innerHTML += " <div class='classroom classroom-"+elemtid+"'> <strong>" + data.name.replace('.ауд.','')
                + "</strong><div class='type-place'> <div class='lvalue'><span>"+data.type +
                "</span></div> <div class='lvalue'><span>(" + data.places + ")</span></div></div>";
        }
		
        test.appendChild(ulelement);
    });
}
//-----------------------------------------------------------------------------------------------


//-------------Створення 10 таблиць корпусів-----------------------------------------------------
function createSchedule() {
    tableparser('tableReport', 0);
    tableparser('tableReport1', 1);
    tableparser('tableReport2', 3);
    tableparser('tableReport3', 4);
    tableparser('tableReport4', 5);
    tableparser('tableReport5', 7);
    tableparser('tableReport6', 8);
    tableparser('tableReport7', 9);
    tableparser('tableReport8', 12);
    tableparser('tableReport9', '%C0%ED%E3%E0%F0');
//'%C0%ED%E3%E0%F0'старий код ангару     %D0%90%D0%BD%D0%B3%D0%B0%D1%80 new code
}
//-----------------------------------------------------------------------------------------------


//---------------------Фільтрація першого порядку за типом аудиторій-----------------------------
function filter(getid) {
    var  tr, td, i, txtValue;
	tr = document.getElementsByClassName('classroom-'+getid); //отримання масиву дівів з класом 'classroom-'+getid
	for(i = 0; i < tr.length; i++){
		td = tr[i].getElementsByClassName("lvalue")[0]; //отримання діву з типом аудиторії
		txtValue = td.textContent || td.innerText; // отримання контенту з діву
		if (txtValue.toUpperCase() == currentType || currentType==0) {  // перевірка на фільтр
			filter2(tr[i]); //Виклик фільтрації другого порядку
		} else {
			tr[i].style.display = "none"; //Приховування блоку аудиторії
		}
	}
}
//-----------------------------------------------------------------------------------------------



//-------------------Фільтрація другого порядку за кількістю місць-------------------------------
function filter2(tr) {
 	var td = tr.getElementsByClassName("lvalue")[1]; //отримання діва з інформацією про кількість місць
	var numValue = td.textContent || td.innerText;  //отримання контенту з діву
	numValue = numValue.replace('(','');  //Видалення дужок
	numValue = numValue.replace(')','');

	switch(currentPlace){ //Фільтрація за кількістю місць
		case "0": 
			tr.style.display = ""; //Відображення блоку аудиторії
			break;

		case "10": 
			if (numValue<=10){
				tr.style.display = "";
			}else{
				tr.style.display = "none";
			}
			break;

		case "15": 
			if (numValue>10 && numValue<=15){
				tr.style.display = "";
			}else{
				tr.style.display = "none";
			}
			break;

		case "20": 
			if (numValue>15 && numValue<=20){
				tr.style.display = "";
			}else{
				tr.style.display = "none";
			}
			break;

		case "30": 
			if (numValue>20 && numValue<=30){
				tr.style.display = "";
			}else{
				tr.style.display = "none";
			}
			break;

		case "31": 
			if (numValue>30){
				tr.style.display = "";
			}else{
				tr.style.display = "none";
			}
			break;
	}
}
//-----------------------------------------------------------------------------------------------


//--------------------------Виклик фільтрації для всіх корпусів----------------------------------
function filterFunction() {
    filter('tableReport');
    filter('tableReport1');
    filter('tableReport2');
    filter('tableReport3');
    filter('tableReport4');
    filter('tableReport5');
    filter('tableReport6');
    filter('tableReport7');
    filter('tableReport8');
    filter('tableReport9');
}
//-----------------------------------------------------------------------------------------------