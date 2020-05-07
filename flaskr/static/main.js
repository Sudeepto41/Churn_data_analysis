//var $j = jQuery.noConflict();

const url = "http://127.0.0.1:5000/data";

function submit() {
  var a = document.getElementById("test_input").value;
  console.log(a);
}

function get_data() {
  $.get(url, function (data) {
    document.getElementById("dyn_data").innerHTML = data;
    console.log(data + 3);
  });
}

function upload() {
  var fileUpload = document.getElementById("fileUpload");
  console.log(fileUpload);
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var table = document.createElement("table");
        var rows = e.target.result.split("\n");
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          if (cells.length > 1) {
            var row = table.insertRow(-1);
            for (var j = 0; j < cells.length; j++) {
              var cell = row.insertCell(-1);
              cell.innerHTML = cells[j];
            }
          }
        }
        var dvCSV = document.getElementById("dvCSV");
        dvCSV.innerHTML = "";
        dvCSV.appendChild(table);
      };
      reader.readAsText(fileUpload.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
}
