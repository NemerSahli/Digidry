window.onload = function () {

    var options = {
        animationEnabled: true,
        theme: "dark1",
        title:{
            text: "Fruits Dryer"
        },
        axisY :{
            includeZero: false,
            prefix: "C° - % ",
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
                name: "Humidity %",
                yValueFormatString: "##",
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
                    { x: new Date(2017, 0), y: 85 },
                    { x: new Date(2017, 1), y: 60 }
                ]
             },
            {
                type: "splineArea",
                showInLegend: true,
                name: "Temprature C°",
                yValueFormatString: "##.##",
                xValueFormatString: "MMM YYYY",
                dataPoints: [
                    { x: new Date(2016, 2), y: 0.00 },
                    { x: new Date(2016, 3), y: 22.22 },
                    { x: new Date(2016, 4), y: 26.78 },
                    { x: new Date(2016, 5), y: 24.56 },
                    { x: new Date(2016, 6), y: 20.99 },
                    { x: new Date(2016, 7), y: 24.67 },
                    { x: new Date(2016, 8), y: 26.45 },
                    { x: new Date(2016, 9), y: 27.84 },
                    { x: new Date(2016, 10), y: 30.53 },
                    { x: new Date(2016, 11), y: 35.90 },
                    { x: new Date(2017, 0),  y: 36.65 },
                    { x: new Date(2017, 1),  y: 38.77 }
                ]
             }
    
            ]
    };
    $("#chartContainer").CanvasJSChart(options);
}