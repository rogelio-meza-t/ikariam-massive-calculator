$(function(){

  var target_cities, source_cities, poseidon_level;


  $('#process-button').on('click', function(e){
    var bulk_source_cities = sanitize_cities( $('#source-inputs').val() );
    source_cities = parse_coordinates(bulk_source_cities);

    var bulk_target_cities = sanitize_cities( $('#target-inputs').val() );
    target_cities = parse_coordinates(bulk_target_cities);

    poseidon_level = parseInt($('#poseidon-level').val(),  10);

    var results = compute_distances(source_cities[0], target_cities, poseidon_level);

    add_stacked_pills(source_cities);
    add_result_distances(results);

  });

  $(document).on('click', '.source-city-stack', function(e){
    var index = parseInt($(this).data('index'), 10);
    var results = compute_distances(source_cities[index], target_cities);
    add_result_distances(results);
  });

});
