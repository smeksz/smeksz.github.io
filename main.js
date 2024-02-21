let data, username, password, usernameTXT, passwordTXT, failTXT, failed, dataTXT;

async function start(){
    data = {};
    await fetch("https://api.codetabs.com/v1/proxy?quest=http://localhost:6677/getmark_v2", {
    method: "POST",
    body: JSON.stringify({
        "number": username,
        "password": password
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then(function (response) {
        console.log(response.status);
        failed = response.status;
        if (failed != 200) {
            switch(failed){
                case 401:
                    failTXT.innerText = "Wrong username or password.";
                    break;
                case 500:
                    failTXT.innerText = "Server is down.";
                    break;
                case 404:
                    failTXT.innerText = "IP not found";
                    break;
                case 503:
                    failTXT.innerText = "Teachassist is down.";
                    break;
                default:
                    failTXT.innerText = "Something went wrong.";
            }
            
            dataTXT.innerText = " ";
            return;
        }
        return response.json();
    })
    .then((json) => data = json);
    
    console.log(data);
    console.log(failed);
    if (failed == 200){
        failTXT.innerText = "Success!";
        //let a = JSON.parse(data)
        let str = "";
        for (let i = 0; i < 4; i++) {
            str +=  a(data,i) + "\n\n\n"
        }
        dataTXT.innerText = str;
        console.log(str);
    }
    
}


function a(data, period) {
    return `${data[period].name}:
      Period: ${data[period].block}
      Mark: ${data[period].mark}
      Room: ${data[period].room}
      Code: ${data[period].code}
      Id: ${data[period].id}
      Start time: ${data[period].start_time}
      End time: ${data[period].end_time}
      Assignments: ${data[period].assignments}`
}

document.getElementById('login').addEventListener("click", function() {
    usernameTXT = document.getElementById('username');
    passwordTXT = document.getElementById('password');
    failTXT = document.getElementById('fail');
    dataTXT = document.getElementById('data');
    username = usernameTXT.value
    password = passwordTXT.value
    usernameTXT.value = ""
    passwordTXT.value = ""
    start()
    //failTXT.innerText = "wrong username or password";
});
