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
    var startingYear = 2020
    var isLeapYear = false;
    const date = new Date();
    var fire = date.toLocaleDateString(); //this is how we'll get the date
    var water = date.getDay();
    console.log("Ordinal Date: " + getOrdinalDate(date)) // so right now this is how we are going to calculate the ordinal date and thus off this date we can assign Days based on what day it is either from start or from behind
    
    

    console.log("The current day is :" + (1 + (getOrdinalDate(date)-1)) % 7) // only way i can think of to get the current day of the week everytime and from here we can build the calendar!
    /* 
    so lets say July 1 is Monday which is represented by a 1
    so if we get a string like date.LocalDate is 7/30/2024 we want to know what day it is
    based off the first day of the year pretty simple but lets just figuyre out what day 
    it is based off the number in the same month
    so July 1 is a Monday which is a 1 
    I am mkaing this comment July 30th which is a Tuesday which is a 2
    therefore (currentdateday = 30 - first day number (1) ) % 6 = current day?????
    Lets test!

    June 1st is a saturday whiuch is a 6(saturday) if its the 15th then
    15th - 6 = 9 % 6 = 3 which is a wednesday 

    that didnt work 1 + 7 which is a week + 7 which is a week = 15th it shouldve been the same day
    but that gives us a hint~!

    what if we do June 1st is a 6 if its a 15 - 1 % 7 = 0 + first day (6) = 6 SATURDAY

    so by that logic June 1st is a 6(saturday) then lets try June 19th -1 = 18 % 7 = 4 + first day = 10 % 6 = 4 june 19th is a Thurs!

    okay...that didnt work either

    May   20th may starts on a wedneday which is 3 0 sun 1 mon 2 tues 3 wed, now we can do 
    3 (start day) + 20 - 1 (for the current day) % 7 some sort of arrange of this makes the currentd ay
    22 % 7 = 1 which is a monday so the 20th of may is a monday 


    */
    if (startingYear % 400 == 0){
        isLeapYear = true;
    }


}


calendarDates();