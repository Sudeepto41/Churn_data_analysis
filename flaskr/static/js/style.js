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