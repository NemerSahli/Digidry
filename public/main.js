$(document).ready(function() {
  console.log("document is ready...");
  hideForms();
  $("#login-logo").show();
  $("#login-form-id").show();
});

// setInterval(function(){

// },10000);

$("#login-btn-id").click(() => {
  let userName = $("#input-user-id").val();
  let password = $("#input-password-id").val();

  if (userName == "" || password == "") {
    alert("user and password required!");
  } else {
    let user = {
      username: $("#input-user-id").val(),
      password: $("#input-password-id").val()
    };
    console.log(user);
    $.ajax({
      url: "login",
      type: "POST",
      data: JSON.stringify(user),
      dataType: "json",
      contentType: "application/json",

      success: function(res) {
        console.log("response", res);
        $("#label-user-id").html("User: " + user.username.split("@")[0]);

        if (res.error == 0) {
          hideForms();
          getLiveData();
          updateData();

          $("#body-form-id").show();
          $("#chart-body").show();
          $("#logout-id").show();
          $("#input-user-id").val("");
          $("#input-password-id").val("");
        } else if (res.error == 2) {
          alert(res.result);
        } else {
          alert("Invalid User or wrong password", res.result);
        }
      },
      error: function(xhr, status, error) {
        console.log(`error:${error},
                            status:${status},
                            xhr:${JSON.stringify(xhr)}`);
      }
    });
  }
});

$("#register-btn-id").click(() => {
  let userName = $("#input-register-user-id").val();
  let password = $("#input-register-password-id").val();
  let confirmPassword = $("#input-register-confirm-password-id").val();

  if (userName == "" || password == "" || confirmPassword == "") {
    alert("user and password required!");
  } else if (password == confirmPassword) {
    let newUser = {
      username: userName,
      password: password
    };

    $.ajax({
      url: "register",
      type: "POST",
      data: JSON.stringify(newUser),
      dataType: "json",
      contentType: "application/json",

      success: function(res) {
        console.log("response", res);
        if (res.error == 101) {
          alert("This email exist, please signup with other one");
        } else if (res.error == 0) {
          hideForms();
          $("#login-form-id").show();

          alert("Thank You for registration!");
          // $('#inputTime').val();
        } else {
          alert("Invalid User or wrong password", res.result);
        }
      },
      error: function(xhr, status, error) {
        console.log(`
                error:${error},
                status:${status},
                xhr:${JSON.stringify(xhr)}
                `);
      }
    });
  }
});

$("#forgetPassword-id").click(() => {
  console.log("forget password clicked...");
  $("#login-form-id").hide();
  $("#forgetPassword-form-id").show();
});

$("#register-form-login-btn-id").click(() => {
  $("#login-form-id").show();
  $("#register-form-id").hide();
});

$("#forget-password-form-login-id").click(() => {
  $("#login-form-id").show();
  $("#forgetPassword-form-id").hide();
});

$("#login-form-register-btn-id").click(() => {
  $("#login-form-id").hide();
  $("#register-form-id").show();
  $("#register-btn-id").show();
});

$("#logout-btn-id").click(() => {
  console.log("Logout btn clicked...");

  $.ajax({
    url: "/logout",
    type: "GET",
    dataType: "json",
    success: function(response) {
      console.log("response", response);
      hideForms();
      $("#login-form-id").show();
      $("#login-logo").show();
    },
    error: function(xhr, status, error) {
      console.log(`
            error:${error},
            status:${status},
            xhr:${JSON.stringify(xhr)}
            `);
    }
  });
});

function hideForms() {
  $("#login-form-id").hide();
  $("#register-form-id").hide();
  $("#forgetPassword-form-id").hide();
  $("#confirm-reset-pass-btn-id").hide();
  $("#chart-body").hide();
  $("#logout-id").hide();
  $("#body-form-id").hide();
  $("#login-logo").hide();
}

var options = {
  animationEnabled: true,
  theme: "dark1",
  title: {
    text: ""
  },
  axisY: {
    includeZero: false,
    prefix: "",
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
      dataPoints: [
        // { x: 1, y: 40 },
      ]
    }
  ]
};

var chart = new CanvasJS.Chart("chartContainer", options);

function getLiveData() {
  $.ajax({
    // url:'http://nodeapps.vulkanclub.tech/getdata',
    url: "/getdata",
    type: "GET",
    dataType: "json",
    async: true,
    success: function(entries) {
      let startIndex = 0;
      if (entries.length > 100) {
        startIndex = entries.length - 100;
      }
      options.data[0].dataPoints = [];
      options.data[1].dataPoints = [];

      for (let index = startIndex; index < entries.length; index++) {
        let entryTime = entries[index].lastEntry;
        entryTime = entryTime.slice(11, 19);
        options.data[0].dataPoints.push({
          x: index,
          y: parseInt(entries[index].hum)
        });
        options.data[1].dataPoints.push({
          x: index,
          y: parseInt(entries[index].temp)
        });
      }
      chart.render();

      let date = new Date();

      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();

      // let lastEntryTime = entries[entries.length - 1].lastEntry;

      let lastTime = entries[entries.length - 1].lastEntry
        .slice(11, 19)
        .split(":");

      let timeAsSeconds =
        (Number(lastTime[0]) + 2) * 60 * 60 +
        Number(lastTime[1]) * 60 +
        Number(lastTime[2]);

      let liveTimeAsSeconds = hh * 60 * 60 + mm * 60 + ss;

      console.log(
        "lastTimeEntry:",
        lastTime,
        "live Time:",
        hh + ":" + mm + ":" + ss
      );
      console.log(liveTimeAsSeconds - timeAsSeconds);

      if (
        liveTimeAsSeconds - timeAsSeconds <= 20 &&
        liveTimeAsSeconds - timeAsSeconds >= 0
      ) {
        $("#status-color").css("background-color", "rgba(72, 255, 0, 0.7)");
        $("#status-id").html("<span>Online</span>");
      } else {
        $("#status-color").css("background-color", "rgba(255, 0, 0, 0.7)");
        $("#status-id").html("<span>Offline</span>");
      }
      $("#temprature-id").html(entries[entries.length - 1].temp);
      $("#humidity-id").html(entries[entries.length - 1].hum);
      $("#speed-id").html(entries[entries.length - 1].duty);
    },
    error: function(xhr, status, error) {
      console.log(`
            error:${error},
            status:${status},
            xhr:${JSON.stringify(xhr)}
            `);
    }
  });
}

function updateData() {
  setInterval(function() {
    getLiveData();
  }, 15000);
}
