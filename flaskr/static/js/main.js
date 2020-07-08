fu = document.getElementById("fileUpload");
var dis = document.getElementById('naam');


fu.onchange = function () {
  print_table_client();
};

function print_table_client() {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();

      var file = $('#fileUpload')[0].files[0].name; ///fetching filename in a variable 1
      console.log(file); ///fetching filename in a variable 2
      dis.innerHTML=file;
    
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
}; //prints data table uploaded by server

//adding history
function printHistory(filename, time) {  //filename and time recieved from server
  //adding names to history
  for (var i = 0; i < filename.length; i++) {
    var li = document.createElement('li');
    
    li.innerHTML = "name:"+ filename[i] + ", time:"+ time[i];
    dis.innerHTML=filename[i];
    document.getElementById('listz').appendChild(li);

  } 
}
// HOVERBAR TOGGLE
var mini = true;

        function toggleSidebar() {
            if (mini) {
                console.log("opening sidebar");
                document.getElementById("mySidebar").style.width = "250px";
                this.mini = false;
            } else {
                console.log("closing sidebar");
                document.getElementById("mySidebar").style.width = "85px";
                this.mini = true;
            }
        }

