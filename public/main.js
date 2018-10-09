window.onload = function () {

    var options = {
        animationEnabled: true,
        theme: "dark1",
        title:{
            text: "Dryer Fruits Machine"
        },
        axisY :{
            includeZero: false,
            prefix: "C-% ",
            lineThickness: 0
        },
        toolTip: {
            shared: true
        },
        legend: {
            fontSize: 13
        },
        data: [
        {
                type: "splineArea", 
                showInLegend: true,
                name: "Humidity",
                yValueFormatString: "## %",
                dataPoints: [
                    { x: new Date(2016, 2), y: 40 },
                    { x: new Date(2016, 3), y: 46 },
                    { x: new Date(2016, 4), y: 56 },
                    { x: new Date(2016, 5), y: 66 },
                    { x: new Date(2016, 6), y: 70 },
                    { x: new Date(2016, 7), y: 80 },
                    { x: new Date(2016, 8), y: 65 },
                    { x: new Date(2016, 9), y: 70 },
                    { x: new Date(2016, 10), y: 75 },
                    { x: new Date(2016, 11), y: 80 },
                    { x: new Date(2017, 0), y: 99 },
                    { x: new Date(2017, 1), y: 60 }
                ]
             },
            {
                type: "splineArea",
                showInLegend: true,
                name: "Temprature",
                yValueFormatString: "##.## C",
                xValueFormatString: "MMM YYYY",
                dataPoints: [
                    { x: new Date(2016, 2), y: 20.35 },
                    { x: new Date(2016, 3), y: 22 },
                    { x: new Date(2016, 4), y: 26 },
                    { x: new Date(2016, 5), y: 24 },
                    { x: new Date(2016, 6), y: 20 },
                    { x: new Date(2016, 7), y: 24 },
                    { x: new Date(2016, 8), y: 26 },
                    { x: new Date(2016, 9), y: 27 },
                    { x: new Date(2016, 10), y: 30 },
                    { x: new Date(2016, 11), y: 35 },
                    { x: new Date(2017, 0),  y: 36 },
                    { x: new Date(2017, 1),  y: 38 }
                ]
             }
    
            ]
    };
    $("#chartContainer").CanvasJSChart(options);
}