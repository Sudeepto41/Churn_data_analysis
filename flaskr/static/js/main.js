fu = document.getElementById("fileUpload");
var dis = document.getElementById('naam');
var time;
var today = new Date();
var file;

fu.onchange = function () {
  print_table_client();
};

function print_table_client() {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();

      file = $('#fileUpload')[0].files[0].name; ///fetching filename in a variable 1
      console.log(file); ///fetching filename in a variable 2
      dis.innerHTML = file;

      //fetching time
      time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); //fetching time of upload
      console.log(time);

      reader.onload = function (e) {
        var table_data =
          '<table class="table table-wrapper-scroll-y">';
        var rows = e.target.result.split(/\r?\n|\r/);
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(";").join(",").split(",");
          table_data += "<tr>";
          for (var cell_count = 0; cell_count < cells.length; cell_count++) {
            if (i === 0) {
              table_data +=
                "<th>" +
                cells[cell_count] +
                "<span> </span> <input type='checkbox' name='column_name' value=" +
                cells[cell_count] +
                "></th>";
            } else {
              table_data += "<td>" + cells[cell_count] + "</td>";
            }
          }
          table_data += "</tr>";
        }
        table_data += "</table>";
        $("#table").html(table_data);
      };
      reader.readAsText(fileUpload.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }

  var btn = document.getElementById("clean");
  btn.setAttribute("class", "btn btn-success btn-md active");
  btn.disabled = false;
}; //prints data table uploaded by server

function print_table_server(file) {
  var table_data =
    '<table class="table table-hover table-wrapper-scroll-y">';
  var rows = file.split(/\r?\n|\r/);
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].split(";").join(",").split(",");
    table_data += "<tr>";
    for (var cell_count = 0; cell_count < cells.length; cell_count++) {
      if (i === 0) {
        if (cell_count === 0) {
          table_data += "<td>S No.</td>";
        } else {
          table_data +=
            "<th>" +
            cells[cell_count] +
            "<span> </span> <input type='checkbox' name='column_name' value=" +
            cells[cell_count] +
            "></th>";
        }
      } else {
        table_data += "<td>" + cells[cell_count] + "</td>";
      }
    }
    table_data += "</tr>";
  }
  table_data += "</table>";
  $("#table").html(table_data);
  var btn = document.getElementById("clean");
  btn.disabled = true;

  // var li = document.createElement('li');
  // li.innerHTML="name:"+ file + "time:" + time;
  // document.getElementById('listz').appendChild(li);

}; //prints data table uploaded by server

//adding history
function printHistory(history) {  //filename and time recieved from server
  //adding names to history
  console.log("yeeet")
  for (var i = 0; i < history[0].length; i++) {
    var li = document.createElement('li');
    li.innerHTML = history[0][i] + history[1][i];
    document.getElementById('listz').appendChild(li);
  }
}






