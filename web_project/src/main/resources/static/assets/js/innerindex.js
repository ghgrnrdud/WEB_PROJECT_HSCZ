function init(id, div) {

  // const id = 0;
  // const div = document.getElementById("chartdiv");
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
  // panY: "translateY",Fgtuy67=\  rotationX: -160,
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


// polygonSeries.mapPolygons.template.events.on("click", function(ev) {
//   console.log("Clicked on", ev.target.dataItem.get("id"));
// });

polygonSeries.mapPolygons.template.events.on("click", function(ev, id, div, type) {
      var url = ev.target.dataItem.dataContext.url;
      var country = ev.target.dataItem.get("id");
      
      if(url) {
      createBar(id, div, country, 2019, type);
      createStackCluster(id, div, country);
      createPie(id, div, country, 2019);
      createString(id, div, country);}

      // HTML 요소에 국가 이름 설정
      document.getElementById("countryName").innerHTML = country;
      });


polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color("#B0B2B5")
});

polygonSeries.data.setAll([{
  id: "CA",
  id: "CN",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#025EEC")
  }
}, {
  id: "US",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#0963EE")
  }
}, {
  id: "VN",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#146AEF")
  }
}, {
  id: "JP",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#1D70EF")
  }
}, {
  id: "HK",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#2676F0")
  }
}, {
  id: "TW",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#2C7AF2")
  }
}, {
  id: "SG",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#347FF3")
  }
}, {
  id: "IN",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#3C84F5")
  }
}, {
  id: "AU",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#4589F5")
  }
}, {
  id: "MX",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#4E8FF7")
  }
}, {
  id: "DE",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#4E8FF7")
  }
}, {
  id: "MY",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#609BF8")
  }
}, {
  id: "ID",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#68A0F8")
  }
}, {
  id: "PL",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#70A4F6")
  }
}, {
  id: "PH",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#7BAAF5")
  }
}, {
  id: "TR",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#83AFF5")
  }
},
{
  id: "CA",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#8CB5F6")
  }
}, {
  id: "TH",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#94BAF6")
  }
}, {
  id: "NL",
  url: "/trade/statShow",
  polygonSettings: {
    fill: am5.color("#9FBFF2")
  }
}, {
  id: "HU",
  url: "/trade/statShow",
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
};

// ======= createDiv =======

// var id = 0;
// var div = document.getElementById("chartdiv");


function createDiv(id, div) {
  var container = document.createElement("div");
  container.id = "chart" + id;
  container.style.width = "350px";
  container.style.height = "350px";
  // container.style.float = "left";
  container.style.margin = "10px";
  container.style.border = "1px solid #eee";
  return container;
}

//지우는 함수
function maybeDisposeRoot(divId) {
  // console.log(root.dom.id);
  // console.log(divId);
  am5.array.each(am5.registry.rootElements, function(root) {
    // console.log(root.dom.id);
    if (root && root.dom && root.dom.id === divId) {
      root.dispose();
    }
  });
}

// ================================== bulletChart ========================================
// =======================================================================================

function createBullet(id, div) {
  console.log("============createBullet도착");
  var newspace = createDiv(id, div);
  
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
  wheelY: "zoomX",
    width: am5.percent(100),  //
    height: am5.percent(100), //
    layout: root.verticalLayout //
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
    timeUnit: "month",
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
  name: "수출(백만$)",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value1",
  valueXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "수출: {valueY}\n수입: {value2}"
  })
}));

series.strokes.template.setAll({
  strokeWidth: 2
});

series.get("tooltip").get("background").set("fillOpacity", 0.5);

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series 2",
  name: "수입(10억$)",
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
  date: new Date(2023, 1, 1).getTime(),
  value1: 46339, // 46339145,
  value2: 59037, // 59037259
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 2, 1).getTime(),
  value1: 49994, //49994593
  value2: 55370, //55370498
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 3, 1).getTime(),
  value1: 54882, //54882484
  value2: 59635, //59635920
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 4, 1).getTime(),
  value1: 49430, //49430879
  value2: 51940, //51940137
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 5, 1).getTime(),
  value1: 52054, //52054195
  value2: 54251, //54251194
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2023, 6, 1).getTime(),
  value1: 54297, //54297754
  value2: 53055, //53055480
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 13).getTime(),
  value1: 53,
  value2: 51,
  previousDate: "2019-05-06",
  date: new Date(2023, 7, 1).getTime(),
  value1: 50457, //50457776
  value2: 48738, //48738114
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 14).getTime(),
  value1: 56,
  value2: 58,
  previousDate: "2019-05-07",
  date: new Date(2023, 8, 1).getTime(),
  value1: 51994, //51994074
  value2: 51009, //51009758
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 15).getTime(),
  value1: 52,
  value2: 53,
  previousDate: "2019-05-08",
  date: new Date(2023, 9, 1).getTime(),
  value1: 54650, //54650691
  value2: 50972, //50972525
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 16).getTime(),
  value1: 48,
  value2: 44,
  previousDate: "2019-05-09",
  date: new Date(2023, 10, 1).getTime(),
  value1: 54989, //54989950
  value2: 53440, //53440582
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 17).getTime(),
  value1: 47,
  value2: 42,
  previousDate: "2019-05-10",
  date: new Date(2023, 11, 1).getTime(),
  value1: 55561, //55561090
  value2: 51997, //51997805
  bulletSettings: {
    visible: false
  }
}, {
  date: new Date(2019, 5, 18).getTime(),
  value1: 59,
  value2: 55,
  previousDate: "2019-05-11",
  date: new Date(2023, 12, 1).getTime(),
  value1: 57573, //57573193
  value2: 53122, //53122854
  bulletSettings: {
    visible: true
  }
}]

series.data.setAll(data);
series2.data.setAll(data);

series.set("selectedDataItem", series.dataItems[0]);

// Add legend

// var legend = chart.children.push(am5.Legend.new(root, {}));
// legend.data.setAll(series.dataItems[0].get("children"));

var legend = chart.children.push( 
  am5.Legend.new(root, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50),
    // layout: root.horizontalLayout
  })
);
legend.data.setAll(chart.series.values);
// console.log(chart.series.values);

// var legend = chart.children.push(am5.Legend.new(root, {
//   nameField: "categoryX",
//   centerX: am5.percent(50),
//   x: am5.percent(50)
// })); 

// legend.data.setAll(series.dataItems);

// var legendData = [
//   { name: "수출(10억$)"}, // , color: am5.color(0xff0000) }, // 시리즈 1의 이름과 선 색상
//   { name: "수입(10억$)"} //, color: am5.color(0x0000ff) }  // 시리즈 2의 이름과 선 색상
// ];

// 범례에 데이터를 설정합니다.
// legend.data.setAll(legendData);





// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);
};

// ====================================== pieChart =======================================
// =======================================================================================
// 첫 화면 시작 시 먼저 실행
function createPie(id, div, country, year) {
  $.ajax({
    url: "/trade/pieChart"
    ,method: "GET"
    ,async: false
    ,data: {"country":country}
    , success: function(resp) {createRealPie(id, div, resp, country, year)}
  })}

  function createRealPie(id, div, resp, country, year) {
    console.log("createPie 데이터 : ", resp);
    var space = document.getElementById("chart6");
    var root;

    if(space == null) {
      var newspace = createDiv(id, div);
      newspace.style.width = "450px";
      newspace.style.display = "inline-block";
      newspace.style.float = "right";
      root = am5.Root.new(newspace);
      div.after(newspace);
      
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
      };//end helpers

      var dropdown = document.createElement('select');
      dropdown.id = 'dropdownpie';  // 선택 사항: id 설정

      // chart6 div 가져오기
      var chart6Div = document.getElementById('chart6');
      //var chart6Div = document.getElementById('chart4');

      // dropdown 요소를 chart6 div 안에 추가
      chart6Div.prepend(dropdown);

      var dropdata = '[{"id":2019,"name":"2019"}, {"id":2020,"name":"2020"},{"id":2021,"name":"2021"},{"id":2022,"name":"2022"},{"id":2023,"name":"2023"}]';
      helpers.buildDropdown(
        jQuery.parseJSON(dropdata),
        $('#dropdownpie'),
        '년도'
      );

      // 조회버튼 만들기
      var input = document.createElement('input');
      input.id = 'replyBtnpie';
      input.type = 'button';
      input.value = '조회';

      //var dropdown1 = document.getElementById('dropdown');
      dropdown.after(input);
      
      // // 수출/수입 선택하는 드롭박스
      // var importpie = document.createElement('select');
      // importpie.id = 'importpie';  // 선택 사항: id 설정

      // //var chart6Div = document.getElementById('chart6');
      // chart6Div.prepend(importpie);

      // var dropdata = '[{"id":"수출","name":"수출"}, {"id":"수입","name":"수입"}]';
      // helpers.buildDropdown(
      //   jQuery.parseJSON(dropdata),
      //   $('#importpie'),
      //   '수출/수입'
      // );
    }//end if

    else{
      maybeDisposeRoot("chart6");
      root = am5.Root.new(space);
    }//end else

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  // data
  var data = [];
  console.log(resp);
  $.each(resp, function(index, item) {
    if(item.importMarket != "총계" && item.dateYear == year && item.country == country){
      console.log(item);
      var percentile = parseFloat(item.percentile.replace('%', '')); // '%' 문자 제거 후 실수로 변환
      data.push({
        "country": item.importMarket,
        "percentile": percentile
      })}//end if
    });//end each
    console.log(data);

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270
      })
    );
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "percentile",
        categoryField: "country",
        endAngle: 270
      })
    );
    
    series.states.create("hidden", {
      endAngle: -90
    });
    
    series.data.setAll(data);   
    series.appear(1000, 100);
    
};//end createRealPie


// =============================== xyclusterChart =====================================
// =======================================================================================
var respData = [];  // 전역 변수로 resp 데이터를 저장할 배열 선언
var data = [];      // 각 연도의 데이터가 담길 것.

//가장 처음으로 실행되는 함수(전체 데이터 받아옴)
function createxycluster(id, div, selectedyear, selectedport) {
  console.log("==========createxycluster 도착")
  console.log("Selected Year:", selectedyear);
  console.log("Selected Port:", selectedport);
  
  $.ajax({
    method: 'GET'
    , url : '/trade/xyCluster'
    , async : false
    , success : function(resp){
      respData = resp; // resp 데이터를 전역 변수에 저장
      createRealxycluster(id, div, resp, selectedyear, selectedport);
    },
    error: function(err) {
      console.error('Error fetching data:', err);
    }
  });
}

// // 막대차트 지우는 함수 (나중에 삭제할 것)
// function maybeDisposeRoot(divId) {
//   am5.array.each(am5.registry.rootElements, function(root) {
//     if (root.dom.id === divId) {
//       root.dispose();
//     }
//   });
// }

// 막대차트 그리는 함수
function createRealxycluster(id, div, resp, selectedyear, selectedport) {
  var space = document.getElementById("chart2");
  console.log(resp);
  console.log(selectedyear);
  console.log(selectedport);
  var root;

  //만약 그래프 영역이 비어있다면 새로 생성
  if(space == null){
    var newspace = createDiv(id, div);
    newspace.style.width = "500px";
    newspace.style.display = "inline-block";
    newspace.style.float = "right";
    div.before(newspace);
    console.log(newspace.id);
    root = am5.Root.new(newspace);

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
  };
  var dropdown = document.createElement('select');
  dropdown.id = 'dropdown';  // 선택 사항: id 설정

  // chart6 div 가져오기
  var chart6Div = document.getElementById('chart2');
  var chart6Div = document.getElementById('chart2');

  // dropdown 요소를 chart6 div 안에 추가
  chart6Div.prepend(dropdown);

  var dropdata = '[{"id":2019,"name":"2019"}, {"id":2020,"name":"2020"},{"id":2021,"name":"2021"},{"id":2022,"name":"2022"},{"id":2023,"name":"2023"}]';
  helpers.buildDropdown(
    jQuery.parseJSON(dropdata),
    $('#dropdown'),
    '년도'
  );

  // 조회버튼 만들기
  var input = document.createElement('input');
  input.id = 'replyBtn';
  input.type = 'button';
  input.value = '조회';
  var dropdown1 = document.getElementById('dropdown');
  dropdown1.after(input);
  
  // 수출/수입 선택하는 드롭박스
  var importdd = document.createElement('select');
  importdd.id = 'importdd';  // 선택 사항: id 설정

  //var chart6Div = document.getElementById('chart6');
  chart6Div.prepend(importdd);

  var dropdata = '[{"id":"수출","name":"수출"}, {"id":"수입","name":"수입"}]';
  helpers.buildDropdown(
    jQuery.parseJSON(dropdata),
    $('#importdd'),
    '수출/수입'
  );
}//end if

  //그렇지 않다면 기존 그래프 지우는 함수 사용. 새로 만듦
  else{
    maybeDisposeRoot("chart2");
    //maybeDisposeRoot("chart2");
    root = am5.Root.new(space);
    console.log(newspace);
  }//end else

  root.setThemes([
    am5themes_Animated.new(root)
  ]);

  //기본 뿌려주는거
  data = [];
  let count = 0;
    $.each(resp, function(index, item) {
      if(item.importexport == selectedport){
        if(item.dateYear == selectedyear) {
          // alert(item)
          data.push({
            "hscode": item.hs4digit,
            "product" : item.productName,
            "price": item.price
          })
          count ++;
        }//end if
      }
      if (count >= 5) {  // data 길이가 5개 이상이면 반복문 종료
        return false;
      }
    });//end each
    console.log(data);

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
console.log(selectedyear);
console.log(selectedport);
}

// =============================== barChart(국가별 10대 수출입품목)==============================================
// =======================================================================================

// if~else로 사용자가 수출을 눌렀는지 수입을 눌렀는지에 따라 가져오는 데이터 달라짐. 기본은 수출 2019
function createBar(id, div, country, year, type) {
  if(type == 'export') {
    $.ajax({
      url: "/trade/Exbarchart"
      ,method: "GET"
      ,async: false
      ,data: {"country":country}
      , success: function(resp) {createRealBar(id, div, resp, country, year)}
    })
  }//end if
  else {
    $.ajax({
      url: "/trade/Ixbarchart"
      ,method: "GET"
      ,async: false
      ,data: {"country":country}
      , success: function(resp) {createRealBar(id, div, resp, country, year)}
    });
  };//end else
};// end createBar

  function createRealBar(id, div, resp, country, year) {
    console.log(resp);
    var space = document.getElementById("chart4");
    var root;

    if(space == null) {
      var newspace = createDiv(id, div);
      newspace.style.width = "450px";
      newspace.style.display = "inline-block";
      root = am5.Root.new(newspace);
      div.after(newspace);
      console.log(resp);

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
    };//end helpers

    var dropdown = document.createElement('select');
    dropdown.id = 'dropdownbar';  // 선택 사항: id 설정

    // chart6 div 가져오기
    var chart6Div = document.getElementById('chart4');
    //var chart6Div = document.getElementById('chart4');

    // dropdown 요소를 chart6 div 안에 추가
    chart6Div.prepend(dropdown);

    var dropdata = '[{"id":2019,"name":"2019"}, {"id":2020,"name":"2020"},{"id":2021,"name":"2021"},{"id":2022,"name":"2022"},{"id":2023,"name":"2023"}]';
    helpers.buildDropdown(
      jQuery.parseJSON(dropdata),
      $('#dropdownbar'),
      '년도'
    );

    // 조회버튼 만들기
    var input = document.createElement('input');
    input.id = 'replyBtnbar';
    input.type = 'button';
    input.value = '조회';

    //var dropdown1 = document.getElementById('dropdown');
    dropdown.after(input);
    
    // 수출/수입 선택하는 드롭박스
    var importbar = document.createElement('select');
    importbar.id = 'importbar';  // 선택 사항: id 설정

    //var chart6Div = document.getElementById('chart6');
    chart6Div.prepend(importbar);

    var dropdata = '[{"id":"수출","name":"수출"}, {"id":"수입","name":"수입"}]';
    helpers.buildDropdown(
      jQuery.parseJSON(dropdata),
      $('#importbar'),
      '수출/수입'
    );
  }//end if
    else{
      maybeDisposeRoot("chart4");
      root = am5.Root.new(space);
    }//end else

    var myTheme = am5.Theme.new(root);
    
    myTheme.rule("Grid", ["base"]).setAll({
      strokeOpacity: 0.1
    });
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      myTheme
    ]);
  
  // data
  var data = [];
  $.each(resp, function(index, item) {
    // console.log(item);
    if(item.country == country && item.dateYear == year){
        // console.log(item);
        data.push({
          "hscode": item.hscode,
          "country" : item.country,
          "productName" : item.productName,
          "price" : item.price
        })
    }//end if
  });//end each
    console.log("barchartDATA : ", data);

  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      paddingLeft: 0
    })
  );

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var yRenderer = am5xy.AxisRendererY.new(root, {
    minGridDistance: 30,
    minorGridEnabled: true
  });//end yRenderer
  yRenderer.grid.template.set("location", 1);
    
  var yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "hscode",
      renderer: yRenderer
    })
  );//end yAxis
    
  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      renderer: am5xy.AxisRendererX.new(root, {
        visible: true,
        strokeOpacity: 0.1,
        minGridDistance: 80
      })
    })
  );//end xAxis

  // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "price",
        sequencedInterpolation: true,
        categoryYField: "hscode"    //여기도 "hscode"라고 바꿔줘야 그래프 그려짐
      })
    );//end series

    var columnTemplate = series.columns.template;
    
    columnTemplate.setAll({
      draggable: false, //그래프 드래그하는거 못하게 해놓음
      cursorOverStyle: "pointer",
      tooltipText: "{productName}\n${price}",  //productName도 써주기
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      strokeOpacity: 0
    });
    columnTemplate.adapters.add("fill", (fill, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    
    columnTemplate.adapters.add("stroke", (stroke, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    
    columnTemplate.events.on("dragstop", () => {
      sortCategoryAxis();
    });

    yAxis.data.setAll(data);
    // xAxis.data.setAll(data);
    series.data.setAll(data);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
};//end createRealBar
// =============================== StringChart ==============================================
// ==========================================================================================\
function createString(id, div, country) {

  $.ajax({
    url: "/trade/stringChart"
    ,method: "GET"
    ,async: false
    ,data: {"country":country}
    , success: function(resp) {createRealString(id, div, resp)}
  })}

function createRealString(id, div, resp) {
  console.log(resp);
  var space = document.getElementById("chart5");
  var root;
  if(space == null) {
    var newspace = createDiv(id, div);
    newspace.style.width = "500px";
    newspace.style.display = "inline-block";
    newspace.style.float = "right";
    div.after(newspace);
    root = am5.Root.new(newspace);
  }

  else{
    maybeDisposeRoot("chart5");
    root = am5.Root.new(space);
    }

  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  console.log(typeof(resp));
  var data = [];
  $.each(resp, function(index, item) {
      data.push({
        date: new Date(item.dateYear, item.dateMonth, 12).getTime(),
        value1: item.exportPrice,
        value2: item.importPrice,
        previousDate: new Date(2019, 5, 5)
      })
      });
//end each
  console.log(data);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX"
  , layout: root.verticalLayout
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
    timeUnit: "month",
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
  name: "수출액",
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
  name: "수출액",
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

series.data.setAll(data);
series2.data.setAll(data);

series.set("selectedDataItem", series.dataItems[0]);

// Add legend
// var legend = chart.children.push(am5.Legend.new(root, {
//   // nameField: "categoryX",
//   centerX: am5.percent(50),
//   x: am5.percent(50)
// }));

// legend.data.setAll(chart.series.values);

var legend = chart.children.push( 
  am5.Legend.new(root, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50)
    // , layout: root.verticalLayout
  })
);
legend.data.setAll(chart.series.values);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);
};//end StringChart

// ====================================== StackCluster =======================================
// =========================================================================================
// // 첫 화면에 시작되는 
function createStackCluster(id, div, country) {
  $.ajax({
    url: "/trade/StackCluster"
    , method: "GET"
    , data: {"country":country}
    , success: function(resp) {createRealStackCluster(id, div, resp, country)}
})};

function createRealStackCluster(id, div, resp, country) {
  console.log("======StackCluster 시작")
  console.log("StackCluster의 데이터 : ", resp)
  var space = document.getElementById("chart3");
  var root;

  //만약 첫 화면이라면 
  if(space == null) {
    var newspace = createDiv(id, div);
    newspace.style.width = "450px";
    newspace.style.display = "inline-block";
    root = am5.Root.new(newspace);
    div.after(newspace);
    console.log(newspace);
  }//end if

  //그렇지 않다면 기존 그래프 지우는 함수 사용. 새로 만듦
  else{
    maybeDisposeRoot("chart3");
    root = am5.Root.new(space);
  }//end else

  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  //기본 뿌려주는거
  var data = [];
  //let count = 0;
    $.each(resp, function(index, item) {
      if(item.country == country){
          data.push({
            "hscode": item.hscode,
            "country" : item.country,
            "productName" : item.productName,
            "importrate": item.importrate,
            "exportrate": item.exportrate
          //count ++;
        })
      }//end if
    });//end each
    console.log(data);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
// 마우스로 줌인아웃 하는거 설정
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "hscode",
  renderer: am5xy.AxisRendererX.new(root, {
    cellStartLocation: 0.1,
    cellEndLocation: 0.9,
    minGridDistance: 30,
    minorGridEnabled: false,
  }),
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  baseValue: 0,
  min: -5,
  numberFormat: "#.0'%'",
  renderer: am5xy.AxisRendererY.new(root, {})
}));

function makeSeries(name, fieldName, stacked, port) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    stacked: stacked,
    name: port,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    categoryXField: "hscode" 
  }));

  series.columns.template.setAll({
    tooltipText: "{productName}",
    width: am5.percent(90),
    tooltipY: am5.percent(10)
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        text: "{valueY}%",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.percent(50),
        centerX: am5.percent(50),
        populateText: true,
        fontSize: 10,
        location: 0.5
      })
    });
  });

  legend.data.push(series);

}//end makeSeries

for(let i = 0; i<1; i++){
  makeSeries(data[i].productName + " 수출", "exportrate", false, "수출");
  makeSeries(data[i].productName + " 수입", "importrate", false, "수입");
}

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
};//end StackCluster
