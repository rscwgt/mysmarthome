tblInit = function() {
    console.log("tbl_init called");
    $('#weekProfileTable').editableTableWidget().numericInputExample().find('td:first').focus();
    $('#textAreaEditor').editableTableWidget({editor: $('<textarea>')});
    window.prettyPrint && prettyPrint();

    $("input[name=weekdayChoose]:radio").bind( "change", function(event, ui) {
        console.log('Weekday: '+$(this).val());
        var id = $(this).attr('id');
        var data = tblGetProfileData();
        tblSetProfile(id,data.data);
        // Call function here
    });
    $('#weekProfile').on('changeData', function (e) {    
        console.log("Change data event received "+this.id);
        var data = tblGetProfileData();
        var dayId = getSelectedDayId();
        tblSetProfile(dayId, data.data);
    });
    $('#visibleWeekprofileDay').on('changed.bs.select', function (e) {
        var data = tblGetProfileData();
        var dayId = getSelectedDayId();
        tblSetProfile(dayId, data.data);
    });
    $('#weekProfileTable td').on('change', function(evt, newValue) {
        // do something with the new cell value 
        var rowIndex = $(this).parent().index();
        var colIndex = $(this).index();
        console.log("table row/col "+rowIndex+"/"+colIndex);
    });
/*    
    $("div.btn-group label input").each(function() {
        $(this).on("click", function(item){
            console.log("button: Item geklickt");
            var act = $("div.btn-group").find(".active");
            act.removeClass("active");
            console.log("rb: set "+$(this).text()+" active");
            $(this)./addClass("active");
        });
    });
*/    
    /*
    console.log("table: script");
    $("ul#tblTab li").each(function() {
        $(this).on("click", function(item){
            console.log("table: Item geklickt");
            $("ul#tblTab").find(".active").removeClass("active");
            $(this).parent().addClass("active");
        });
    });
    */
}

tblGetProfileData = function() {
    var data = $("#weekProfile").data();
    return data;
}

tblSetProfile = function(dayId, data) {
    console.log("Set Profile for day = "+dayId);
    var day = getDay(dayId);
    console.log("tblSet day = "+day);
    var profile = getWeekProfileForDay(day, data);
    var table = $("#weekProfileTable");
    var tbody = table.children('tbody');
    tbody.empty();
    var tableRef = tbody[0];

    var max = 13;
    var count = 0;
    var lastEndtime = 2400;
    var minTemperature = 17.0;
    profile.forEach(function(element) {
        console.log(element);
        tblAppendProfileItem(tableRef, element.endtime, element.temperature);
        count++;
    });
    for (var index=count; index<max; index++) {
        tblAppendProfileItem(tableRef, lastEndtime, minTemperature);
    }
    
    $('#weekProfileTable').editableTableWidget().numericInputExample().find('td:first').focus();
    $('#textAreaEditor').editableTableWidget({editor: $('<textarea>')});
    window.prettyPrint && prettyPrint();
/*    
    $('#weekProfileTable td').on('change', function(evt, newValue) {
        // do something with the new cell value 
        var rowIndex = $(this).parent().index();
        var colIndex = $(this).index();
        console.log("table row/col "+rowIndex+"/"+colIndex);
    });    
*/    
}

tblAppendProfileItem = function(tableRef, endtime, temperature) {
    // Insert a row in the table at the last row
    var newRow   = tableRef.insertRow(tableRef.rows.length);
    // Insert a cell in the row at index 0
    var newCellTime  = newRow.insertCell(0);
    var newCellTemp  = newRow.insertCell(1);
    // Append a text node to the cell
    var newTime  = document.createTextNode(endtime);
    newCellTime.appendChild(newTime);
    var newTemp  = document.createTextNode(temperature);
    newCellTemp.appendChild(newTemp);
}

tblCopyProfileToDays = function() {
    var grp = $("#SelCopyProfileDays");
    var selitems= grp.val();
    console.log("Selected Items: "+selitems);
    var data = tblGetProfileData();
    var fromDay = getSelectedDayId().toUpperCase();
    selitems.forEach(function(toDay) {
        data.data[toDay.toUpperCase()] = data.data[fromDay.toUpperCase()];
    });
}

getSelectedRoomId = function() {
    var grp = $('#roomChooseGroup');
//    var item = grp.find('input[name="roomChoose"]:checked');
    var item = grp.val();
    console.log("Room: "+item);
    var id = item; //$(item).attr('id');
    console.log("Room Id = "+id);
    return id;
}

getSelectedDayId = function() {
 //   var grp = $('#weekDayChooseGroup');
 //   var item = grp.find('input[name="weekdayChoose"]:checked');
    var grp = $('#visibleWeekprofileDay');
    var item = grp.val();
    var id = item; //$(item).attr('id');
    console.log("Day Id = "+id);
    return id;
}

getDay = function(dayId) {
    for (var index=0; index<days.length; index++) {
        if (dayId.toLowerCase().indexOf(days[index].toLowerCase()) >= 0) {
            return days[index];
        }
    }
    return null;
}
getWeekProfileForDay = function(day, data) {
    if (!day || !data) {
        return [];
    }
    return  data[day];
}

