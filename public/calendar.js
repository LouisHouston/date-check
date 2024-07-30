function calendarDates() {
    var startingYear = 2020
    var isLeapYear = false;
    const date = new Date();
    var fire = date.toLocaleDateString(); //this is how we'll get the date
    console.log(fire)

    if (startingYear % 400 == 0){
        isLeapYear = true;
    }


}


calendarDates();