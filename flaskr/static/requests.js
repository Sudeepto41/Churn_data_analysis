function upload() {
  var formData = new FormData();
  formData.append("file", $("input[type=file]")[0].files[0]);
  formData.append(
    "column_name[]",
    $('input[name="column_name[]"]:checked').val()
  );

  $.ajax({
    url: "http://127.0.0.1:5000/upload",
    data: formData,
    type: "POST",
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS
    // ... Other options like success and etc
  });
}
