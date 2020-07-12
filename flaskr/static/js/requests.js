//upload file function
function upload() {
  $("#getfile").on('submit', function (e) {
    e.preventDefault();
  });

  var formData = new FormData();
  var column_name = "";
  $("input:checkbox[name=column_name]:checked").each(function () {
    column_name = $(this).val();
    formData.append("column_name[]", column_name);
  }); // getting the values of selected columns and appending to form data
  formData.append("file", $("input[type=file]")[0].files[0]); //appending file to formData

  $.ajax({
    url: "http://127.0.0.1:5000/upload",
    data: formData,
    type: "POST",
    contentType: false,
    processData: false,
    success: function (usedata) {
      print_table_server(usedata) // print the recieved datafile
      getDescription() //fetch description of dataset
      gethistory() //fetch history of uploaded files from server, after current request has been processed
    }
  }); //Sending the request
} //upload function end

//get history function
function gethistory() {
  $.ajax({
    url: "http://127.0.0.1:5000/history",
    type: "GET",
    contentType: false,
    processData: false,
    success: function (history) {
      console.log(history[1])
      printHistory(history)
    }
  });
}

//get description function
function getDescription() {
  $.ajax({
    url: "http://127.0.0.1:5000/desc",
    type: "GET",
    contentType: false,
    processData: false,
    success: function (desc) {
      console.log(desc['gender'])
    }
  });
}
