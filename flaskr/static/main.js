function preloader() {
  preloader = document.getElementById("preloader");
}

$("#clean").attr("disabled", true);
function submit() {
  var a = document.getElementById("test_input").value;
  console.log(a);
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
          '<table class="table table-bordered table-striped table-hover table-wrapper-scroll-y">';
        var rows = e.target.result.split(/\r?\n|\r/);
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          table_data += "<tr>";
          for (var cell_count = 0; cell_count < cells.length; cell_count++) {
            if (i === 0) {
              table_data +=
                "<th>" +
                cells[cell_count] +
                "<span> </span> <input type='checkbox' name='column_name[]' value=" +
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
}
