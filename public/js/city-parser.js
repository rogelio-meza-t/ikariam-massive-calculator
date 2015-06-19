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
function zerofill(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function to_time(time){
    var sec_num = time * 60;
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var seconds_string = Math.floor(seconds) + "";
    var time    = hours+':'+minutes+':'+ zerofill(Math.floor(seconds), 2);
    return time;
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

function extract_name(city){
  var first = city.indexOf('[');
  var last = city.indexOf(']', first+1);
  return city.substring(0, first) + city.substring(last+1);
}

function parse_coordinates(cities){
  var cities_with_coords = [];

  $.each(cities, function(i, city){
    var coordinate = extract_coordinate(city);
    var name = extract_name(city);
    cities_with_coords.push({
      "city_id": i,
      "name": name,
      "coords" : {
        "x": coordinate[0],
        "y": coordinate[1]
      }
    });
  });

  return cities_with_coords;
}

function compute_speed(distance, level){
  var p;
  switch(level){
    case 1: p = 10; break;
    case 2: p = 30; break;
    case 3: p = 50; break;
    case 4: p = 70; break;
    case 5: p = 100; break;
    default: p = 0;break;
  }
  return ( (2000 * distance) / (100 + p) );
}

function compute_distances(source, target, level){
  var distances = []
  $.each(target, function(i, t){
    var city = t;
    city.distance = Math.sqrt( Math.pow((t.coords.x - source.coords.x), 2) + Math.pow((t.coords.y - source.coords.y), 2) );
    city.speed = compute_speed(city.distance, level);
    distances.push(city)
  });

  return distances.sort(compare);
}
