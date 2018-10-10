
$(document).ready(function(){
    console.log('document is ready...');
    hideForms();
    $('#login-form-id').show();

});




$("#forgetPassword-id").click( ()=>{
    console.log('forget password clicked...');
    $('#login-form-id').hide();
    $('#forgetPassword-form-id').show();

});
$('#register-form-login-btn-id').click(()=>{
    $('#login-form-id').show();
    $('#register-form-id').hide();
});

$('#forget-password-form-login-id').click(()=>{
    $('#login-form-id').show();
    $('#forgetPassword-form-id').hide();
});

$('#login-form-register-btn-id').click(()=>{
    $('#login-form-id').hide();
    $('#register-form-id').show();
    $('#register-btn-id').show();
});
function hideForms(){
    $('#login-form-id').hide();
    $('#register-form-id').hide();
    $('#forgetPassword-form-id').hide();
    $('#confirm-reset-pass-btn-id').hide();
    
}

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
            fontSize: 15
        },
        data: [
        {
                type: "splineArea", 
                showInLegend: true,
                name: "Humidity %",
                yValueFormatString: "##",
                dataPoints: [
                    // { x: new Date(2018, 0), y: 0 },
                    // { x: new Date(2018, 1), y: 40 },
                    // { x: new Date(2018, 2), y: 42 },
                    // { x: new Date(2018, 3), y: 46 },
                    // { x: new Date(2018, 4), y: 56 },
                    // { x: new Date(2018, 5), y: 66 },
                    // { x: new Date(2018, 6), y: 70 },
                    // { x: new Date(2018, 7), y: 80 },
                    // { x: new Date(2018, 8), y: 65 },
                    // { x: new Date(2018, 9), y: 70 },
                    // { x: new Date(),        y: 75 },
                    { x: 1, y: 0 },
                    { x: 2, y: 40 },
                    { x: 3, y: 42 },
                    { x: 4, y: 46 },
                    { x: 5, y: 56 },
                    { x: 6, y: 66 },
                    { x: 7, y: 70 },
                    { x: 8, y: 200 },
                    { x: 9, y: 65 },
                    { x: 10, y: 70 },
                    { x: 11,        y: 75 },
                ]
             },
            {
                type: "splineArea",
                showInLegend: true,
                name: "Temprature C°",
                yValueFormatString: "##.##",
                xValueFormatString: "MMM YYYY",
                dataPoints: [
                    // { x: new Date(2018, 0), y: 0 },
                    // { x: new Date(2018, 1), y: 17.89 },
                    // { x: new Date(2018, 2), y: 20.60 },
                    // { x: new Date(2018, 3), y: 22.22 },
                    // { x: new Date(2018, 4), y: 26.78 },
                    // { x: new Date(2018, 5), y: 24.56 },
                    // { x: new Date(2018, 6), y: 20.99 },
                    // { x: new Date(2018, 7), y: 24.67 },
                    // { x: new Date(2018, 8), y: 26.45 },
                    // { x: new Date(2018, 9), y: 27.84 },
                    // { x: new Date(),        y: 30.53 },
                    { x: 1, y: 0 },
                    { x: 2, y: 17.89 },
                    { x: 3, y: 20.60 },
                    { x: 4, y: 22.22 },
                    { x: 5, y: 26.78 },
                    { x: 6, y: 24.56 },
                    { x: 7, y: 20.99 },
                    { x: 8, y: 24.67 },
                    { x: 9, y: 26.45 },
                    { x: 10, y: 27.84 },
                    { x:11,        y: 30.53 },

                ]
             }
    
            ]
    };
    $("#chartContainer").CanvasJSChart(options);
}