$(document).ready(function() {
  $("input[type='submit']").click(function(e){
    e.preventDefault();
    var form_id = $(this).parent().attr("id");
    var index = form_id.substring(4);
    console.log(index);
    var data = {
      index: index,
      inp: $(this).siblings("input").val()
    };
    $.getJSON(
      $SCRIPT_ROOT + '/problem', 
      data, 
      function(r) {
        var result_descrp = "#result" + index.toString();
        $(result_descrp).empty().append(r.result);
        console.log(r.result);
      }
    );
  });
});
