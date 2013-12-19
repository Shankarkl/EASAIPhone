// JScript source code
var lusername;
var lpassword;
var lcellnumber;
var currentPage = '';
var prevPage = '';
var pageData = ["indexPage"];
var RName;
var RSurName;
var RCellNumber;
var RPassword;
var RIdNumber;
var REmailID;
var dealID = '';
var getGuid;
var getproducts = [];
//alert(localStorage.gethome + '::' + localStorage.getmedical);

/*******************************************************************************
* FUNCTION TO CALL ANY WEB SERVICE
******************************************************************************/
CallWebService = function (url, inputData, method, contentType, callback) {
    // alert(url + '::' + inputData + '::' + contentType);
    try {

        var xhr;
        // document.getElementById('view-loading').style.display = "block";
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            // alert(xhr.readyState + ':;' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                //alert(xhr.readyState + 'readystate');
                //alert(xhr.status + 'status');
                document.getElementById('loaddingimg').style.display = "none";
                //alert(this.responseText);
                callback(this.responseText);
            }

            if (xhr.readyState == 4 && xhr.status == 500) {
                //alert(xhr.status + 'status(500status)');
                localStorage.randgosessionid = null;
                localStorage.loginID = null;
                jAlert("The System is temporarily unavailable, please try again later.", 'Error');
                document.getElementById('loaddingimg').style.display = "none";

                prevPage = currentPage;
                $.mobile.changePage('#log', {
                    transition:  localStorage.transitiontype,
                    reverse: false,
                    changeHash: false
                });
                currentPage = 'log';
                pageData.push(currentPage);

            }
        };

        xhr.onerror = function (e) {
            localStorage.randgosessionid = null;
            localStorage.loginID = null;
            jAlert("The System is temporarily unavailable, please try again later.", 'Error');
            document.getElementById('loaddingimg').style.display = "none";

            prevPage = currentPage;
            $.mobile.changePage('#log', {
                transition:  localStorage.transitiontype,
                reverse: false,
                changeHash: false
            });
            currentPage = 'log';
            pageData.push(currentPage);
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
    } catch (ex) {
        // alert(ex + '::ca');
    }
}


function gotoWallet() {
    // alert("wallet");
    if (checkLogin()) {
        // alert("wallet");
        prevPage = currentPage;

        $.mobile.changePage('#indexwallet', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexwallet';
        pageData.push(currentPage);
    }
}
/*** DEC 6th ASHA ******/



function gotoBenifit() {
    // alert("bbbbbb");
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#indexbenefit', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexbenefit';
        pageData.push(currentPage);
         GetDisplayCategories();
    }
}

function gotoProfile() {
    if (checkLogin()) {
        // alert("ppppppp");
        prevPage = currentPage;


        $.mobile.changePage('#indexprofile', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexprofile';
        pageData.push(currentPage);

        document.getElementById('txtname').value = "";
        document.getElementById('txtsname').value = "";
        document.getElementById('txtemail').value = "";
        document.getElementById('txtcellno').value = "";
        document.getElementById('txtid').value = "";

         GetProfileDetails();
    }
}


function gotoHelp() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#indexhelp', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexhelp';
        pageData.push(currentPage);
    }
}



function gotoBalance() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#yourbalance', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'yourbalance';
        pageData.push(currentPage);
    }
    //Checkbalance();
}
/*********************Topup**************/
function gotoAddremove() {
    if (checkLogin()) {
        prevPage = currentPage;
        document.getElementById('txtcardnumber').value = "";
        document.getElementById('txtcardamt').value = "";
        document.getElementById('txtcardholder').value = "";
        document.getElementById('txtcvv').value = "";
        $.mobile.changePage('#addremove', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'addremove';
        pageData.push(currentPage);
    }
}
function gotoEft() {
    if (checkLogin()) {
        prevPage = currentPage;
        //document.getElementById('txtbank').value = "";
        //document.getElementById('txtbranch').value = "";
        //document.getElementById('txtacnum').value = "";
        $.mobile.changePage('#eftdetails', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'eftdetails';
        pageData.push(currentPage);
    }
}
function gotoTopupin() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#topupinstore', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'topupinstore';
        pageData.push(currentPage);
    }
}
/***************trdts**************************/
function gotoBills() {
    var paybill = document.getElementById('txtpay').value;
    var amount = document.getElementById('txtamt').value;
    if (paybill == "") {
        jAlert("Please enter pay bill number", 'Info');

        return false;
    }

    if (amount == "") {
        jAlert("Please enter amount", 'Info');


        return false;
    }
    return true;

} /*************************payUse**************************/
function gotoPaystore() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#payinstore', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'payinstore';
        pageData.push(currentPage);
    }
}
/*******BuyPrepaid**********/
function gotoAirtimePage() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#airtime', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'airtime';
        pageData.push(currentPage);
        //AirtimeList();
    }
}

function gotoElecPage() {
    prevPage = currentPage;
    document.getElementById('txtMeterNumber').value = "";
    document.getElementById('txtElectricityAmt').value = "";

    if (checkLogin()) {
        $.mobile.changePage('#electricity', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'electricity';
        pageData.push(currentPage);
    }
}

function gotoBillsPage() {
    if (checkLogin()) {
        prevPage = currentPage;
        document.getElementById('txtBillNumber').value = "";
        document.getElementById('txtBillAmount').value = "";
        $.mobile.changePage('#bills', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'bills';
        pageData.push(currentPage);
    }
}

/***** Wallet list page navigation ******/

function gotoPayFriend() {
    if (checkLogin()) {
        prevPage = currentPage;
        document.getElementById('txtfrnd').value = "";
        document.getElementById('txtfriendAmount').value = "";
        $.mobile.changePage('#payafriend', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'payafriend';
        pageData.push(currentPage);
    }
}

function gotoBuyPrepaid() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#buyprepaid', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'buyprepaid';
        pageData.push(currentPage);
    }
}

function gotoPayStore() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#payuse', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'payuse';
        pageData.push(currentPage);
    }
}

function gotoTopUp() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#topup', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'topup';
        pageData.push(currentPage);
    }
}



function gotoSlocator() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#storelocator', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        //provincestorelocator();
        currentPage = 'storelocator';
        pageData.push(currentPage);
    }
}

function gotoMyCoupons() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#mycoupons', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'mycoupons';
        pageData.push(currentPage);
        //MyCouponsList();
    }
}

/************my coupons***********************/
function gotopick() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#picknpay', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'picknpay';
        pageData.push(currentPage);
    }
}
/***********************coupons************************/
function gotocoupons() {
    if (checkLogin()) {
        var code = document.getElementById('txtcode').value;
        var date = document.getElementById('txtdate').value;
        if (code == "") {
            jAlert("Please enter Code", 'Info');
            return false;
        }
        if (date == "") {
            jAlert("Please enter date", 'Info');
            return false;
        }

        prevPage = currentPage;
        $.mobile.changePage('#transactionsuccessful', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'transactionsuccessful';
        pageData.push(currentPage);
    }
}
/*****************************picknpay***************************/
function gotopnp() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#coupons', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'coupons';
        pageData.push(currentPage);
    }
}
function gotowcd() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#productdtls', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'productdtls';
        pageData.push(currentPage);
    }
}
/**********************/

function submitData() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#storesinyrarea', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'storelocator';
        pageData.push(currentPage);

        var provinceID = document.getElementById('selectprovinceid').value;
        var cityID = document.getElementById('selectcityid').value;
        var suburbID = document.getElementById('selectsuburbid').value;

        //DisplayMerchantsDetails(provinceID, cityID, suburbID);

    }
}

function gotoTHistory() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#transactionhistory', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'transactionhistory';
        pageData.push(currentPage);
        //Airtimedenomlist();
    }
}
/***added 21/10/13 *****/
function gotoVodacom() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#vodacom', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'vodacom';
        pageData.push(currentPage);
        //Airtimedenomlist();
    }
}
function gotoairtimevoucher() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#avldenom', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'avldenom';
        pageData.push(currentPage);
        //Airtimedenomlist();
    }
}
function gotoavldenom() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#avldenom', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'avldenom';
        pageData.push(currentPage);
        //Airtimedenomlist();
    }
}
function gototransactiondetails() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#trdtls', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'trdtls';
        pageData.push(currentPage);
        //Airtimedenomlist();
    }
}
function login() {
    //alert("login");
    prevPage = currentPage;
    document.getElementById('txtLoginCellNumber').value = "";
    document.getElementById('txtLoginUserName').value = "";
    document.getElementById('txtLoginPassword').value = "";

    $.mobile.changePage('#log', {
        transition:  localStorage.transitiontype,
        reverse: false,
        changeHash: false
    });
    currentPage = 'log';
    pageData.push(currentPage);
}

function goToMainIndex() {

    prevPage = currentPage;
    $.mobile.changePage('#indexPage', {
        transition:  localStorage.transitiontype,
        reverse: true,
        changeHash: false
    });
    currentPage = 'indexPage';
    pageData.push(currentPage);
}

function LoginValidation() {
    var name = document.getElementById('txtLoginUserName').value;
    var pw = document.getElementById('txtLoginPassword').value;
    var cell = document.getElementById('txtLoginCellNumber').value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var checkbox1 = document.getElementById('chk');
    var pattern = /^\d{10}$/;
    var pwd = /^\d{5}$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var logunameexp = /^[A-Za-z ']*$/;
    var curimgsrc = document.getElementById('chkremember').src;
    if (cell == "") {
        jAlert("Please enter cell number", 'Info');
        document.txtcellnumber.focus();
        return false;
    }
    if (!cell.match(pattern) || !cell.match(phoneno)) {
        jAlert("Please enter 10 digit number", 'Info');
        return false;
    }

    //if (name == "") {
    //    jAlert("Please enter your Name", 'Info');
    //    document.txtusername.focus();
    //    return false;
    //}
    //if (!name.match(logunameexp)) {
    //    jAlert("Please enter valid username", 'Info');
    //    return false;
    //}
    if (pw == "") {
        jAlert("Please enter password", 'Info');
        document.txtpassword.focus();
        return false;
    }
    if (!pw.match(pwd)) {
        jAlert("Please 5 digit number", 'Info');
        return false;
    }
    //var checkbx = document.getElementById('chkremember');

    try {
        if (curimgsrc.indexOf('chkbxon.png') > 0) {
            localStorage.loginID = 1;
        } else if (curimgsrc.indexOf('chkbx.png') > 0) {
            localStorage.loginID = 0;
        }
    }
    catch (exp) {
        //alert(exp);
    }
    LogintoAllServices(cell, name, pw);


}





function goBack() {
    pageData.pop();
    currentPage = pageData[pageData.length - 1];
    $.mobile.changePage('#' + currentPage, {
        transition:  localStorage.transitiontype,
        reverse: true,
        changeHash: false
    });

}



function GetCity() {
    //citystorelocator(document.getElementById('selectprovinceid').value);

}

function GetSuburb() {
    //subrubstorelocator(document.getElementById('selectcityid').value);
}

function payfrnd() {


    var peernumber = document.getElementById('txtfrnd').value;
    var amount = document.getElementById('txtfriendAmount').value;

    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var pattern = /^\d{10}$/;

    if (peernumber == "") {
        jAlert("Please enter friend cell number", 'Info');
        return false;
    }
    if (!peernumber.match((pattern) || !peernumber.match(phoneno))) {
        jAlert("Please enter 10 digit  number", 'Info');
        return false;
    }


    if (amount == "") {
        jAlert("Please enter amount", 'Info');
        return false;
    }
    /*jConfirm('You are about to pay R ' + amount + ' to ' + peernumber + '. Are you sure you wish to proceed?', '', function (r) {
    if (r == true) {
    Peertopeer("", amount, peernumber, "", "", 1);
    }
    });*/
    openpopupPayfriend();
}


function helpqtnans(divid) {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#qtnanswers', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'qtnanswers';
        pageData.push(currentPage);

        document.getElementById('divhelpcontentquestion').innerHTML = helpdata[divid.id].question;
        document.getElementById('divhelpcontentanswer').innerHTML = helpdata[divid.id].answer;
    }
}

var opts = {
    lines: 13, // The number of lines to draw
    length: 12, // The length of each line
    width: 4, // The line thickness
    radius: 12, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 0.8, // Rounds per second
    trail: 67, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};



/*******************************************************************************
* PURPOSE : LOGIN FUNCTIONALITY AUTHOR : GEERVANI CREATED DATE : 26 JUN 2013
******************************************************************************/
function LogintoAllServices(cellnumber, username, password) {
    lusername = username;
    lpassword = password;
    lcellnumber = cellnumber;
    //user=localStorage.loginuser;
    // LOGIN TO EA SERVICES
    //    var eaInputData = '';
    //    eaInputData = '<?xml version="1.0" encoding="utf-8"?>';
    //    eaInputData = eaInputData
    //			+ '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    //    eaInputData = eaInputData + '<soap:Body>';
    //    eaInputData = eaInputData
    //			+ '<LogonAndRequestToken xmlns="https://api.europassistance.co.za/">';
    //    eaInputData = eaInputData + '<userName>DSGEA1</userName>';
    //    eaInputData = eaInputData + '<password>DSGEA1WS@456</password>';
    //    eaInputData = eaInputData + '<tokenGuid></tokenGuid>';
    //    eaInputData = eaInputData + '</LogonAndRequestToken>';
    //    eaInputData = eaInputData + '</soap:Body>';
    //    eaInputData = eaInputData + '</soap:Envelope>';

    //    CallWebService('https://api.europassistance.co.za/services/Utilities.asmx',
    //			eaInputData, 'POST', 'text/xml', EALoginCallBack);

    var logininputdata = "";
    logininputdata = '<?xml version="1.0" encoding="utf-8"?>';
    logininputdata = logininputdata + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    logininputdata = logininputdata + '<soap:Body>';
    logininputdata = logininputdata + '<Login xmlns="http://tempuri.org/">';
    logininputdata = logininputdata + '<CellNumber>' + cellnumber + '</CellNumber>';
    logininputdata = logininputdata + '<Password>' + password + '</Password>';
    logininputdata = logininputdata + '</Login>';
    logininputdata = logininputdata + '</soap:Body>';
    logininputdata = logininputdata + '</soap:Envelope>';
    CallWebService('http://118.139.160.226:8090/EuropeAssistStaticDataWS.asmx?op=Login', logininputdata, 'POST', 'text/xml', LoginCallback);

}


function LoginCallback(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');

        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");

            if (xmlDoc.getElementsByTagName("LoginResult")[0] != null) {
                localStorage.username = xmlDoc.getElementsByTagName("UserName")[0].textContent;
                localStorage.easessionid = '';  //xmlDoc.getElementsByTagName("EASessionID")[0].textContent;

                // LOGIN TO RANDGO SERVICES
                var randgoInputData = '';
                randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
                randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
                randgoInputData = randgoInputData + '<soap:Body>';
                randgoInputData = randgoInputData + '<Login xmlns="http://tempuri.org/">';
                randgoInputData = randgoInputData + '<lUserName>ws@europassistance</lUserName>';
                randgoInputData = randgoInputData + '<lPassword>e@s@ws</lPassword>';
                randgoInputData = randgoInputData + '</Login>';
                randgoInputData = randgoInputData + '</soap:Body>';
                randgoInputData = randgoInputData + '</soap:Envelope>';
                CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', RandoLoginCallBack);

            }
            else {
                jAlert("Login Failed");
                return false;
            }
        }
    }
    catch (exp) {
    }
}

function EALoginCallBack(responseData) {
    // LOGIN TO RANDGO SERVICES
    var randgoInputData = '';
    randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
    randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    randgoInputData = randgoInputData + '<soap:Body>';
    randgoInputData = randgoInputData + '<Login xmlns="http://tempuri.org/">';
    randgoInputData = randgoInputData + '<lUserName>ws@europassistance</lUserName>';
    randgoInputData = randgoInputData + '<lPassword>e@s@ws</lPassword>';
    randgoInputData = randgoInputData + '</Login>';
    randgoInputData = randgoInputData + '</soap:Body>';
    randgoInputData = randgoInputData + '</soap:Envelope>';



    CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', RandoLoginCallBack);

}

function RandoLoginCallBack(responseData) {
    // parse randgo Response Data

    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {

            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("status")[0] != null && xmlDoc.getElementsByTagName("status")[0].textContent !== "") {
                localStorage.randgosessionid = xmlDoc.getElementsByTagName("sessionid")[0].textContent;
                prevPage = currentPage;
                $.mobile.changePage('#indexservice', {
                    transition:  localStorage.transitiontype,
                    reverse: false,
                    changeHash: false
                });
                currentPage = 'indexservice';
                pageData.push(currentPage);
                $("#roadas, #legalas, #travelas,#medical,#hme,#medtb,#rdtb,#trtb,#assisth,#letb").show();
                $("#homeseperator").removeClass("middlecontent3");
                document.getElementById('divmm').className = "panelcollapsed";
                document.getElementById('divhm').className = "panelcollapsed";
                document.getElementById('divtr').className = "panelcollapsed";
                document.getElementById('divle').className = "panelcollapsed";
                document.getElementById('divrd').className = "panelcollapsed";
                //$("#divrd,#divle,#divtr,#divhm").show();
            }
        }
        else {
            jAlert("Login Failed. Invalid Username or password", 'Info');
            return false;
        }

    } catch (exp) {
    }
    // LOGIN TO wI SERVICES
    //var wiInputData = '';

    //wiInputData = 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    //wiInputData = wiInputData + '<loginrx>';
    //wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    //wiInputData = wiInputData + '<password>' + lpassword + '</password>';
    //wiInputData = wiInputData + '<mobilenum>' + lcellnumber + '</mobilenum>';
    //wiInputData = wiInputData + '<subscribertype>GENERAL</subscribertype>';
    //wiInputData = wiInputData + '</loginrx>';
    //wiInputData = wiInputData + '</wiapp>';

    //CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', wiLoginCallBack);
}

function wiLoginCallBack(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("sessionid")[0] != null) {
                localStorage.wisessionid = xmlDoc.getElementsByTagName("sessionid")[0].textContent;
                // localStorage.username = lusername;
                //prevPage = currentPage;
                //$.mobile.changePage('#indexservice', {
                //    transition:  localStorage.transitiontype,
                //    reverse: false,
                //    changeHash: false
                //});
                //currentPage = 'indexservice';
                //pageData.push(currentPage);
            } else {
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
                return false;
            }
        }
    } catch (exp) {

    }
}

function trdetails() {
    var airvalue = document.getElementById('txtair').value;
    var servicefee = document.getElementById('txtfee').value;
    var total = document.getElementById('txttotal').value;

    if (airvalue == "") {
        jAlert("Please enter airtime Value", 'Info');
        return false;
    }

    if (servicefee == "") {
        jAlert("Please enter serviceFee", 'Info');
        return false;
    }

    if (total == "") {
        jAlert("Please enter total", 'Info');
        return false;
    }

    jConfirm('You are about to purchase airtime. Are you sure you wish to proceed?', '', function (r) {
        if (r == true) {
            AirtimePurchase(denominationID, total, "");
        }
    });
}

function PayElectricityBills() {
    var met = document.getElementById('txtMeterNumber').value;
    var amount = document.getElementById('txtElectricityAmt').value;

    if (met == "") {
        jAlert("Please enter meter number", 'Info');
        return false;
    }

    if (amount == "") {
        jAlert("Please enter amount", 'Info');
        return false;
    }

    /*jConfirm('You are about to pay electricity bill. Are you sure you wish to proceed?', 'Confirm', function (r) {
    if (r == true) {
    ElectricityPurchase(met, amount);
    }
    });*/
    openpopupEcity();
}


function PayBills() {
    var bill = document.getElementById('txtBillNumber').value;
    var amount = document.getElementById('txtBillAmount').value;
    if (bill == "") {
        jAlert("Please enter account number", 'Info');
        return false;
    }

    if (amount == "") {
        jAlert("Please enter amount", 'Info');
        return false;
    }

    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#trdts', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'trdts';
        pageData.push(currentPage);
        //Airtimedenomlist();
    }
    //BillPayment(bill, amount);
}


function PayCardBills() {
    var card = document.getElementById('txtcardnumber').value;
    var amount = document.getElementById('txtcardamt').value;
    var cardholder = document.getElementById('txtcardholder').value;
    var expirydate = document.getElementById('txtexpiry').value;
    var cvv = document.getElementById('txtcvv').value;
    var dateformat = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
    var expiry = new Date(document.getElementById('txtexpiry').value);
    var currentdate = Date.now();
    var cardnameexp = /^[A-Za-z ']*$/;
    //var datetoday = currentdate.getDate();

    if (card == "") {
        jAlert("Please enter card number", 'Info');
        return false;
    }

    if (amount == "") {
        jAlert("Please enter amount", 'Info');
        return false;
    }
    else if (is_valid = !/^[0-9]+$/.test(amount)) {
        jAlert("Please enter valid amount", 'Info');
        return false;
    }

    if (cardholder == "") {
        jAlert("Please enter cardholder name", 'Info');
        return false;
    }
    if (!cardholder.match(cardnameexp)) {
        jAlert("Please enter valid cardholder name", 'Info');
        return false;
    }

    if (expirydate == "") {
        jAlert("Please enter expiry date", 'Info');
        return false;
    }
    if (!expirydate.match(dateformat)) {
        jAlert("Invalid date format", 'Info');
        return false;
    }
    if (expiry < currentdate) {
        jAlert("Exipry date should not be less than today's date", 'Info');
        return false;
    }

    if (cvv == "") {
        jAlert("Please enter CVV", 'Info');
        return false;
    }

    /* jConfirm('You are about to add a card. Are you sure you wish to proceed?', 'Confirm', function (r) {
    if (r == true) {
    TopUp(amount, card, cvv);
    }
    });*/
    openpopupAddRemove();
}

/*****************added21/10/2013**************************/
function payinstore() {
    var met = document.getElementById('txtcode').value;
    var amount = document.getElementById('txtdate').value;

    if (met == "") {
        jAlert("Please enter code", 'Info');
        return false;
    }

    if (amount == "") {
        jAlert("Please enter date", 'Info');
        return false;
    }

    /*jConfirm('You are about to pay electricity bill. Are you sure you wish to proceed?', 'Confirm', function (r) {
    if (r == true) {
    ElectricityPurchase(met, amount);
    }
    });*/
    openpopupPayStore();
}



function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
/*******check checklogin *********/
function checkLogin() {
    //localStorage.randgosessionid = 1;

    // alert(localStorage.loginID + '::' + localStorage.randgosessionid);
    if (localStorage.randgosessionid == undefined || localStorage.randgosessionid == null || localStorage.randgosessionid == 'undefined' || localStorage.randgosessionid == '' || localStorage.randgosessionid == "null") {
        // || localStorage.guid == undefined || localStorage.guid == 0 || localStorage.guid == null || localStorage.guid == ''
        //alert('sd');
        // if (localStorage.randgosessionid == undefined || localStorage.randgosessionid == null || localStorage.randgosessionid == "undefined" || localStorage.randgosessionid == 'undefined' || localStorage.randgosessionid == '' || localStorage.randgosessionid == "null" || localStorage.guid == undefined || localStorage.guid == 0 || localStorage.guid == null || localStorage.guid == '' || localStorage.guid == 'null' ){

        //  document.getElementById('txtLoginCellNumber').value = "";
        document.getElementById('txtLoginUserName').value = "";
        document.getElementById('txtLoginPassword').value = "";

        prevPage = currentPage;
        $.mobile.changePage('#log', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'log';
        pageData.push(currentPage);
        return false;
    } else {
        return true;
    }
    // return true;
}

function Transactions() {
    var airvalue = document.getElementById('txtair').value;
    var servicefee = document.getElementById('txtfee').value;
    var total = document.getElementById('txttotal').value;
    airvalue = airvalue.replace('R', '');
    servicefee = servicefee.replace('R', '');
    total = total.replace('R', '');
    if (airvalue == "") {
        jAlert("Please enter airtime Value", 'Info');
        return false;
    }

    if (servicefee == "") {
        jAlert("Please enter serviceFee", 'Info');
        return false;
    }

    if (total == "") {
        jAlert("Please enter total", 'Info');

        return false;
    }

    /*jConfirm('You are about to purchare airtime. Are you sure you wish to proceed?', '', function (r) {
    if (r == true) {
    AirtimePurchase(denominationID, total, "");
    }
    });*/
    openpopupTdtls();
}

function GetMoreInfo(pageType) {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#clickformoreinfo', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'clickformoreinfo';
        pageData.push(currentPage);
        document.getElementById('divhomeassist').style.display = 'none';
        document.getElementById('divmediassist').style.display = 'none';
        document.getElementById('divroadassist').style.display = 'none';
        document.getElementById('legaldiv').style.display = 'none';
        document.getElementById('traveldiv').style.display = 'none';

        if (pageType == "Home") {
            document.getElementById('divhomeassist').style.display = 'block';
        } else if (pageType == "Medical") {
            document.getElementById('divmediassist').style.display = 'block';
        } else if (pageType == "Road") {
            document.getElementById('divroadassist').style.display = 'block';
        } else if (pageType == "Legal") {
            document.getElementById('legaldiv').style.display = 'block';
        } else if (pageType == "Travel") {
            document.getElementById('traveldiv').style.display = 'block';
        }
    }
}


function isLoggedIn() {
    if (localStorage.wisessionid != null && localStorage.wisessionid != undefined && localStorage.randgosessionid != undefined || localStorage.randgosessionid != null) {

        prevPage = currentPage;
        $.mobile.changePage('#indexservice', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexservice';
        pageData.push(currentPage);
        /*event.preventDefault();
        $("body").fadeOut(500, function () {
        window.location.href = "../Services/indexservices.html";
        });*/
    }
}

/************************************profile*******************************/
function validation() {

    var name1 = document.getElementById('txtname').value;
    var sname = document.getElementById('txtsname').value;
    var email = document.getElementById('txtemail').value;
    var cell = document.getElementById('txtcellno').value;
    var id = document.getElementById('txtid').value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var checkbox1 = document.getElementById('chk');
    var pattern = /^\d{10}$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var profileunameexp = /^[A-Za-z ']*$/;
    var pinnew = document.getElementById('txtnewpin').value;
    var pinconfirm = document.getElementById('txtconpin').value;
    //if (name1 == "") {
    //    jAlert("Please enter your Name", " ");
    //    document.txtname.focus();
    //    return false;
    //}
    //if (!name1.match(profileunameexp)) {
    //    jAlert("Please enter valid name", "Info ");
    //    return false;
    //}

    //if (sname == "") {
    //    jAlert("Please enter your surname", "Info ");
    //    document.txtsname.focus();
    //    return false;
    //}
    //if (!sname.match(profileunameexp)) {
    //    jAlert("Please enter valid surname", "Info ");
    //    return false;
    //}
    //if (email == "") {
    //    jAlert("Please enter Email", " ");
    //    return false;
    //}
    //if (email.indexOf("@", 0) < 0) {
    //    jAlert("Please enter a valid email address", " Info");

    //    email.focus();
    //    return false;
    //}

    //if (email.indexOf(".", 0) < 0) {
    //    jAlert("Please enter a valid email address", "Info ");
    //    email.focus();
    //    return false;
    //}

    //if (cell == "") {
    //    jAlert("Please enter cell number", "Info ");
    //    return false;
    //}
    //if (!cell.match(pattern) || !cell.match(phoneno)) {
    //    jAlert("Please enter 10 digit number", "Info");

    //    return false;
    //}
    //if (id == "") {
    //    jAlert("Please enter your ID", "Info ");


    //    document.txtid.focus();
    //    return false;
    //}
    //if (isNaN(id) || id.indexOf(" ") != -1) {
    //    jAlert("Enter numeric value", " ");

    //    return false;
    //}
    if (pinnew == "") {
        jAlert("Please enter your pin", "Info ");
        return false;
    }
    if (pinconfirm == "") {
        jAlert("Please confirm pin", "Info ");
        return false;
    }
    if (pinnew != pinconfirm) {
        jAlert("Pin mismatch", "Info ");
        return false;
    }
    ProfileChangepin(pinnew);
}
function GetProfileDetails() {
    //alert(localStorage.username);
    var profileinputdata = '';
    profileinputdata = '<?xml version="1.0" encoding="utf-8"?>';
    profileinputdata = profileinputdata + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    profileinputdata = profileinputdata + ' <soap:Body>';
    profileinputdata = profileinputdata + '<GetProfileDetails xmlns="http://tempuri.org/">';
    profileinputdata = profileinputdata + '<username>' + localStorage.username + '</username>';
    profileinputdata = profileinputdata + '</GetProfileDetails>';
    profileinputdata = profileinputdata + '</soap:Body>';
    profileinputdata = profileinputdata + '</soap:Envelope>';
    CallWebService('http://118.139.160.226:8079/EuropeAssistStaticDataWS.asmx?op=GetProfileDetails', profileinputdata, 'POST', 'text/xml', GetProfileDetailsCallBack);
}
function GetProfileDetailsCallBack(responseData) {
    try {
        // alert(responseData);
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("ProfileData") != null && xmlDoc.getElementsByTagName("ProfileData").length > 0) {
                document.getElementById('txtname').value = xmlDoc.getElementsByTagName("FirstName")[0].textContent;
                document.getElementById('txtsname').value = xmlDoc.getElementsByTagName("LastName")[0].textContent;
                document.getElementById('txtid').value = xmlDoc.getElementsByTagName("IDNumber")[0].textContent;
                document.getElementById('txtcellno').value = xmlDoc.getElementsByTagName("CellNumber")[0].textContent;
                document.getElementById('txtemail').value = xmlDoc.getElementsByTagName("EMAILID")[0].textContent;
                document.getElementById('oldpin').value = xmlDoc.getElementsByTagName("Password")[0].textContent;

            }
            else {
                jAlert('No Data found', 'Info');
            }
        }
    }
    catch (exp) {
        // alert("exp::::::profilepage:::::"+exp);
    }
}
/********************************ChangePIN*****************************/
function ProfileChangepin(Newpin) {
    var changepinInputdata = "";

    var oldpin = document.getElementById('oldpin').value;

    changepinInputdata = '<?xml version="1.0" encoding="utf-8"?>';
    changepinInputdata = changepinInputdata + '<subchangepasswordrx>';
    changepinInputdata = changepinInputdata + '<username>' + localStorage.username + '</username>';
    changepinInputdata = changepinInputdata + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    changepinInputdata = changepinInputdata + '<oldpassword>' + oldpin + '</oldpassword>';
    changepinInputdata = changepinInputdata + '<newpassword>' + Newpin + '</newpassword>';
    changepinInputdata = changepinInputdata + '</subchangepasswordrx>';
    changepinInputdata = changepinInputdata + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', changepinInputdata, 'POST', 'application/x-www-form-urlencoded', ProfileChangepinCallback);
}
function ProfileChangepinCallback(responseData) {
    //alert(responseData);
    try {
    }
    catch (exp) {

    }
}
/*******************************Accept Terms and Conditions**********/
function gototerms() {
    prevPage = currentPage;
    $.mobile.changePage('#terms', {
        transition:  localStorage.transitiontype,
        reverse: false,
        changeHash: false
    });
    currentPage = 'terms';
    pageData.push(currentPage);
}

/********************************pin**************************************/
function PinValidation() {
    var createpn = document.getElementById('txtcreate').value;
    var confirmpn = document.getElementById('txtconfirm').value;
    var pinlength = /^\d{5}$/;
    if (createpn == "") {
        jAlert("Please enter your pin", "Info ");
        return false;
    }
    if (!createpn.match(pinlength)) {
        jAlert("Please enter 5 digit pin", "Info ");
        return false;
    }
    if (confirmpn == "") {
        jAlert("Confirm your pin", "Info ");
        return false;
    }
    if (!confirmpn.match(pinlength)) {
        jAlert("Please enter 5 digit pin", "Info ");
        return false;
    }
    if (createpn != confirmpn) {
        jAlert("Pin mismatch", "Info ");
        return false;
    }

    var name = document.getElementById('txtRegName').value;
    var sname = document.getElementById('txtRegSurName').value;
    var email = document.getElementById('txtRegEmail').value;
    var cell = document.getElementById('txtRegCell').value;
    var id = document.getElementById('txtRegIDNo').value;
    var uname = document.getElementById('txtRegUserName').value;
    var pw = document.getElementById('txtRegPassword').value;

    //$.mobile.changePage('#indexservice', {
    //    transition:  localStorage.transitiontype,
    //    reverse: false,
    //    changeHash: false
    //});
    //currentPage = 'indexservice';
    var inputData = '<?xml version="1.0" encoding="utf-8"?>';
    inputData = inputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    inputData = inputData + '<soap:Body>';
    inputData = inputData + '<RegisterUser xmlns="http://tempuri.org/">';
    inputData = inputData + '<Name>' + name + '</Name>';
    inputData = inputData + '<Surname>' + sname + '</Surname>';
    inputData = inputData + '<CellNumber>' + cell + '</CellNumber>';
    inputData = inputData + '<Password>' + pw + '</Password>';
    inputData = inputData + '<IdNumber>' + id + '</IdNumber>';
    inputData = inputData + '<EmailID>' + email + '</EmailID>';
    inputData = inputData + '</RegisterUser>';
    inputData = inputData + '</soap:Body>';
    inputData = inputData + '</soap:Envelope>';
    CallWebService('http://118.139.160.226:8090/EuropeAssistStaticDataWS.asmx?op=RegisterUser', inputData, 'POST', 'text/xml', RegisterUserCallback);
    ImportMembers(name, sname, pw, email, cell, id);
}
/***********************Import Members***********************/
function ImportMembers(name, sname, pw, email, cell, id) {

    var inputData = "";
    inputData = '<?xml version="1.0" encoding="utf-8"?>';
    inputData = inputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    inputData = inputData + '<soap:Body>';
    inputData = inputData + '<ImportMembers xmlns="https://api.europassistance.co.za/">';
    inputData = inputData + '<tokenGuid></tokenGuid>';
    inputData = inputData + '<validateOnly></validateOnly>';
    inputData = inputData + '<testOnly></testOnly>';
    inputData = inputData + '<clientSchemeGuid></clientSchemeGuid>';
    inputData = inputData + '<memberList>';
    inputData = inputData + '<MemberImport>';
    inputData = inputData + '<Policy_PolicyNo></Policy_PolicyNo>';
    inputData = inputData + '<Policy_AltPolicyNo></Policy_AltPolicyNo>';
    inputData = inputData + '<Policy_InceptionDate></Policy_InceptionDate>';
    inputData = inputData + '<Policy_EffectiveDate></Policy_EffectiveDate>';
    inputData = inputData + '<Policy_CancelledDate></Policy_CancelledDate>';
    inputData = inputData + '<Policy_Nationality></Policy_Nationality>';
    inputData = inputData + '<PolicyMember_EffectiveDate></PolicyMember_EffectiveDate>';
    inputData = inputData + '<PolicyMember_CancelledDate></PolicyMember_CancelledDate>';
    inputData = inputData + '<PolicyMember_IsMainMember></PolicyMember_IsMainMember>';
    inputData = inputData + '<PolicyMember_DepCode>string</PolicyMember_DepCode>';
    inputData = inputData + '<Member_Title></Member_Title>';
    inputData = inputData + '<Member_Initials></Member_Initials>';
    inputData = inputData + '<Member_Name>' + name + '</Member_Name>';
    inputData = inputData + '<Member_Surname>' + sname + '</Member_Surname>';
    inputData = inputData + '<Member_IDNumber>' + id + '</Member_IDNumber>';
    inputData = inputData + '<Member_PassportNumber></Member_PassportNumber>';
    inputData = inputData + '<Member_DOB></Member_DOB>';
    inputData = inputData + '<Member_TelephoneHome></Member_TelephoneHome>';
    inputData = inputData + '<Member_TelephoneWork></Member_TelephoneWork>';
    inputData = inputData + '<Member_Fax></Member_Fax>';
    inputData = inputData + '<Member_Mobile>' + cell + '</Member_Mobile>';
    inputData = inputData + '<Member_Email>' + email + '</Member_Email>';
    inputData = inputData + '<Member_Gender></Member_Gender>';
    inputData = inputData + '<MemberAddress_PostalAddress></MemberAddress_PostalAddress>';
    inputData = inputData + '<MemberAddress_PostalPostalCode></MemberAddress_PostalPostalCode>';
    inputData = inputData + '<MemberAddress_PostalSuburb></MemberAddress_PostalSuburb>';
    inputData = inputData + '<MemberAddress_PostalTown></MemberAddress_PostalTown>';
    inputData = inputData + '<MemberAddress_PostalProvince></MemberAddress_PostalProvince>';
    inputData = inputData + '<MemberAddress_PostalCountry></MemberAddress_PostalCountry>';
    inputData = inputData + '<MemberAddress_PhysicalStreet></MemberAddress_PhysicalStreet>';
    inputData = inputData + '<MemberAddress_PhysicalAddress></MemberAddress_PhysicalAddress>';
    inputData = inputData + '<MemberAddress_PhysicalPostalCode></MemberAddress_PhysicalPostalCode>';
    inputData = inputData + '<MemberAddress_PhysicalSuburb></MemberAddress_PhysicalSuburb>';
    inputData = inputData + '<MemberAddress_PhysicalTown></MemberAddress_PhysicalTown>';
    inputData = inputData + '<MemberAddress_PhysicalProvince></MemberAddress_PhysicalProvince>';
    inputData = inputData + '<MemberAddress_PhysicalCountry></MemberAddress_PhysicalCountry>';
    inputData = inputData + '<IsRiskAddress></IsRiskAddress>';
    inputData = inputData + '<PolicyVehicle_RegistrationNumber></PolicyVehicle_RegistrationNumber>';
    inputData = inputData + '<PolicyVehicle_Make></PolicyVehicle_Make>';
    inputData = inputData + '<PolicyVehicle_Model></PolicyVehicle_Model>';
    inputData = inputData + '<PolicyVehicle_Year></PolicyVehicle_Year>';
    inputData = inputData + '<PolicyVehicle_Color></PolicyVehicle_Color>';
    inputData = inputData + '<PolicyVehicle_VIN></PolicyVehicle_VIN>';
    inputData = inputData + '<PolicyVehicle_EffectiveDate></PolicyVehicle_EffectiveDate>';
    inputData = inputData + '<PolicyVehicle_CancelledDate></PolicyVehicle_CancelledDate>';
    inputData = inputData + '<Policy_Excess></Policy_Excess>';
    inputData = inputData + '<PolicyRiskAddress_EffectiveDate></PolicyRiskAddress_EffectiveDate>';
    inputData = inputData + '<PolicyRiskAddress_CancelledDate></PolicyRiskAddress_CancelledDate>';
    inputData = inputData + '<Policy_Field1></Policy_Field1>';
    inputData = inputData + '<Policy_Field2></Policy_Field2>';
    inputData = inputData + '<PolicyMember_Field1></PolicyMember_Field1>';
    inputData = inputData + '<PolicyMember_Field2></PolicyMember_Field2>';
    inputData = inputData + '<PolicyVehicle_Field1></PolicyVehicle_Field1>';
    inputData = inputData + '<PolicyVehicle_Field2></PolicyVehicle_Field2>';
    inputData = inputData + '<PolicyRiskAddress_Field1></PolicyRiskAddress_Field1>';
    inputData = inputData + '<PolicyRiskAddress_Field2></PolicyRiskAddress_Field2>';
    inputData = inputData + '<IncludedCsProdLifetimeKeysCsv></IncludedCsProdLifetimeKeysCsv>';
    inputData = inputData + '</MemberImport>';
    inputData = inputData + '<MemberImport>';
    inputData = inputData + '<Policy_PolicyNo></Policy_PolicyNo>';
    inputData = inputData + '<Policy_AltPolicyNo></Policy_AltPolicyNo>';
    inputData = inputData + '<Policy_InceptionDate></Policy_InceptionDate>';
    inputData = inputData + '<Policy_EffectiveDate></Policy_EffectiveDate>';
    inputData = inputData + '<Policy_CancelledDate></Policy_CancelledDate>';
    inputData = inputData + '<Policy_Nationality></Policy_Nationality>';
    inputData = inputData + '<PolicyMember_EffectiveDate></PolicyMember_EffectiveDate>'
    inputData = inputData + '<PolicyMember_CancelledDate></PolicyMember_CancelledDate>';
    inputData = inputData + '<PolicyMember_IsMainMember></PolicyMember_IsMainMember>';
    inputData = inputData + '<PolicyMember_DepCode></PolicyMember_DepCode>'
    inputData = inputData + '<Member_Title></Member_Title>';
    inputData = inputData + '<Member_Initials></Member_Initials>';
    inputData = inputData + '<Member_Name></Member_Name>';
    inputData = inputData + '<Member_Surname></Member_Surname>';
    inputData = inputData + '<Member_IDNumber></Member_IDNumber>'
    inputData = inputData + '<Member_PassportNumber></Member_PassportNumber>'
    inputData = inputData + '<Member_DOB>dateTime</Member_DOB>';
    inputData = inputData + '<Member_TelephoneHome></Member_TelephoneHome>';
    inputData = inputData + '<Member_TelephoneWork></Member_TelephoneWork>';
    inputData = inputData + '<Member_Fax></Member_Fax>';
    inputData = inputData + '<Member_Mobile></Member_Mobile>';
    inputData = inputData + '<Member_Email></Member_Email>';
    inputData = inputData + '<Member_Gender></Member_Gender>';
    inputData = inputData + '<MemberAddress_PostalAddress></MemberAddress_PostalAddress>';
    inputData = inputData + '<MemberAddress_PostalPostalCode></MemberAddress_PostalPostalCode>';
    inputData = inputData + '<MemberAddress_PostalSuburb></MemberAddress_PostalSuburb>';
    inputData = inputData + '<MemberAddress_PostalTown></MemberAddress_PostalTown>';
    inputData = inputData + '<MemberAddress_PostalProvince></MemberAddress_PostalProvince>';
    inputData = inputData + '<MemberAddress_PostalCountry></MemberAddress_PostalCountry>';
    inputData = inputData + '<MemberAddress_PhysicalStreet></MemberAddress_PhysicalStreet>';
    inputData = inputData + '<MemberAddress_PhysicalAddress></MemberAddress_PhysicalAddress>';
    inputData = inputData + '<MemberAddress_PhysicalPostalCode></MemberAddress_PhysicalPostalCode>';
    inputData = inputData + '<MemberAddress_PhysicalSuburb></MemberAddress_PhysicalSuburb>';
    inputData = inputData + '<MemberAddress_PhysicalTown></MemberAddress_PhysicalTown>';
    inputData = inputData + '<MemberAddress_PhysicalProvince></MemberAddress_PhysicalProvince>';
    inputData = inputData + '<MemberAddress_PhysicalCountry></MemberAddress_PhysicalCountry>';
    inputData = inputData + '<IsRiskAddress></IsRiskAddress>';
    inputData = inputData + '<PolicyVehicle_RegistrationNumber></PolicyVehicle_RegistrationNumber>';
    inputData = inputData + '<PolicyVehicle_Make></PolicyVehicle_Make>';
    inputData = inputData + '<PolicyVehicle_Model></PolicyVehicle_Model>';
    inputData = inputData + '<PolicyVehicle_Year></PolicyVehicle_Year>';
    inputData = inputData + '<PolicyVehicle_Color></PolicyVehicle_Color>';
    inputData = inputData + '<PolicyVehicle_VIN></PolicyVehicle_VIN>';
    inputData = inputData + '<PolicyVehicle_EffectiveDate></PolicyVehicle_EffectiveDate>';
    inputData = inputData + '<PolicyVehicle_CancelledDate></PolicyVehicle_CancelledDate>';
    inputData = inputData + '<Policy_Excess>string</Policy_Excess>';
    inputData = inputData + '<PolicyRiskAddress_EffectiveDate></PolicyRiskAddress_EffectiveDate>';
    inputData = inputData + '<PolicyRiskAddress_CancelledDate></PolicyRiskAddress_CancelledDate>';
    inputData = inputData + '<Policy_Field1></Policy_Field1>';
    inputData = inputData + '<Policy_Field2></Policy_Field2>';
    inputData = inputData + '<PolicyMember_Field1></PolicyMember_Field1>';
    inputData = inputData + '<PolicyMember_Field2></PolicyMember_Field2>';
    inputData = inputData + '<PolicyVehicle_Field1></PolicyVehicle_Field1>';
    inputData = inputData + '<PolicyVehicle_Field2></PolicyVehicle_Field2>';
    inputData = inputData + '<PolicyRiskAddress_Field1></PolicyRiskAddress_Field1>';
    inputData = inputData + '<PolicyRiskAddress_Field2></PolicyRiskAddress_Field2>';
    inputData = inputData + '<IncludedCsProdLifetimeKeysCsv></IncludedCsProdLifetimeKeysCsv>';
    inputData = inputData + '</MemberImport>';
    inputData = inputData + '</memberList>';
    inputData = inputData + '<importFeedback>';
    inputData = inputData + '<RowsReceived></RowsReceived>';
    inputData = inputData + '<RowsImported></RowsImported>';
    inputData = inputData + '<RowsWithErrors></RowsWithErrors>';
    inputData = inputData + '<RowsWithWarnings></RowsWithWarnings>';
    inputData = inputData + '<ImportBatchGuid></ImportBatchGuid>';
    inputData = inputData + '<ExceptionsList>';
    inputData = inputData + '<MemberImportExceptions>';
    inputData = inputData + '<Key></Key>';
    inputData = inputData + '<KeyValue></KeyValue>';
    inputData = inputData + '<Notification></Notification>';
    inputData = inputData + '<NotificationType></NotificationType>'
    inputData = inputData + '<ActionTaken></ActionTaken>';
    inputData = inputData + '</MemberImportExceptions>';
    inputData = inputData + '<MemberImportExceptions>';
    inputData = inputData + '<Key></Key>';
    inputData = inputData + '<KeyValue></KeyValue>';
    inputData = inputData + '<Notification></Notification>';
    inputData = inputData + '<NotificationType></NotificationType>';
    inputData = inputData + '<ActionTaken></ActionTaken>';
    inputData = inputData + '</MemberImportExceptions>'
    inputData = inputData + '</ExceptionsList>';
    inputData = inputData + '</importFeedback>';
    inputData = inputData + '</ImportMembers>';
    inputData = inputData + '</soap:Body>';
    inputData = inputData + '</soap:Envelope>';
    //inputData = inputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    //inputData = inputData + '<soap:Body>';
    //inputData = inputData + '<ImportMembers xmlns="https://api.europassistance.co.za/">';
    //inputData = inputData + '<tokenGuid></tokenGuid>';
    //inputData = inputData + '<validateOnly>false</validateOnly>';
    //inputData = inputData + '<testOnly>false</testOnly>';
    //inputData = inputData + '<clientSchemeGuid></clientSchemeGuid>';
    //inputData = inputData + '<memberList>';
    //inputData = inputData + '<MemberImport>';
    //inputData = inputData + '<Policy_PolicyNo></Policy_PolicyNo>';
    //inputData = inputData + '<Policy_AltPolicyNo></Policy_AltPolicyNo>';
    //inputData = inputData + '<Policy_InceptionDate></Policy_InceptionDate>';
    //inputData = inputData + '<Policy_EffectiveDate></Policy_EffectiveDate>';
    //inputData = inputData + '<Policy_CancelledDate></Policy_CancelledDate>';
    //inputData = inputData + '<Policy_Nationality></Policy_Nationality>';
    //inputData = inputData + '<PolicyMember_EffectiveDate></PolicyMember_EffectiveDate>';
    //inputData = inputData + '<PolicyMember_CancelledDate></PolicyMember_CancelledDate>';
    //inputData = inputData + '<PolicyMember_IsMainMember></PolicyMember_IsMainMember>';
    //inputData = inputData + '<PolicyMember_DepCode></PolicyMember_DepCode>';
    //inputData = inputData + '<Member_Title></Member_Title>';
    //inputData = inputData + '<Member_Initials></Member_Initials>';
    //inputData = inputData + '<Member_Name>' + name + '</Member_Name>';
    //inputData = inputData + '<Member_Surname>' + sname + '</Member_Surname>';
    //inputData = inputData + '<Member_IDNumber>' + id + '</Member_IDNumber>';
    //inputData = inputData + '<Member_PassportNumber></Member_PassportNumber>';
    //inputData = inputData + '<Member_DOB></Member_DOB>';
    //inputData = inputData + '<Member_TelephoneHome></Member_TelephoneHome>';
    //inputData = inputData + '<Member_TelephoneWork></Member_TelephoneWork>';
    //inputData = inputData + '<Member_Fax></Member_Fax>';
    //inputData = inputData + '<Member_Mobile>' + cell + '</Member_Mobile>';
    //inputData = inputData + '<Member_Email>' + email + '</Member_Email>';
    //inputData = inputData + '<Member_Gender></Member_Gender>';
    //inputData = inputData + '<MemberAddress_PostalAddress></MemberAddress_PostalAddress>';
    //inputData = inputData + '<MemberAddress_PostalPostalCode></MemberAddress_PostalPostalCode>';
    //inputData = inputData + '<MemberAddress_PostalSuburb></MemberAddress_PostalSuburb>';
    //inputData = inputData + '<MemberAddress_PostalTown></MemberAddress_PostalTown>';
    //inputData = inputData + '<MemberAddress_PostalProvince></MemberAddress_PostalProvince>';
    //inputData = inputData + '<MemberAddress_PostalCountry></MemberAddress_PostalCountry>';
    //inputData = inputData + '<MemberAddress_PhysicalStreet></MemberAddress_PhysicalStreet>';
    //inputData = inputData + '<MemberAddress_PhysicalAddress></MemberAddress_PhysicalAddress>';
    //inputData = inputData + '<MemberAddress_PhysicalPostalCode></MemberAddress_PhysicalPostalCode>';
    //inputData = inputData + '<MemberAddress_PhysicalSuburb></MemberAddress_PhysicalSuburb>';
    //inputData = inputData + '<MemberAddress_PhysicalTown></MemberAddress_PhysicalTown>';
    //inputData = inputData + '<MemberAddress_PhysicalProvince></MemberAddress_PhysicalProvince>';
    //inputData = inputData + '<MemberAddress_PhysicalCountry></MemberAddress_PhysicalCountry>';
    //inputData = inputData + '<IsRiskAddress></IsRiskAddress>';
    //inputData = inputData + '<PolicyVehicle_RegistrationNumber></PolicyVehicle_RegistrationNumber>';
    //inputData = inputData + '<PolicyVehicle_Make></PolicyVehicle_Make>';
    //inputData = inputData + '<PolicyVehicle_Model></PolicyVehicle_Model>';
    //inputData = inputData + '<PolicyVehicle_Year></PolicyVehicle_Year>';
    //inputData = inputData + '<PolicyVehicle_Color></PolicyVehicle_Color>';
    //inputData = inputData + '<PolicyVehicle_VIN></PolicyVehicle_VIN>';
    //inputData = inputData + '<PolicyVehicle_EffectiveDate></PolicyVehicle_EffectiveDate>';
    //inputData = inputData + '<PolicyVehicle_CancelledDate></PolicyVehicle_CancelledDate>';
    //inputData = inputData + '<Policy_Excess></Policy_Excess>';
    //inputData = inputData + '<PolicyRiskAddress_EffectiveDate></PolicyRiskAddress_EffectiveDate>';
    //inputData = inputData + '<PolicyRiskAddress_CancelledDate></PolicyRiskAddress_CancelledDate>';
    //inputData = inputData + '<Policy_Field1></Policy_Field1>';
    //inputData = inputData + '<Policy_Field2></Policy_Field2>';
    //inputData = inputData + '<PolicyMember_Field1></PolicyMember_Field1>';
    //inputData = inputData + '<PolicyMember_Field2></PolicyMember_Field2>';
    //inputData = inputData + '<PolicyVehicle_Field1></PolicyVehicle_Field1>';
    //inputData = inputData + '<PolicyVehicle_Field2></PolicyVehicle_Field2>';
    //inputData = inputData + '<PolicyRiskAddress_Field1></PolicyRiskAddress_Field1>';
    //inputData = inputData + '<PolicyRiskAddress_Field2></PolicyRiskAddress_Field2>';
    //inputData = inputData + '<IncludedCsProdLifetimeKeysCsv></IncludedCsProdLifetimeKeysCsv>';
    //inputData = inputData + '</MemberImport>';
    //inputData = inputData + '</memberList>';
    //inputData = inputData + '<importFeedback>';
    //inputData = inputData + '<RowsReceived></RowsReceived>';
    //inputData = inputData + '<RowsImported></RowsImported>';
    //inputData = inputData + '<RowsWithErrors></RowsWithErrors>';
    //inputData = inputData + '<RowsWithWarnings></RowsWithWarnings>';
    //inputData = inputData + '<ImportBatchGuid></ImportBatchGuid>';
    //inputData = inputData + '<ExceptionsList>';
    //inputData = inputData + '<MemberImportExceptions>';
    //inputData = inputData + '<Key></Key>';
    //inputData = inputData + '<KeyValue></KeyValue>';
    //inputData = inputData + '<Notification></Notification>';
    //inputData = inputData + '<NotificationType></NotificationType>';
    //inputData = inputData + '<ActionTaken></ActionTaken>';
    //inputData = inputData + '</MemberImportExceptions>';
    //inputData = inputData + '<MemberImportExceptions>';
    //inputData = inputData + '<Key></Key>';
    //inputData = inputData + '<KeyValue></KeyValue>';
    //inputData = inputData + '<Notification></Notification>';
    //inputData = inputData + '<NotificationType></NotificationType>';
    //inputData = inputData + '<ActionTaken></ActionTaken>';
    //inputData = inputData + '</MemberImportExceptions>';
    //inputData = inputData + '</ExceptionsList>';
    //inputData = inputData + '</importFeedback>';
    //inputData = inputData + '</ImportMembers>';
    //inputData = inputData + '</soap:Body>';
    //inputData = inputData + '</soap:Envelope>';
    CallWebService('https://api.europassistance.co.za/Services/Importer/Imports.asmx', inputData, 'POST', 'text/xml', ImportMembersCallback);
    //alert(inputData +'inputdata');
}
function ImportMembersCallback(responseData) {
    //alert(responseData + 'responseData');

    try {
        prevPage = currentPage;
        $.mobile.changePage('#log', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'log';
        pageData.push(currentPage);
    }
    catch (exp) {
        //alert(exp);
    }
}
/***********18/10/2013*************/
function checkremember() {
    //alert("localStorage.dfs::::::" + localStorage.loginID)
    //alert("llllk");
    //localStorage.loginID =1;
    if (localStorage.randgosessionid == undefined || localStorage.randgosessionid == null || localStorage.randgosessionid == "null" || localStorage.randgosessionid == 'undefined' || localStorage.randgosessionid == '' || localStorage.randgosessionid == " " || localStorage.loginID == null || localStorage.loginID == undefined || localStorage.loginID == 0) {
        //alert("i" + localStorage.loginID);
        localStorage.randgosessionid = null;
        prevPage = currentPage;
        $.mobile.changePage('#indexPage', {
            transition:  localStorage.transitiontype,
            reverse: true,
            changeHash: false
        });
        currentPage = 'indexPage';
        pageData.push(currentPage);
    }
    else if (localStorage.loginID == 1) {

        gotoService();

    }
}

/* ****** ASHA DEC 3/12/2013 ******* */

function EALoginValidation() {

    var name = document.getElementById('txtLoginUserName').value;
    var pw = document.getElementById('txtLoginPassword').value;
    var cell = document.getElementById('txtLoginCellNumber').value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var checkbox1 = document.getElementById('chk');
    var pattern = /^\d{10}$/;
    var pwd = /^\d{5}$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var logunameexp = /^[A-Za-z ']*$/;
    var curimgsrc = document.getElementById('chkremember').src;

    if (name == "") {
        jAlert("Please enter your UserName!", 'Info');
        document.txtusername.focus();
        return false;
    }
    else if (pw == "") {
        jAlert("Please enter Password!", 'Info');
        document.txtpassword.focus();
        return false;
    }

    try {
        if (curimgsrc.indexOf('chkbxon.png') > 0) {
            localStorage.loginID = 1;
        } else if (curimgsrc.indexOf('chkbx.png') > 0) {
            localStorage.loginID = 0;
        }
    }
    catch (exp) {
        //  alert(exp);
    }

    MYLogintoAllServices(name, pw);

}


// function MYLogintoAllServices(username, password,tguid) {
function MYLogintoAllServices(username, password) {
    var eaLoginInputData = "";
    eaLoginInputData = '<?xml version="1.0" encoding="utf-8"?>';
    eaLoginInputData = eaLoginInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    eaLoginInputData = eaLoginInputData + '<soap:Body>';
    eaLoginInputData = eaLoginInputData + '<MobileUserLogin xmlns="http://tempuri.org/">';
    eaLoginInputData = eaLoginInputData + '<Username>' + username + '</Username>';
    eaLoginInputData = eaLoginInputData + '<Password>' + password + '</Password>';
    eaLoginInputData = eaLoginInputData + '</MobileUserLogin>';
    eaLoginInputData = eaLoginInputData + '</soap:Body>';
    eaLoginInputData = eaLoginInputData + '</soap:Envelope>';
    CallWebService('http://118.139.160.226:8079/EuropeAssistStaticDataWS.asmx?op=MobileUserLogin', eaLoginInputData, 'POST', 'text/xml', MYLogintoAllServicesCallBack);

}
function MYLogintoAllServicesCallBack(responseData) {
    try {
        //  alert("EALogintoAllServicesCallBack:::::::::" + responseData);
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            // alert("::::::" + xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0] + '::' + xmlDoc.getElementsByTagName("MESSAGE")[0]);
            if (xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0] == undefined) {
                // alert("service page" + xmlDoc.getElementsByTagName("mobileUserGuid")[0].childNodes[0].nodeValue + '::' + xmlDoc.getElementsByTagName("UserName")[0].childNodes[0].nodeValue);
                localStorage.guid = xmlDoc.getElementsByTagName("mobileUserGuid")[0].childNodes[0].nodeValue;
                localStorage.username = xmlDoc.getElementsByTagName("UserName")[0].childNodes[0].nodeValue;
                $("#divhm,#divmm,#divrd,#divle,#divtr").hide();
                $("#hme,#medical,#roadas,#legalas,#travelas").hide(); //color img

                var nodval = xmlDoc.getElementsByTagName("SchemaUrl");
                // alert(nodval.length);
                for (i = 0; i < nodval.length; i++) {
                    if (i == 0) {
                        localStorage.imgUrlHome = 'http://118.139.160.226:8078/uploadimages/' + nodval[i].childNodes[0].nodeValue;
                    } else if (i == 1) {
                        localStorage.imgUrlMedical = 'http://118.139.160.226:8078/uploadimages/' + nodval[i].childNodes[0].nodeValue;
                    } else if (i == 2) {
                        localStorage.imgUrlRoad = 'http://118.139.160.226:8078/uploadimages/' + nodval[i].childNodes[0].nodeValue;
                    } else if (i == 3) {
                        localStorage.imgUrlLegal = 'http://118.139.160.226:8078/uploadimages/' + nodval[i].childNodes[0].nodeValue;
                    } else if (i == 4) {
                        localStorage.imgUrlTravel = 'http://118.139.160.226:8078/uploadimages/' + nodval[i].childNodes[0].nodeValue;
                    }
                }


                if (xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.gethome = 0;

                }
                else {
                    localStorage.gethome = 1;
                    var productid = xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Home Assistance ";
                    $("#hme,#assisth").show();

                    document.getElementById('hme').style.backgroundImage = 'url(' + localStorage.imgUrlHome + ')';

                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divhm').className = "panelcollapsed";
                    $("#divhm").show(); //whole div red
                }

                if (xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue == null) {

                    // if (xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0] != undefined && xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0] != null && xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0] != "") {

                    localStorage.getmedical = 0;
                }
                else {

                    localStorage.getmedical = 2;
                    var productid = xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Medical Assistance ";
                    $("#medical,#medtb").show();
                    // alert(xmlDoc.getElementsByTagName("SchemaUrl")[0].childNodes[0].nodeValue);

                    //document.getElementById('medical').style.backgroundImage = localStorage.imgUrlMedical;

                    document.getElementById('medical').style.backgroundImage = 'url(' + localStorage.imgUrlMedical + ')';
                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divmm').className = "panelcollapsed";
                    $("#divmm").show();
                }
                if (xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue == null) {
                    // if (xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0] != undefined && xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0] != null && xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0] != "") {

                    localStorage.getroad = 0;
                }
                else {


                    localStorage.getroad = 3;
                    var productid = xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Roadside Assistance ";
                    $("#roadas,#rdtb").show();


                    //  document.getElementById('roadas').style.backgroundImage = localStorage.imgUrlRoad;

                    document.getElementById('roadas').style.backgroundImage = 'url(' + localStorage.imgUrlRoad + ')';

                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divrd').className = "panelcollapsed";
                    $("#divrd").show();
                }

                if (xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.getlegal = 0;
                }
                else {

                    localStorage.getlegal = 4;
                    var productid = xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Legal Assistance";
                    $("#legalas,#letb").show();


                    // document.getElementById('legalas').style.backgroundImage = localStorage.imgUrlLegal;

                    document.getElementById('legalas').style.backgroundImage = 'url(' + localStorage.imgUrlLegal + ')';
                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divle').className = "panelcollapsed";
                    $("#divle").show();
                }
                // alert('sd');

                // alert(xmlDoc.getElementsByTagName("travelAssistance")[0] + '::' + xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0] + '::' + xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue + '::' + xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue.length);


                if (xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.gettravel = 0;
                }
                else {

                    localStorage.gettravel = 5;
                    var productid = xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue;
                    var productname = "Travel Assistance";
                    $("#travelas,#trtb").show();


                    //document.getElementById('travelas').style.backgroundImage = localStorage.imgUrlTravel;

                    document.getElementById('travelas').style.backgroundImage = 'url(' + localStorage.imgUrlTravel + ')';

                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divtr').className = "panelcollapsed";
                    $("#divtr").show();

                }


                // LOGIN TO RANDGO SERVICES
                var randgoInputData = '';
                randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
                randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
                randgoInputData = randgoInputData + '<soap:Body>';
                randgoInputData = randgoInputData + '<Login xmlns="http://tempuri.org/">';
                randgoInputData = randgoInputData + '<lUserName>ws@europassistance</lUserName>';
                randgoInputData = randgoInputData + '<lPassword>e@s@ws</lPassword>';
                randgoInputData = randgoInputData + '</Login>';
                randgoInputData = randgoInputData + '</soap:Body>';
                randgoInputData = randgoInputData + '</soap:Envelope>';
                CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', RandoLoginCallBackNew);
                // LOGIN TO RANDGO SERVICES END
                // alert("randgoInputData:::::::" + randgoInputData)

            } //if
            else {
                jAlert(xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0].nodeValue, 'Info');
                // jAlert("Invalid username or password", 'Info');
                return false;
            }
        }

    }

    catch (exp) {
        //   alert("login:::::" + exp);
    }

}

function RandoLoginCallBackNew(responseData) {
    try {
        //alert("RandoLoginCallBackNew:::::::::::::" + responseData);
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {

            var xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("status")[0] != null && xmlDoc.getElementsByTagName("status")[0].textContent !== "") {
                localStorage.randgosessionid = xmlDoc.getElementsByTagName("sessionid")[0].textContent;
                //alert(":::localStorage.randgosessionid::::::::::::" + localStorage.randgosessionid)


                prevPage = currentPage;
                $.mobile.changePage('#indexservice', {
                    transition:  localStorage.transitiontype,
                    reverse: false,
                    changeHash: false
                });
                currentPage = 'indexservice';
                pageData.push(currentPage);
                document.getElementById('divmsg').style.display = "none";

                // alert(localStorage.gettravel + ":::::::" + localStorage.getlegal + ":::::::" + localStorage.getlegal + ":::::::" + localStorage.getmedical + ":::::::" + localStorage.gethome)
                if (localStorage.gettravel == 0 && localStorage.getlegal == 0 && localStorage.getlegal == 0 && localStorage.getmedical == 0 && localStorage.gethome == 0) {
                    // jAlert("There are no mobile products setup for this User. Please contact EASA ICT")

                    document.getElementById('divmsg').innerHTML = "There are no mobile products setup for this User. Please contact EASA ICT";
                    document.getElementById('divmsg').style.display = "block";

                }



            }
        }
        else {
            //  jAlert("Login Failed. Invalid Username or password", 'Info');
            jAlert('No Data Found', 'Info');
            return false;
        }

    } catch (exp) {
    }


}


/***********DEC9th ************/
function gotoService() {
    if (checkLogin()) {

        prevPage = currentPage;
        $.mobile.changePage('#indexservice', {
            transition:  localStorage.transitiontype,
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexservice';
        pageData.push(currentPage);


        /* $("#divhm,#divmm,#divrd,#divle,#divtr").hide();
        $("#hme,#medical,#roadas,#legalas,#travelas").hide(); //color img
        // alert("gotoService");
        if (localStorage.gethome == 1) {
        //alert("localStorage.gethome");
        $("#hme,#assisth").show();
        document.getElementById('hme').style.backgroundImage = 'url(' + localStorage.imgUrlHome + ')';
        $("#homeseperator").removeClass("middlecontent3");
        document.getElementById('divhm').className = "panelcollapsed";
        $("#divhm").show(); //whole div red

        }
        if (localStorage.getmedical == 2) {
        //alert("localStorage.getmedical");
        $("#medical,#medtb").show();
        document.getElementById('medical').style.backgroundImage = 'url(' + localStorage.imgUrlMedical + ')';
        $("#homeseperator").removeClass("middlecontent3");
        document.getElementById('divmm').className = "panelcollapsed";
        $("#divmm").show();

        }
        if (localStorage.getroad == 3) {
        // alert("localStorage.getroad");
        $("#roadas,#rdtb").show();
        document.getElementById('roadas').style.backgroundImage = 'url(' + localStorage.imgUrlRoad + ')';
        $("#homeseperator").removeClass("middlecontent3");
        document.getElementById('divrd').className = "panelcollapsed";
        $("#divrd").show();

        }
        if (localStorage.getlegal == 4) {
        // alert("localStorage.getlegal");
        $("#legalas,#letb").show();
        document.getElementById('legalas').style.backgroundImage = 'url(' + localStorage.imgUrlLegal + ')';
        $("#homeseperator").removeClass("middlecontent3");
        document.getElementById('divle').className = "panelcollapsed";
        $("#divle").show();

        }
        if (localStorage.gettravel == 5) {
        // alert("localStorage.gettravel");
        $("#travelas,#trtb").show();
        document.getElementById('travelas').style.backgroundImage = 'url(' + localStorage.imgUrlTravel + ')';
        $("#homeseperator").removeClass("middlecontent3");
        document.getElementById('divtr').className = "panelcollapsed";
        $("#divtr").show();

        }*/

    }
}


/*****************************************************************************************************
* PURPOSE :CreatePleaseCallMeRequestNew(Services indexervice.html)
* AUTHOR : Asha
* CREATED DATE : 03 DEC 2013
******************************************************************************************************/


function CreatePleaseCallMeRequestNew() {
    //  alert("::::localStorage.guid:::::tag::: tokenGuid::::::" + localStorage.guid);
    var europInputData = "";
    europInputData = '<?xml version="1.0" encoding="utf-8"?>';
    europInputData = europInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="https://api.europassistance.co.za/">';
    europInputData = europInputData + '<soapenv:Header/>';
    europInputData = europInputData + '<soapenv:Body>';
    europInputData = europInputData + '<api:CreatePleaseCallMeRequest>';
    europInputData = europInputData + '<api:mobileUserGuid>23d0e99b-1492-4e34-b9c7-8229ff45760b</api:mobileUserGuid>';
    europInputData = europInputData + '<api:validateOnly>false</api:validateOnly>';
    europInputData = europInputData + '<api:testOnly>true</api:testOnly>';
    europInputData = europInputData + '<api:mobileProductGuid>735c8b67-37c4-4f72-af94-105a26e22d2c</api:mobileProductGuid>';
    europInputData = europInputData + '<api:latitude>0</api:latitude>';
    europInputData = europInputData + '<api:longitude>0</api:longitude>';
    europInputData = europInputData + '</api:CreatePleaseCallMeRequest>';
    europInputData = europInputData + '</soapenv:Body>';
    europInputData = europInputData + '</soapenv:Envelope>';
    CallWebService('https://api.europassistance.co.za/services/MobileServices.asmx', europInputData, 'POST', 'text/xml', CreatePleaseCallMeRequestCallbackNew);
    // alert("europInputData:::::::::" + europInputData);
}

function CreatePleaseCallMeRequestCallbackNew(responseData) {
    // alert(":::::CreatePleaseCallMeRequestCallback::responseData:::::::" + responseData);

    responseData = responseData.replace(/&gt;/gi, '>');
    responseData = responseData.replace(/&lt;/gi, '<');
    var parser = new DOMParser();
    if (responseData !== "") {
        xmlDoc = parser.parseFromString(responseData, "text/xml");
        xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].nodeValue;
        if (xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].nodeValue != 0) {
            // localStorage.errmsg = xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].nodeValue;
            //  alert("ErrorMessage::::::" + xmlDoc.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue);
            jAlert(xmlDoc.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue);
        }
    }
}
/****top logo img click ****/

function gohome() {
    prevPage = currentPage;
    $.mobile.changePage('#indexPage', {
        transition:  localStorage.transitiontype,
        reverse: false,
        changeHash: false
    });
    currentPage = 'indexPage';
    pageData.push(currentPage);
}

/*****************************************************************************************************
* PURPOSE :Registration
* AUTHOR : Asha
* CREATED DATE : 14 DEC 2013
******************************************************************************************************/


function UserRegistration() {
    prevPage = currentPage;
    var Name = document.getElementById('txtRegName').value;
    var SurName = document.getElementById('txtRegSurName').value;
    var EmailID = document.getElementById('txtRegEmail').value;
    var CellNumber = document.getElementById('txtRegCell').value;
    var IdNumber = document.getElementById('txtRegIDNo').value;
    var Password = document.getElementById('txtRegPassword').value;
    var policyno = document.getElementById('txtRegPolicyNumber').value;
    var unameexp = /^[A-Za-z ']*$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var checkbox1 = document.getElementById('chk');
    var pattern = /^\d{11}$/;
    // var pattern = ^(\d{9}|\d{11})$;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var curimgsource = document.getElementById('chkAcceptTerms').src;
    var idexp = /^(\d{13})$/;
    //var pwd = ^[0-9]{5}$
    var pwd = /^\d{5}$/;

    if (Name == "") {
        jAlert("Please enter your Name!", 'Info');
        return false;
    }
    else if (!Name.match(unameexp)) {
        jAlert("Please enter  valid Name!", 'Info');
        return false;
    }
    else if (SurName == "") {
        jAlert("Please enter your Surname!", 'Info');
        return false;
    }
    else if (!SurName.match(unameexp)) {
        jAlert("Please enter  valid Surname!", 'Info');
        return false;
    }
    //if (uname == "") {
    //    jAlert("Please enter your Username!", 'Info');
    //    return false;
    //}
    //if (!uname.match(unameexp)) {
    //    jAlert("Please enter valid Username", 'Info');
    //    return false;
    //}
    else if (Password == "") {
        jAlert("Please enter Password!", 'Info');
        return false;
    }
    else if (Password.length < '5') {
        // jAlert("hello" + Password);
        jAlert("Password must contain at least five characters!");
    }
    else if (EmailID == "") {
        jAlert("Please enter EmailId!", 'Info');
        return false;
    }
    else if (EmailID.indexOf("@", 0) < 0) {
        jAlert("Please enter valid EmailId!", 'Info');
        return false;
    }

    else if (EmailID.indexOf(".", 0) < 0) {
        jAlert("Please enter a valid EmailId!", 'Info');
        return false;
    }

    else if (CellNumber == "") {
        jAlert("Please enter CellNumber!", 'Info');
        return false;
    }
    //  else if (!CellNumber.match(pattern)) {
    //    jAlert("Please enter 11 digit  number", 'Info');
    //   return false;
    // }
    else if (CellNumber.length < '10') {
        jAlert("CellNumber must contain at least 10 digits!", 'Info');
    }
    else if (CellNumber.length > '15') {
        jAlert("Please enter cellNumber with in  15 digits!", 'Info');
    }
    else if (IdNumber == "") {
        jAlert("Please enter your ID number!", 'Info');
        return false;
    }
    else if (!IdNumber.match(idexp)) {
        jAlert("Please enter 13 digit ID number!", 'Info');
        return false;
    }
    else if (policyno == "") {
        jAlert("Please enter your Policy Number!", 'Info');
        return false;
    }
    else if (policyno.length < 8) {
        // jAlert("hello" + Password);
        jAlert("Policy Number must contain at least 8 numbers!");
    }
    else if (curimgsource.indexOf('acceptedbutton.png') < 0) {
        jAlert("Please Accept Terms and Conditions!", 'Info');
        return false;
    }
    else {
        //return true;

        RegisterUserNew(Name, SurName, CellNumber, Password, IdNumber, EmailID, policyno);
    }

}

function RegisterUserNew(Name, SurName, CellNumber, Password, IdNumber, EmailID, policyno) {
    try {
        // alert("RegisterUser");
        //Name = RName;
        //SurName = RSurName;
        //CellNumber = RCellNumber;
        //Password = RPassword;
        //IdNumber = RIdNumber;
        //EmailID = REmailID;

        // localStorage.username = Name;
        var registeruserdata = "";
        registeruserdata = '<?xml version="1.0" encoding="utf-8"?>';
        registeruserdata = registeruserdata + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
        registeruserdata = registeruserdata + '<soap:Body>';
        registeruserdata = registeruserdata + '<MobileUserRegister xmlns="http://tempuri.org/">';
        registeruserdata = registeruserdata + '<Name>' + Name + '</Name>';
        registeruserdata = registeruserdata + '<Surname>' + SurName + '</Surname>';
        registeruserdata = registeruserdata + '<CellNumber>' + CellNumber + '</CellNumber>';
        registeruserdata = registeruserdata + '<Password>' + Password + '</Password>';
        registeruserdata = registeruserdata + '<IdNumber>' + IdNumber + '</IdNumber>';
        registeruserdata = registeruserdata + '<EmailID>' + EmailID + '</EmailID>';
        registeruserdata = registeruserdata + '<policyno>' + policyno + '</policyno>';
        registeruserdata = registeruserdata + '</MobileUserRegister>';
        registeruserdata = registeruserdata + '</soap:Body>';
        registeruserdata = registeruserdata + '</soap:Envelope>';
        // alert("input::::::::" + registeruserdata);
        CallWebService('http://118.139.160.226:8079/EuropeAssistStaticDataWS.asmx?op=MobileUserRegister', registeruserdata, 'POST', 'text/xml', RegisterUserCallback);

    } catch (exp) {
        //alert(exp);
    }

}


function RegisterUserCallback(responseData) {
    //alert(responseData + "ResponseData::::::registerusercallback");
    /*  var Name = document.getElementById('txtRegName').value;
    var SurName = document.getElementById('txtRegSurName').value;
    var EmailID = document.getElementById('txtRegEmail').value;
    var CellNumber = document.getElementById('txtRegCell').value;
    var IdNumber = document.getElementById('txtRegIDNo').value;
    var Password = document.getElementById('txtRegPassword').value;*/
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            var xmlDoc = parser.parseFromString(responseData, "text/xml");
            // alert(xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0] + ':::' + xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0].textContent);
            if (xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0] != null && xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0] != "" && xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0] != undefined) {

                if (xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0].textContent == 0) {
                    jAlert("User already registered.", 'Info');
                    return false;
                } else {
                    var usernameparse = xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0].textContent;
                    // alert(usernameparse);
                    prevPage = currentPage;
                    $.mobile.changePage('#indexPage', {
                        transition:  localStorage.transitiontype,
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'indexPage';
                    pageData.push(currentPage);
                    jAlert('Registration successfull, Thank you for registering.');
                }
            } else {
                jAlert("Register Failed.", 'Info');
                return false;
            }
        }
    } catch (exp) {
        //  alert(exp);
    }
}
function oncheck() {
    var curimgsource = document.getElementById('chkAcceptTerms').src;

    if (curimgsource.indexOf('acceptedbutton.png') >= 0) {
        document.getElementById('chkAcceptTerms').src = "public/images/checkbox.png";
    } else {
        document.getElementById('chkAcceptTerms').src = "public/images/EAslicing/acceptedbutton.png";
    }
}
/*********logcheck*********************/
function logcheck() {
    var curimgsrc = document.getElementById('chkremember').src;

    if (curimgsrc.indexOf('chkbx.png') >= 0) {
        document.getElementById('chkremember').src = "public/images/EAslicing/chkbxon.png";
    } else {
        document.getElementById('chkremember').src = "public/images/EAslicing/chkbx.png";
    }
}
/*******Second time click clear all fields in page & navigate ****/

function gotoRegister() {
    prevPage = currentPage;
    document.getElementById('txtRegName').value = "";
    document.getElementById('txtRegSurName').value = "";
    document.getElementById('txtRegUserName').value = "";
    document.getElementById('txtRegPassword').value = "";
    document.getElementById('txtRegEmail').value = "";
    document.getElementById('txtRegCell').value = "";
    document.getElementById('txtRegIDNo').value = "";
    document.getElementById('txtRegPolicyNumber').value = "";
    var curimgsource = document.getElementById('chkAcceptTerms').src;
    // alert(curimgsource.indexOf('checkbox.png'));
    //if (curimgsource.indexOf('checkbox.png') == -1) {
    document.getElementById('chkAcceptTerms').src = "public/images/checkbox.png";
    /* } else {
    document.getElementById('chkAcceptTerms').src = "public/images/EAslicing/acceptedbutton.png";
    }*/

    $.mobile.changePage('#reg', {
        transition:  localStorage.transitiontype,
        reverse: false,
        changeHash: false
    });
    currentPage = 'reg';
    pageData.push(currentPage);



}

/*****************************************************************************************************
* PURPOSE :ForgotPassword
* AUTHOR : Asha
* CREATED DATE : 14 DEC 2013
******************************************************************************************************/


function ForgotPasswordValidation() {
    var fpcellno = document.getElementById('txtfpcellno').value;
    var fppw = document.getElementById('txtfpnewpassword').value;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var curimgsource = document.getElementById('chkAcceptTerms').src;
    // var pattern = /^\d{11}$/;

    if (fpcellno == "") {
        jAlert("Please enter CellNumber!", 'Info');
        return false;
    }
    /*  else if (!fpcellno.match(pattern)) {
    jAlert("Please enter 11 digit  number", 'Info');
    return false;
    }*/
    else if (CellNumber.length < '10') {
        jAlert("CellNumber must contain at least 10 digits!", 'Info');
    }
    else if (CellNumber.length > '15') {
        jAlert("Please enter cellNumber with in  15 digits!", 'Info');
    }

    ForgotPasswordService(fpcellno);

}



function ForgotPasswordService(fpcellno) {
    var forgotpwdata = "";
    forgotpwdata = '<?xml version="1.0" encoding="utf-8"?>';
    forgotpwdata = forgotpwdata + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    forgotpwdata = forgotpwdata + '<soap:Body>';
    forgotpwdata = forgotpwdata + '<ForgotPassword xmlns="http://tempuri.org/">';
    forgotpwdata = forgotpwdata + '<cellnumber>' + fpcellno + '</cellnumber>';
    forgotpwdata = forgotpwdata + '</ForgotPassword>';
    forgotpwdata = forgotpwdata + '</soap:Body>';
    forgotpwdata = forgotpwdata + '</soap:Envelope>';

    CallWebService('http://118.139.160.226:8079/EuropeAssistStaticDataWS.asmx?op=ForgotPassword', forgotpwdata, 'POST', 'text/xml', ForgotPasswordServiceCallback);
    // CallWebService('http://197.96.19.188/EASAWebservice/EuropeAssistStaticDataWS.asmx?op=ForgotPassword', forgotpwdata, 'POST', 'text/xml', ForgotPasswordServiceCallback);
}


function ForgotPasswordServiceCallback(responseData) {
    //alert("ForgotPasswordServiceCallback:::::::::::" + responseData);
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            var xmlDoc = parser.parseFromString(responseData, "text/xml");

            if (xmlDoc.getElementsByTagName("ForgotPasswordResult")[0].textContent == 0) {
                jAlert("Please Enter Valid CellNumber.", 'Info');
                return false;
            }
            else {
                jAlert("Thank you,We have sent an Email with your password", 'Info');
                prevPage = currentPage;
                $.mobile.changePage('#indexPage', {
                    transition:  localStorage.transitiontype,
                    reverse: false,
                    changeHash: false
                });
                currentPage = 'indexPage';
                pageData.push(currentPage);

            }
        }
    }
    catch (exp) {
    }
}

/*******Second time click clear all fields in page & navigate ****/

function gotoForgotPassword() {
    prevPage = currentPage;
    document.getElementById('txtfpcellno').value = "";
    $.mobile.changePage('#ForgotPassword', {
        transition:  localStorage.transitiontype,
        reverse: false,
        changeHash: false
    });
    currentPage = 'ForgotPassword';
    pageData.push(currentPage);
}



function ShowExitDialog() {
    /*gotoService();

    navigator.notification.confirm(
    ("Do you want to Exit?"), // message
    alertexit, // callback
    'My APp', // title
    'YES,NO' // buttonName
    );*/
    //alert(localStorage.loginID + '::' + localStorage.randgosessionid);
    if (localStorage.loginID == 0 || localStorage.loginID == null || localStorage.loginID == '' || localStorage.loginID == 'null') {
        localStorage.randgosessionid = null;
        //alert(localStorage.loginID + '::' + localStorage.randgosessionid);
    }
    device.exitApp();
}

/*
function alertexit(button){

if(button=="1" || button==1)
{

device.exitApp();
}

}*/