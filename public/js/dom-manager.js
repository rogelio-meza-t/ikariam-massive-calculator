function add_stacked_pills(source_cities){
  $('#source-city-results').empty();
  $.each(source_cities, function(i, city){
    var node = '<li class="source-city-stack" data-index="'+city.city_id+'"><a data-taget="'+city.city_id+'" data-toggle="tab">'+city.name+'</a></li>';
    $('#source-city-results').append(node);
  });

  $('#source-city-results li:first-child').addClass('active');
}

function add_result_distances(cities){
  $('#target-city-results table>tbody').empty();
  $.each(cities, function(i, city){
    var node = '<tr><td class="col-md-3">'+(city.distance).toFixed(2)+'</td><td>'+to_time(city.speed)+'</td><td>'+city.name+'</td></tr>';
    $('#target-city-results table>tbody').append(node);
  });
}
