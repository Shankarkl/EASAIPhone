// JScript source code

/*******************************************************************************
* FUNCTION TO CALL ANY WEB SERVICE
******************************************************************************/
/*CallWebService = function (url, inputData, method, contentType, callback) {
    var xhr;
    // document.getElementById('view-loading').style.display = "block";
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('loaddingimg').style.display = "none";
            callback(this.responseText);
        }

        if (xhr.status == 500) {
            jAlert("The System is temporarily unavailable, please try again later.", 'Error');
            document.getElementById('loaddingimg').style.display = "none";
        }
    };

    xhr.onerror = function (e) {
        jAlert("The System is temporarily unavailable, please try again later.", 'Error');
        document.getElementById('loaddingimg').style.display = "none";
    };

    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", contentType);

    if (inputData !== '') {
        xhr.send(inputData);
    } else {
        xhr.send(null);
    }
    document.getElementById('loaddingimg').style.display = "block";
    var target = document.getElementById('loaddingimg');
    var spinner = new Spinner(opts).spin(target);
}


*/

CallWebService = function (url, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        alert(xhr.readyState);
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(this.responseText);
            callback(this.responseText);
        }
    }

    xhr.onerror = function (e) {
        alert('system busy. try later');
    }


    xhr.open('POST', url);
    xhr.send(null);
}