partyActivate = function(ev) {
    console.log("Activate Party");
    var datetime=$('#partyDateTimePicker').data("DateTimePicker").date();
    var year = datetime.year();
    var month = datetime.months()+1;
    var day = datetime.date();
    var h = datetime.hours();
    var m = datetime.minutes();
    var temperature = $('#partyTemperatureInput').val();
    var grp = $("#partyRoomChooseGroup");
    var selitems= grp.val();
    console.log("Date "+date);
    console.log("Year ", year);

    console.log("Temperature "+temperature);
    console.log("Selected Items: "+selitems);
/*    
    var data = tblGetProfileData();
    var fromDay = getSelectedDayId().toUpperCase();
    selitems.forEach(function(toDay) {
        data.data[toDay.toUpperCase()] = data.data[fromDay.toUpperCase()];
    });
    */
}

