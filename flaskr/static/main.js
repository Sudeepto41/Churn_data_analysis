//var $j = jQuery.noConflict();

const url = "http://127.0.0.1:5000/data";

$("#clean").attr("disabled", true);
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
        var table_data =
          '<table class="table table-bordered table-striped table-hover">';
        var rows = e.target.result.split(/\r?\n|\r/);
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          table_data += "<tr>";
          for (var cell_count = 0; cell_count < cells.length; cell_count++) {
            if (i === 0) {
              table_data += "<th>" + cells[cell_count] + "</th>";
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
}
