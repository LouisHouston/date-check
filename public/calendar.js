
class CustomDate{
    constructor (month, day, year){ //default constructor
        if(arguments.length === 0 ){
        const today = new Date();
        this.month = today.getMonth();
        this.day = today.getDay();
        this.year = today.getFullYear();
        }else{ // this is like a constructor
            this.month = month;
            this.day = day;
            this.year = year;
        }
    }
  

    displayDate() {
        console.log(`${this.month}/${this.day}/${this.year}`);
    }

    getMonth(){
        return this.month;
    }

    getDay(){
        return this.day;
    }

    getYear(){
        return this.year;
    }

    getDate() {
        return `${this.year}-${String(this.month).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`;
    }

    decrementMonth(){ // to loop forward
        if(this.month == 0){
            this.month = 11;
            this.year -= 1;
        }else{
            this.month -= 1;
        }
    }

    incrementMonth(){ // to loop back
        if(this.month == 11){
            this.month = 0
            this.year += 1
        }else {
            this.month += 1;
        }
    }

}

class user{
    constructor(startingDate, endingDate){
        this.startingDate = new CustomDate();
        this.endingDate = new CustomDate();
    }
    
    getStartingDate(){
        return this.startingDate;
    }

    getEndingDate(){
        return this.endingDate;
    }

    storeDate(date) {
        if (this.startingDate === null) {
            this.startingDate = date;
        } else if (this.endingDate === null) {
            this.endingDate = date;
        } else {
            this.startingDate = date;
            this.endingDate = null;
        }
    }
}

let currentWorkingDate = new CustomDate();

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

function calendarDates(date) {
    const customUser = new user();
    const currentYear = date.getYear();
    const currentMonth = date.getMonth(); 
    const currentDay = date.getDate();
    const monthNames = Object.keys(getMonthDays(currentYear));
    const daysInMonth = getMonthDays(currentYear)[monthNames[currentMonth]];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';
    calendarDiv.style.display = 'grid';
    calendarDiv.style.gridTemplateColumns = 'repeat(7, 1fr)';

    const monthHeader = document.getElementById('monthHeader');
    monthHeader.innerHTML=monthNames[currentMonth] + ' ' + currentYear;

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
       
        const startingDate = customUser.getStartingDate();
        const endingDate = customUser.getEndingDate();

        dayButton.classList = "button-6";
        dayButton.innerText = day;
        if (startingDate.getDay <=day  && endingDate.getDay() >= day) {
            dayButton.classList = "button-6-clicked";
            console.log("WORKINGG")
        }
        dayButton.onclick = () => {
            const selectedDate = new CustomDate(currentMonth + 1, day, currentYear);
            customUser.storeDate(selectedDate);
            clearHighlights();

            const startingDate = customUser.getStartingDate();
            const endingDate = customUser.getEndingDate();

            if (startingDate && endingDate) {
                highlightRange(startingDate, endingDate, currentYear, currentMonth);
            }

            const formattedDate = `${currentMonth + 1}/${day}/${currentYear}`;
            dayButton.classList = "button-6-clicked";
        };
        calendarDiv.appendChild(dayButton);
    }

    function clearHighlights() {
        const buttons = calendarDiv.getElementsByTagName('button');
        for (let button of buttons) {
            button.classList.remove('button-6-clicked');
        }
    }

    function highlightRange(startingDate, endingDate, currentYear, currentMonth) {
        const buttons = calendarDiv.getElementsByTagName('button');
    
        const start = new Date(startingDate.year, startingDate.month - 1, startingDate.day).getTime();
        const end = new Date(endingDate.year, endingDate.month - 1, endingDate.day).getTime();
    
        for (let button of buttons) {
            const day = parseInt(button.innerText);
            const currentDate = new Date(currentYear, currentMonth, day).getTime();
    
            if (currentDate >= start && currentDate <= end) {
                button.classList.add('button-6-clicked');
            }
        }
    }
}


document.getElementById("decrementMonth").addEventListener("click",decrementMonth);

function decrementMonth(){
    currentWorkingDate.decrementMonth();
    calendarDates(currentWorkingDate);
}

document.getElementById("incrementMonth").addEventListener("click",incrementMonth);

function incrementMonth(){
    currentWorkingDate.incrementMonth();
    calendarDates(currentWorkingDate);
}
