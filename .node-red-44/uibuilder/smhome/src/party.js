partyActivate = function(ev) {
    console.log("Activate Party");
    var datetime=partyUntilDateTime();
    var temperature = partyGetTemperature();
    var roomIds = partyGetRoomIds();
    if (datetime && temperature>0 && roomIds && roomIds.length > 0) {
        let payload = { 
            until : datetime,
            temperature : temperature,
            roomIds : roomIds,
            message : "Set party mode"
        };
        let topic = 'cmdhomegear/SetParty';
        console.log("send <" + topic + ">");
    //    var roomId="kitchen";
    //    var profile = "data";
    //    Adapter.onGetHeatingWeekProfile(roomId, profile);    
        uibuilder.send( { 'topic': topic, 'payload': payload } );
    }
}

partyUntilDateTime = function() {
    var dateTimeStruct;
    var datetime=$('#partyDateTimePicker').data("DateTimePicker").date();
    if (datetime) {
        var year = datetime.year();
        var month = datetime.months();
        var day = datetime.date();
        var h = datetime.hours();
        var m = datetime.minutes();
        if (year && month && day && h && m) {
            dateTimeStruct = {};
            dateTimeStruct.year = year - 2000;
            dateTimeStruct.month = month + 1;
            dateTimeStruct.day = day;
            dateTimeStruct.hour = h;
            dateTimeStruct.minute = m;
        }
    }
    return dateTimeStruct;
}

partyGetTemperature = function() {
    var temperature = $('#partyTemperatureInput').val();
    return temperature;
}

partyGetRoomIds = function() {
    var grp = $("#partyRoomChooseGroup");
    var selitems= grp.val();
    return selitems;
}

