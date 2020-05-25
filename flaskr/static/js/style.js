$(document).ready(function () {
  $("#table_toggle").on("click", function () {
    console.log("1");
    $("#table_toggle").toggleClass("active");
  });

  $("#chart_toggle").on("click", function () {
    console.log("1");
    $("#chart_toggle").toggleClass("active");
  });

  $("#predict_toggle").on("click", function () {
    console.log("1");
    $("#predict_toggle").toggleClass("active");
  });
});
