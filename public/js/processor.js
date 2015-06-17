$(function(){

  var target_cities, source_cities;

  function compare(a, b) {
    if (a.distance < b.distance){
      return -1;
    }
    else if (a.distance > b.distance){
      return 1;
    }
    else{
      return 0;
    }
  }

  function sanitize_cities(text){
    return $.map(text.split('\n'), function(n, i){
      var trimmed = $.trim(n);
      if (!!trimmed){
        return trimmed;
      }
    });
  }

  function extract_coordinate(city){
    var first = city.indexOf('[');
    var last = city.indexOf(']', first+1);

    var coords_text = city.substr(first+1, last-first-1);

    return coords_text.split(':').map(function(c) { return parseInt(c) } );
  }

  function parse_coordinates(cities){
    var cities_with_coords = [];

    $.each(cities, function(i, city){
      var coordinate = extract_coordinate(city);
      cities_with_coords.push({
        "city_id": i,
        "name": city,
        "coords" : {
          "x": coordinate[0],
          "y": coordinate[1]
        }
      });
    });

    return cities_with_coords;
  }

  function compute_distances(source, target){
    var distances = []
    $.each(target, function(i, t){
      var city = t;
      city.distance = Math.sqrt( Math.pow((t.coords.x - source.coords.x), 2) + Math.pow((t.coords.y - source.coords.y), 2) )
      distances.push(city)
    });

    return distances.sort(compare);
  }

  function add_stacked_pills(source_cities){
    $.each(source_cities, function(i, city){
      var node = '<li class="source-city-stack" data-index="'+city.city_id+'"><a data-taget="'+city.city_id+'" data-toggle="tab">'+city.name+'</a></li>';
      $('#source-city-results').append(node);
    });

    $('#source-city-results li:first-child').addClass('active');
  }

  function add_result_distances(cities){
    $('#target-city-results table').empty();
    $.each(cities, function(i, city){
      var node = '<tr><td class="col-md-3">'+(city.distance).toFixed(2)+'</td><td>'+city.name+'</td></tr>';
      $('#target-city-results table').append(node);
    });
  }

  $('#process-button').on('click', function(e){
    var bulk_source_cities = sanitize_cities( $('#source-inputs').val() );
    source_cities = parse_coordinates(bulk_source_cities);

    var bulk_target_cities = sanitize_cities( $('#target-inputs').val() );
    target_cities = parse_coordinates(bulk_target_cities);

    var results = compute_distances(source_cities[0], target_cities);

    add_stacked_pills(source_cities);
    add_result_distances(results);

  });

  $(document).on('click', '.source-city-stack', function(e){
    var index = parseInt($(this).data('index'), 10);
    var results = compute_distances(source_cities[index], target_cities);
    add_result_distances(results);
  });

});
