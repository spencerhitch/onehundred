$(document).ready(function() {
  $("input[type='submit']").click(function(e){
    e.preventDefault();
    var form_id = $(this).parent().attr("id");
    var index = form_id.substring(4);
    var siblings = $(this).siblings("input");
    var inputs = [];
    _.each(siblings, function(elem){
      inputs.push($(elem).val());
    });
    console.log("SIBLINGS: ", inputs);
    $.getJSON(
      $SCRIPT_ROOT + '/problem', 
      {
        index: index,
        inp: inputs.join()
      }, 
      function(r) {
        var result_descrp = "#result" + index.toString();
        $(result_descrp).empty().append(r.result);
        console.log(r.result);
      }
    );
  });
});
