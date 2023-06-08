
function displayTable(output) {


  var str = "<table>";
 str += "<tr>";
  str += "<th>" + "n°de l'appareil" + "</th>";
  str += "<th>" + "Date de dernier passage" + "</th>";
  str += "<th>" + "Nombre total de randonneurs" + "</th>";
  str += "</tr>";

  str += "<tr>";

  str += "</tr>";
  //Traitement des informations

  for (var i = 0; i < output.val.length; i++) {
    str += "<tr>";
    for (var j = 0; j < 3; j++) {


      str += "<td>" + output.val[i][j] + "</td>";
    }
    

  }
  str += "</tr>";


  str += "</table>";


  let result = document.getElementById("result");
  result.innerHTML = str;

}

//-----------------------

function calcLimit(input) {
  var url = 'https://api.sigfox.com/v2/devices/C3068E/messages?limit=1';
  console.log(url);

  getData(url);
  //recu des infos pour les dèrnières informations 


}

//-----------------------
function calcOffset(input) {

  var url = 'https://api.sigfox.com/v2/devices/C3068E/messages?offset=1&limit=2';

  console.log(url)

  getData(url);


}


//-----------------------
function getData(url) {
  fetch(url, {
    method: 'GET',
    headers: { 'Authorization': 'Basic ' + btoa(user + ":" + pass) }
  })
    .then(response => response.json())
    .then(function(json) {

      let total = 0;

      var output_array = [];


      for (var i = 0; i < json['data'].length; i++) {
        let _id = json['data'][i]['device']['id'];
        let _time = json['data'][i]['time'];
        let d = new Date(_time);
        let local = d.toLocaleString('en-GB', { hour12: false });
        let sep = local.split(",");
        let heure = sep[1];
        let date = sep[0];
        let _data = json['data'][i]['data'];
        //for (var j=0; j<3; j++) {
        output_array[i] = [];
        output_array[i].push(_id, heure + " " + date, _data);
        //}
        total += parseInt(_data)
      }
      var ret = {}
      ret['val'] = output_array;
      ret['total'] = total;
      console.log(ret);
      displayTable(ret);
    }
    );
}