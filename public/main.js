
$(document).ready(function(){
    console.log('document is ready...');
    hideForms();
    $('#login-form-id').show();
});

$('#login-btn-id').click( ()=>{
    let userName = $('#input-user-id').val();
    let password = $('#input-password-id').val();

    if(userName == '' || password == '' ){
        alert('user and password required!');
    }else{
        let user={
            username: $('#input-user-id').val(),
            password: $('#input-password-id').val()
        }
        console.log(user);
        $.ajax({
            url:"login",
             type: 'POST',
            data:  JSON.stringify(user),
            dataType: 'json',
            contentType:'application/json',
            
            success:function(res){
                console.log('response',res);
             
                if(res.error == 0){
                    hideForms();
                    getLiveData();
                    $('#chartContainer').show();
                    $('#logout-id').show();
                    $('#input-user-id').val('');
                    $('#input-password-id').val('');

                }else if(res.error == 2){
                    alert(res.result);                        
                }else{
                    alert('Invalid User or wrong password', res.result);
                }
            },
            error: function(xhr,status,error){
                console.log(`error:${error},
                            status:${status},
                            xhr:${JSON.stringify(xhr)}`);
            }
        }); 
    }
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

$('#logout-btn-id').click(()=>{
    console.log('Logout btn clicked...');

    $.ajax({
        url:"/logout",
        type: 'GET',
        dataType: 'json',
        success:function(response){
            console.log('response',response);
            hideForms();
            $('#login-form-id').show();
        },
        error: function(xhr,status,error){
            console.log(`
            error:${error},
            status:${status},
            xhr:${JSON.stringify(xhr)}
            `);
        }
    });
});

function hideForms(){
    $('#login-form-id').hide();
    $('#register-form-id').hide();
    $('#forgetPassword-form-id').hide();
    $('#confirm-reset-pass-btn-id').hide();
    $('#chartContainer').hide();
    $('#logout-id').hide();
}



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
                // { x: 1, y: 35 },
            ]
         },
        {
            type: "splineArea",
            showInLegend: true,
            name: "Temprature C°",
            yValueFormatString: "##.##",
            xValueFormatString: "MMM YYYY",
            dataPoints: [
                // { x: 1, y: 40 },
            ]
         }

        ]
};

function getLiveData(){

    console.log('whatever');
    $.ajax({
        
        // url:'http://nodeapps.vulkanclub.tech/getdata',
        // url:'http://35.156.88.18:3050/users',
        url:'/getData',
        type: 'GET',
        // contentType: 'json/application',
        dataType: 'json',
        async:true,
        success:function(response){
       
            let entries = JSON.parse(response);
            for (let index = entries.length-10; index < entries.length; index++) {
                console.log(entries[index])
                options.data[0].dataPoints.push({ x:index,  y:parseInt(entries[index].hum)});
                options.data[1].dataPoints.push({ x:index,  y:parseInt(entries[index].temp)});
            }
            
            console.log('options:',options);
            var chart = new CanvasJS.Chart("chartContainer", options);
            chart.render();
            // $("#chartContainer").CanvasJSChart(options);
            setInterval(function(){
                // let x = Math.round(Math.random()*2);
                // let y = Math.round(Math.random()*3);
                // options.data[0].dataPoints.push({ 
                //         x:options.data[0].dataPoints[options.data[0].dataPoints.length-1].x +x ,
                //         y:options.data[0].dataPoints[options.data[0].dataPoints.length-1].y +x+1});
                // options.data[1].dataPoints.push({
                //         x:options.data[1].dataPoints[options.data[1].dataPoints.length-1].x +x ,
                //         y:options.data[1].dataPoints[options.data[1].dataPoints.length-1].y +y+1 });
                //         // $("#chartContainer").CanvasJSChart(options);
                //         options.data[0].dataPoints.shift();
                //         options.data[1].dataPoints.shift();
                        chart.render();

            },1500);
        },
        error: function(xhr,status,error){
            console.log(`
            error:${error},
            status:${status},
            xhr:${JSON.stringify(xhr)}
            `);   
        }

    });
    console.log('afer shwioasdhfj');
}