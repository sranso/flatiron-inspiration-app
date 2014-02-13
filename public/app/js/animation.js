$(document).ready(function() {
  $(".new-quote-link").on("click", function(event) {
    // event.preventDefault();
    console.log("this??");
    // $(this)
    $(".new-quote-form").toggle("slow");
  });
});
