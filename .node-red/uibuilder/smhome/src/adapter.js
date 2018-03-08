
function Adapter() {
    console.log("Adapter called");
    // If msg changes - msg is updated when a standard msg is received from Node-RED over Socket.IO
    // Note that you can also listen for 'msgsReceived' as they are updated at the same time
    // but newVal relates to the attribute being listened to.
    var that = this;
    
    $( document ).ready(function() {
        var that2=that;
        uibuilder.onChange('msg', function(newVal){
            console.info('Adapter -> property msg changed!', newVal)
            Adapter.onNewMessage(newVal);
        })
    })
    
    //$( document ).ready(this.initDocumentRead);
}

Adapter.prototype.initDocumentReady = function() {
    console.log("Adapter -> document ready");
    var onMsgFct = function(newVal) {
        console.info('Adapter -> property msg changed!', newVal);
        this.onNewMessage(newVal);
    }.bind(this);
    uibuilder.onChange('msg', onMsgFct);
}

var adapter = new Adapter();

Adapter.onNewMessage = function(msg) {
    if (!msg.topic || !msg.payload) {
        return;
    }
    var topic = msg.topic;
    var payload = JSON.parse(msg.payload);
    if (topic==="msghomegear/GetHeatingWeekProfile") {
        var conf = payload.data;
        var room = payload.room;
        var jsonData = Adapter.convertConfToJson(conf);
        this.onGetHeatingWeekProfile(room, jsonData);
    }
}

Adapter.onGetHeatingWeekProfile = function(roomId, profile) {
    console.log("Profil für Raum "+roomId+" empfangen");
    console.log(profile);
    var container = $("#weekProfile");
    container.data( { room: roomId, data: profile}).trigger('changeData');
}

Adapter.retrieveHeatingWeekProfile = function(room) {
    console.log("Retrieve heating week profile of "+room);
    if (!room) {
        alert("No room choosen");
        return;
    }
    let topic = 'cmdhomegear/RetrieveHeatingWeekProfile';
    let payload = { 
        room : room,
        message : "Retrieve heating week profile of kitchen"
    };
    console.log("send <" + topic + ">");
//    var roomId="kitchen";
//    var profile = "data";
//    Adapter.onGetHeatingWeekProfile(roomId, profile);    
    uibuilder.send( { 'topic': topic, 'payload': payload } );
}

Adapter.setHeatingWeekProfile = function(room) {
    console.log("Set heating week profile of "+room);
    if (!room) {
        alert("No room choosen");
        return;
    }
    let topic = 'cmdhomegear/SetHeatingWeekProfile';
    let payload = { 
        room : room,
        message : "Set heating week profile of kitchen"
    };
    var data = tblGetProfileData();
    var conf = Adapter.convertDataToConf(data.data);
    payload.data = conf;
    console.log("send <" + topic + ">");
//    var roomId="kitchen";
//    var profile = "data";
//    Adapter.onGetHeatingWeekProfile(roomId, profile);    
    uibuilder.send( { 'topic': topic, 'payload': payload } );
   
}

Adapter.getWeekProfile = function(room) {
    console.log("Adapter.getWeekProfile " + room);
} 

Adapter.test = function(){
    console.log("Adapter.test called");
}

const days = [ "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY" ];

Adapter.convertConfToCsv = function(data) {
    if (!data) {
        return null;
    }

    var myobj = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var day = getConfDay(key);
            var type = getConfType(key);
            var nr = getConfNumber(key);
            var value = data[key];
//            console.log(key + " -> " + day + ";" + type + ";" + nr);
            if (day && type && nr>0) {
                setConfValue(myobj, day, nr-1, type, value);
            }
        }
    }
    var csvData = "";
    var delimiter = ";";
    for (var dayEntry in myobj) {
        for (var entry in myobj[dayEntry]) {
            var item = myobj[dayEntry][entry]
            var end = item.endtime;
            var temp = item.temperature;
            var line = dayEntry + delimiter + entry + delimiter + end + delimiter + temp + "\r\n"; 
            csvData += line;
        }
    }
    return csvData;
}

Adapter.convertConfToJson = function(data) {
    if (!data) {
        return null;
    }

    var result = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var day = Adapter.getConfDay(key);
            var type = Adapter.getConfType(key);
            var nr = Adapter.getConfNumber(key);
            var value = data[key];
//            console.log(key + " -> " + day + ";" + type + ";" + nr);
            if (day && type && nr>0) {
                Adapter.setConfValue(result, day, nr-1, type, value);
            }
        }
    }
    return result;
}

Adapter.convertDataToConf = function(data) {
    var result = {};
    days.forEach(function(day) {
        var items = data[day];
        for (var index=0; index < items.length; index++) {
            var time = items[index].endtime;
            var h = Math.floor(time/100);
            var min = time % 60;
            var prop = "ENDTIME_"+day+"_"+(index+1);
            result[prop] = h*60+min;
            prop = "TEMPERATURE_"+day+"_"+(index+1);
            result[prop] = parseFloat(items[index].temperature); //Number.parseFloat(items[index].temperature).toFixed(1);
        };
    }); 
    var tst = JSON.stringify(result);
    //result = tst; //"{ " + result.toString() + " }";
    return result;
}

Adapter.setConfValue = function(confArray, day, index, type, value) {
    if (!confArray[day]) {
        confArray[day] = [];
    }
    if (!confArray[day][index]) {
        confArray[day][index] = {};
    }
    switch (type) {
        case "TEMPERATURE":
            confArray[day][index].temperature = value.toFixed(1);
            break;
        case "ENDTIME":
            confArray[day][index].endtime = Adapter.convertIntToTime(value);
            break;
    }
}

Adapter.convertIntToTime = function(val) {
    var quotient = Math.floor(val/60);
    var remainder = val % 60;
    var time = quotient * 100 + remainder;
    return time;
}

Adapter.getConfDay = function(key) {
   
    for (var d in days)
    {
        if (key.indexOf(days[d])>=0) {
            return days[d];
        }
    }
    return null;
}

Adapter.getConfType = function(key) {
    var types = [ "ENDTIME", "TEMPERATURE" ];
    for (var t in types)
    {
        if (key.indexOf(types[t])>=0) {
            return types[t];
        }
    }
    return null;
}

Adapter.getConfNumber = function(key) {
    var nr = null;
    var r = /\d+/;
    var res = r.exec(key);
    if (res) {
        nr = parseInt(res);
    }
    return nr;
}