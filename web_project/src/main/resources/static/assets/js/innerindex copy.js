// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element

var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // panX: "translateX",
  // panY: "translateY",
  rotationX: -160,
  projection: am5map.geoEqualEarth()
}));


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow 
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  toggleKey: "active",
  interactive: true
  ,fill: am5.color("#D8DEF6")
  ,templateField: "polygonSettings"
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color("#B0B2B5")
});

polygonSeries.data.setAll([{
  id: "CA",
  polygonSettings: {
    fill: am5.color("#025EEC")
  }
}, {
  id: "US",
  polygonSettings: {
    fill: am5.color("#0963EE")
  }
}, {
  id: "VN",
  polygonSettings: {
    fill: am5.color("#146AEF")
  }
}, {
  id: "JP",
  polygonSettings: {
    fill: am5.color("#1D70EF")
  }
}, {
  id: "HK",
  polygonSettings: {
    fill: am5.color("#2676F0")
  }
}, {
  id: "TW",
  polygonSettings: {
    fill: am5.color("#2C7AF2")
  }
}, {
  id: "SG",
  polygonSettings: {
    fill: am5.color("#347FF3")
  }
}, {
  id: "IN",
  polygonSettings: {
    fill: am5.color("#3C84F5")
  }
}, {
  id: "AU",
  polygonSettings: {
    fill: am5.color("#4589F5")
  }
}, {
  id: "MX",
  polygonSettings: {
    fill: am5.color("#4E8FF7")
  }
}, {
  id: "DE",
  polygonSettings: {
    fill: am5.color("#5695F8")
  }
}, {
  id: "MY",
  polygonSettings: {
    fill: am5.color("#609BF8")
  }
}, {
  id: "ID",
  polygonSettings: {
    fill: am5.color("#68A0F8")
  }
}, {
  id: "PL",
  polygonSettings: {
    fill: am5.color("#70A4F6")
  }
}, {
  id: "PH",
  polygonSettings: {
    fill: am5.color("#7BAAF5")
  }
}, {
  id: "TR",
  polygonSettings: {
    fill: am5.color("#83AFF5")
  }
},
{
  id: "CA",
  polygonSettings: {
    fill: am5.color("#8CB5F6")
  }
}, {
  id: "TH",
  polygonSettings: {
    fill: am5.color("#94BAF6")
  }
}, {
  id: "NL",
  polygonSettings: {
    fill: am5.color("#9FBFF2")
  }
}, {
  id: "HU",
  polygonSettings: {
    fill: am5.color("#A2C1F2")
  }
}]);

// polygonSeries.mapPolygons.template.states.create("hover", {
//   fill: root.interfaceColors.get("primaryButtonHover")
// });

// polygonSeries.mapPolygons.template.states.create("active", {
//   fill: root.interfaceColors.get("primaryButtonHover")
// });

// var previousPolygon;

// polygonSeries.mapPolygons.template.on("active", function (active, target) {
//   if (previousPolygon && previousPolygon != target) {
//     previousPolygon.set("active", false);
//   }
//   if (target.get("active")) {
//     polygonSeries.zoomToDataItem(target.dataItem );
//   }
//   else {
//     chart.goHome();
//   }
//   previousPolygon = target;
// });


// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true);


// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function () {
  chart.goHome();
})


// Make stuff animate on load
chart.appear(1000, 100);



// ======= createDiv =======
var id = 0;
var div = document.getElementById("chartdiv");

function createDiv() {
  id++;
  var container = document.createElement("div");
  container.id = "chart" + id;
  container.style.width = "350px";
  container.style.height = "350px";
  // container.style.float = "left";
  container.style.margin = "10px";
  container.style.border = "1px solid #eee";
  return container;
}

// ================================== bulletChart ========================================
// =======================================================================================

function createBullet() {
  var newspace = createDiv();
  newspace.style.display = "inline-block";
  div.before(newspace);
  var root = am5.Root.new(newspace);
  
  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX"
}));

chart.get("colors").set("step", 3);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);
// chart.options.responsive


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.3,
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value1",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueX}: {valueY}\n{previousDate}: {value2}"
  })
}));

series.strokes.template.setAll({
  strokeWidth: 2
});

series.get("tooltip").get("background").set("fillOpacity", 0.5);

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series 2",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value2",
  valueXField: "date"
}));
series2.strokes.template.setAll({
  strokeDasharray: [2, 2],
  strokeWidth: 2
});

// Create animating bullet by adding two circles in a bullet container and
// animating radius and opacity of one of them.
series.bullets.push(function() {
  var container = am5.Container.new(root, {
    templateField: "bulletSettings"
  });
  var circle0 = container.children.push(am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000)
  }));
  var circle1 = container.children.push(am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000)
  }));

  circle1.animate({
    key: "radius",
    to: 20,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity
  });
  circle1.animate({
    key: "opacity",
    to: 0,
    from: 1,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity
  });

  return am5.Bullet.new(root, {
    sprite: container
  })
})

// Create animating bullet by adding two circles in a bullet container and
// animating radius and opacity of one of them.
series2.bullets.push(function() {
  var container = am5.Container.new(root, {
    templateField: "bulletSettings"
  });
  var circle0 = container.children.push(am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000)
  }));
  var circle1 = container.children.push(am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000)
  }));

  circle1.animate({
    key: "radius",
    to: 20,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity
  });
  circle1.animate({
    key: "opacity",
    to: 0,
    from: 1,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic),
    loops: Infinity
  });

  return am5.Bullet.new(root, {
    sprite: container
  })
})


// Set date fields
// https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: ["valueX"]
});


// Set data
var data = [{
  date: new Date(2019, 5, 12).getTime(),
  value1: 50,
  value2: 48,
  previousDate: new Date(2019, 5, 5),
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 13).getTime(),
  value1: 53,
  value2: 51,
  previousDate: "2019-05-06",
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 14).getTime(),
  value1: 56,
  value2: 58,
  previousDate: "2019-05-07",
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 15).getTime(),
  value1: 52,
  value2: 53,
  previousDate: "2019-05-08",
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 16).getTime(),
  value1: 48,
  value2: 44,
  previousDate: "2019-05-09",
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 17).getTime(),
  value1: 47,
  value2: 42,
  previousDate: "2019-05-10",
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 18).getTime(),
  value1: 59,
  value2: 55,
  previousDate: "2019-05-11",
  bulletSettings: {
    visible: true
  }
}]

series.data.setAll(data);
series2.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);
}

// ====================================== pieChart =======================================
// =======================================================================================
function createPie() {
  var newspace = createDiv();
  newspace.style.display = "inline-block";
  newspace.style.float = "right";
  // newspace.style.width = "500px";
  div.after(newspace);
  var root = am5.Root.new(newspace
    // , {tooltipContainerBounds: {
    //   top: 50,
    //   right: 500,
    //   bottom: 50,
    //   left: 500
    // }}
  );

  // root.resize();

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Parse chart config
// https://www.amcharts.com/docs/v5/concepts/serializing/

am5plugins_json.JsonParser.new(root).parse({
  refs: [{
    data: [{
      country: "France",
      sales: 100000
    }, {
      country: "Spain",
      sales: 160000
    }, {
      country: "United Kingdom",
      sales: 80000
    }],
  }, {
    series: {
      type: "PieSeries",
      settings: {
        name: "Series",
        valueField: "sales",
        categoryField: "country"
      },
      properties: {
        data: "#data"
      }
    },
  }],
  type: "PieChart",
  options: {
    responsive: false},
  settings: {
    layout: "vertical",
  },
  properties: {
    series: [
      "#series"
    ]
  },
  children: [{
    type: "Legend",
    settings: {
      centerX: {
        type: "Percent",
        value: 50
      },
      x: {
        type: "Percent",
        value: 50
      },
      layout: "horizontal"
    },
    properties: {
      data: "#series.dataItems"
    }
  }]
}, {
  parent: root.container
}).then(function (chart) {
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/#Forcing_appearance_animation
  chart.series.getIndex(0).appear(1000);
  chart.appear(1000, 100);
});
}

// =============================== xyclusterChart =====================================
// =======================================================================================
$(function(){
  init(2019);
  $("#replyBtn").on('click', function() {
    let selectedyear = $("#dropdown").val();
    console.log(selectedyear);
    init(selectedyear);
  });
})                                          

var respData = [];  // 전역 변수로 resp 데이터를 저장할 배열 선언
var data = [];      // 각 연도의 데이터가 담길 것.

//가장 처음으로 실행되는 함수(전체 데이터 받아옴)
function init(selectedyear) {
  $.ajax({
    method: 'POST'
    , url : '/'
    , async : false
    , success : function(resp){
      respData = resp; // resp 데이터를 전역 변수에 저장
      createxycluster(resp, selectedyear);
    },
    error: function(err) {
      console.error('Error fetching data:', err);
    }
  });
}

// 막대차트 지우는 함수 (나중에 삭제할 것)
function maybeDisposeRoot(divId) {
  am5.array.each(am5.registry.rootElements, function(root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

// 막대차트 그리는 함수
function createxycluster(resp, selectedyear) {
  var space = document.getElementById("chart6");
  console.log(space);
  var root;
  //만약 그래프 영역이 비어있다면 새로 생성
  if(space == null){
    var newspace = createDiv();
    newspace.style.width = "500px";
    newspace.style.display = "inline-block";
    newspace.style.float = "right";
    div.before(newspace);
    console.log(newspace);
    root = am5.Root.new(newspace);
  }
  //그렇지 않다면 기존 그래프 지우는 함수 사용. 새로 만듦
  else{
    maybeDisposeRoot("chart6");
    root = am5.Root.new(space);
    console.log(newspace);
  }

  // $("#dropdown").remove();
  // $("#replyBtn").remove();

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // 드롭박스 만들어보자
  // 새로운 select 요소 생성
  var helpers = {
    buildDropdown: function(result, dropdown, emptyMessage) {
      // Remove current options
      dropdown.html('');

      // Add the empty option with the empty message
      dropdown.append('<option value="">' + emptyMessage + '</option>');

      // Check result isnt empty
      if(result != '')
      {
          // Loop through each of the results and append the option to the dropdown
          $.each(result, function(k, v) {
              dropdown.append('<option value="' + v.id + '">' + v.name + '</option>');
          });
      }
    }
  }
  var dropdown = document.createElement('select');
  dropdown.id = 'dropdown';  // 선택 사항: id 설정

  // chart6 div 가져오기
  var chart6Div = document.getElementById('chart6');

  // dropdown 요소를 chart6 div 안에 추가
  chart6Div.appendChild(dropdown);

  var dropdata = '[{"id":2020,"name":"2020"},{"id":2021,"name":"2021"},{"id":2022,"name":"2022"},{"id":2023,"name":"2023"}]';
  helpers.buildDropdown(
    jQuery.parseJSON(dropdata),
    $('#dropdown'),
    '2019'
  );

  // 조회버튼 만들기
  var input = document.createElement('input');
  input.id = 'replyBtn';
  input.type = 'button';
  input.value = '조회';
  chart6Div.appendChild(input);

  // 기본 뿌려주는거
data = [];
let count = 0;
$.each(resp, function(index, item) {
  if(item.dateYear == selectedyear) {
    data.push({
      "hscode": item.hs4digit,
      "product" : item.productName,
      "price": item.price
    });
    count ++;
  }
  if (count >= 5) {
    return false;
  }
});

// 그래프 업데이트
updateChart(data);
}

function updateChart(data) {
  var chart = am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  });

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "hscode",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      minGridDistance: 30,
      minorGridEnabled: true
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));

  xAxis.data.setAll(data);

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));

  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "price",
    categoryXField: "hscode",
  }));

  series.data.setAll(data);

  chart.appear(1000, 100);
}

  //드롭다운 value값 가져와서 그 값에 따라 데이터 넣어주기
    // let selectedyear = $("#dropdown").val();
    // let count1 = 0;

    // $.each(respData, function(index, item) {
    //     if(item.dateYear == selectedyear) {
    //       data.push({
    //         "hscode": item.hs4digit,
    //         "product" : item.productName,
    //         "price": item.price
    //       })
    //       count1 ++;
    //     }//end if
    //   if (count1 >= 5) {  // data 길이가 5개 이상이면 반복문 종료
    //     return false;
    //   }
    // });//end each
    // console.log(data);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "hscode",
  renderer: am5xy.AxisRendererX.new(root, {
    cellStartLocation: 0.1,
    cellEndLocation: 0.9,
    minGridDistance: 30,
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    //name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "price",
    categoryXField: "hscode",
  }));

  series.columns.template.setAll({
    tooltipText: "{hscode} : {product}\n ${valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.data.setAll(data);
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 0,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: 0,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
//data = [];
console.log(data);
}

// =============================== barChart ==============================================
// =======================================================================================
function createBar() {
  var newspace = createDiv();
  newspace.style.display = "inline-block";
  newspace.style.float = "right";  
  div.after(newspace);
  var root = am5.Root.new(newspace);

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "none",
  wheelY: "none",
  responsive: false
}));

// We don't want zoom-out button to appear while animating, so we hide it
chart.zoomOutButton.set("forceHidden", true);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 30
});
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: 0,
  paddingRight: 15
});
xRenderer.grid.template.set("visible", false);

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,
  categoryField: "country",
  renderer: xRenderer
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "country"
}));

// Rounded corners for columns
series.columns.template.setAll({
  cornerRadiusTL: 5,
  cornerRadiusTR: 5
});

// Make each column to be of a different color
series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target ));
});
                                                                                                                                                                      
series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target ));
});

// Add Label bullet
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Label.new(root, {
      text: "{valueYWorking.formatNumber('#.')}",
      fill: root.interfaceColors.get("alternativeText"),
      centerY: 0,
      centerX: am5.p50,
      populateText: true
    })
  });
});                                   


// Set data
var data = [{
  "country": "USA",
  "value": 2025
}, {
  "country": "China",
  "value": 1882
}, {
  "country": "Japan",
  "value": 1809
}, {
  "country": "Germany",
  "value": 1322
}, {
  "country": "UK",
  "value": 1122
}, {
  "country": "France",
  "value": 1114
}, {
  "country": "India",
  "value": 984
}, {
  "country": "Spain",
  "value": 711
}, {
  "country": "Netherlands",
  "value": 665
}, {
  "country": "Russia",
  "value": 580
}, {
  "country": "South Korea",
  "value": 443
}, {
  "country": "Canada",
  "value": 441
}];

xAxis.data.setAll(data);
series.data.setAll(data);

// update data with random values each 1.5 sec
// setInterval(function () {
//   updateData();
// }, 1500)

function updateData() {
  am5.array.each(series.dataItems, function (dataItem) {
    var value = dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
    if (value < 0) {
      value = 10;
    }
    // both valueY and workingValueY should be changed, we only animate workingValueY
    dataItem.set("valueY", value);
    dataItem.animate({
      key: "valueYWorking",
      to: value,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic)
    });
  })

  sortCategoryAxis();
}


// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryX") == category) {
      return dataItem;
    }
  }
}


// Axis sorting
function sortCategoryAxis() {

  // Sort by value
  series.dataItems.sort(function (x, y) {
    return y.get("valueY") - x.get("valueY"); // descending
    //return y.get("valueY") - x.get("valueY"); // ascending
  })

  // Go through each axis item
  am5.array.each(xAxis.dataItems, function (dataItem) {
    // get corresponding series item
    var seriesDataItem = getSeriesItem(dataItem.get("category"));

    if (seriesDataItem) {
      // get index of series data item
      var index = series.dataItems.indexOf(seriesDataItem);
      // calculate delta position
      var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
      // set index to be the same as series data item index
      dataItem.set("index", index);
      // set deltaPosition instanlty
      dataItem.set("deltaPosition", -deltaPosition);
      // animate delta position to 0
      dataItem.animate({
        key: "deltaPosition",
        to: 0,
        duration: 1000,
        easing: am5.ease.out(am5.ease.cubic)
      })
    }
  });

  // Sort axis items by index.
  // This changes the order instantly, but as deltaPosition is set,
  // they keep in the same places and then animate to true positions.
  xAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
  });
}


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
}

// =============================== StringChart ==============================================
// ==========================================================================================\
function createString() {
  var newspace = createDiv();
  newspace.style.display = "inline-block";
  // newspace.style.float = "right";
  div.after(newspace);
  var root = am5.Root.new(newspace);

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX"
}));

chart.get("colors").set("step", 3);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.3,
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value1",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueX}: {valueY}\n{previousDate}: {value2}"
  })
}));

series.strokes.template.setAll({
  strokeWidth: 2
});

series.get("tooltip").get("background").set("fillOpacity", 0.5);

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series 2",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value2",
  valueXField: "date"
}));
series2.strokes.template.setAll({
  strokeDasharray: [2, 2],
  strokeWidth: 2
});

// Set date fields
// https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: ["valueX"]
});


// Set data
var data = [{
  date: new Date(2019, 5, 12).getTime(),
  value1: 50,
  value2: 48,
  previousDate: new Date(2019, 5, 5)
}, {
  date: new Date(2019, 5, 13).getTime(),
  value1: 53,
  value2: 51,
  previousDate: "2019-05-06"
}, {
  date: new Date(2019, 5, 14).getTime(),
  value1: 56,
  value2: 58,
  previousDate: "2019-05-07"
}, {
  date: new Date(2019, 5, 15).getTime(),
  value1: 52,
  value2: 53,
  previousDate: "2019-05-08"
}, {
  date: new Date(2019, 5, 16).getTime(),
  value1: 48,
  value2: 44,
  previousDate: "2019-05-09"
}, {
  date: new Date(2019, 5, 17).getTime(),
  value1: 47,
  value2: 42,
  previousDate: "2019-05-10"
}, {
  date: new Date(2019, 5, 18).getTime(),
  value1: 59,
  value2: 55,
  previousDate: "2019-05-11"
}]

series.data.setAll(data);
series2.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);
};

// ====================================== 미정 그래프 =======================================
// =========================================================================================
function createAknown() {
  var newspace = createDiv();
  newspace.style.display = "inline-block";
  // newspace.style.float = "right";
  div.after(newspace);
  var root = am5.Root.new(newspace);



};


// === 함수 실행 ===
createBullet();
//createxycluster();
createBar();
createAknown();
createPie();
createString();



