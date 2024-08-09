// January 1st is a Monday or a 1


function isLeapYear(year) { // this was a quiz in class not tooooo long ago im not that old!
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getOrdinalDate(date) {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
       
    if (isLeapYear(year)) {
        monthDays[1] = 29;
    }

    let ordinalDate = 0;
    for (let i = 0; i < month; i++) {
        ordinalDate += monthDays[i];
    }

    ordinalDate += day;

    return ordinalDate;
}

/**
 * @param {Date()} date - Date object for deconstruction of todays current date
 */
function getTheDate(){
    const date = new Date();
    var currMonth, currDay, currYear;
    currMonth = date.getMonth() + 1;
    currDay = date.getDate();
    currYear = date.getFullYear();

    return currMonth + "/" + currDay + "/" + currYear;
}


function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getMonthDays(year) {
    return {
        January: 31,
        February: isLeapYear(year) ? 29 : 28,
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31
    };
}


function calendarDates() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); 
    const currentDay = today.getDate();
    const monthNames = Object.keys(getMonthDays(currentYear));
    const daysInMonth = getMonthDays(currentYear)[monthNames[currentMonth]];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const calendarDiv = document.getElementById('calendar');

    calendarDiv.style.display = 'grid';
    calendarDiv.style.gridTemplateColumns = 'repeat(7, 1fr)';

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.innerText = day;
        calendarDiv.appendChild(dayHeader);
    });

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendarDiv.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayButton = document.createElement('button');
        dayButton.innerText = day;
        dayButton.onclick = function() {
            alert(`You clicked on ${currentMonth + 1}/${day}/${currentYear}`);
        };
        calendarDiv.appendChild(dayButton);
    }
}


calendarDates();