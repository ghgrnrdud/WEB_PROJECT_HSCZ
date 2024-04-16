// 5년간 수출입액 그래프
function imexXYChart(exYearAmountList, imYearAmountList) {
    am5.ready(function() {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdiv1");
        
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
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
            pinchZoomX:true
        }));
        
        chart.get("colors").set("step", 5);
        
        
        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
        
        
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0.3,

            baseInterval: {
            timeUnit: "year",
            count: 1
            },
            gridIntervals: [
                { timeUnit: "year", count: 1 }
            ],
            renderer: am5xy.AxisRendererX.new(root, {}),
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
                labelText: "수출: {value1} \n수입: {value2}"
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

        // root.dateFormatter.setAll({
        //     dateFormat: "yyyy",
        //     dateFields: ["valueX"]
        // });
        xAxis.get("dateFormats")["year"] = "yyyy";
        
        // Set data
        var data = [{
            date: new Date(2019, 11, 31).getTime(),
            value1: exYearAmountList[4],
            value2: imYearAmountList[4]
        }, {
            date: new Date(2020, 11, 31).getTime(),
            value1: exYearAmountList[3],
            value2: imYearAmountList[3]
        }, {
            date: new Date(2021, 11, 31).getTime(),
            value1: exYearAmountList[2],
            value2: imYearAmountList[2]
        }, {
            date: new Date(2022, 11, 31).getTime(),
            value1: exYearAmountList[1],
            value2: imYearAmountList[1]
        }, {
            date: new Date(2023, 11, 31).getTime(),
            value1: exYearAmountList[0],
            value2: imYearAmountList[0]
        }]
        
        series.data.setAll(data);
        series2.data.setAll(data);
        
        
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        series2.appear(1000);
        chart.appear(1000, 100);
        
        }); // end am5.ready()
}


// 수출 국가 top5 그래프
function exportPieChart(countryList, exRankingList, exAmountList) {
    am5.ready(function() {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdiv2");
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var chart = root.container.children.push(
            am5percent.PieChart.new(root, {
            endAngle: 270,
            radius: am5.percent(40)
            })
        );
        
        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        var series = chart.series.push(
            am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270
            })
        );

        series.labels.template.setAll({
            fontSize: 10,
            fill: am5.color(0x550000),
            text: "{category}"
        });

        series.labels.template.set("text", "{category}: [bold]{value.formatNumber('#,###,###.###')}");
        
        series.states.create("hidden", {
            endAngle: -90
        });
        
        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll([{
            category: countryList[0],
            value: exAmountList[0]
        }, {
            category: countryList[1],
            value: exAmountList[1]
        }, {
            category: countryList[2],
            value: exAmountList[2]
        }, {
            category: countryList[3],
            value: exAmountList[3]
        }, {
            category: countryList[4],
            value: exAmountList[4]
        }]);
        
        series.appear(1000, 100);
        
    }); // end am5.ready()
};

// 수입 국가 top5 그래프
function importPieChart(countryList, imRankingList, imAmountList) {
    am5.ready(function() {

        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdiv3");
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var chart = root.container.children.push(
            am5percent.PieChart.new(root, {
            endAngle: 270,
            radius: am5.percent(40)
            })
        );
        
        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        var series = chart.series.push(
            am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            endAngle: 270
            })
        );
        
        series.labels.template.setAll({
            fontSize: 10,
            fill: am5.color(0x550000),
            text: "{category}"
        });

        series.labels.template.set("text", "{category}: [bold]{value.formatNumber('#,###,###.###')}");

        series.states.create("hidden", {
            endAngle: -90
        });
        
        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll([{
            category: countryList[0],
            value: imAmountList[0]
        }, {
            category: countryList[1],
            value: imAmountList[1]
        }, {
            category: countryList[2],
            value: imAmountList[2]
        }, {
            category: countryList[3],
            value: imAmountList[3]
        }, {
            category: countryList[4],
            value: imAmountList[4]
        }]);
        
        series.appear(1000, 100);
        
    }); // end am5.ready()
};