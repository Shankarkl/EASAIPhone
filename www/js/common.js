// JScript source code

var currentPage = '';
var prevPage = '';
var pageData = ["indexPage"];
var userName = '';
var passowrd = '';
var HomeID = '';
var RoadID = '';
var MedicalID = '';
var legalID = '';
var TravelID = '';
var target = '';
var spinner = '';
var Pagename = '';
localStorage.count = 0;
/*******************************************************************************
* FUNCTION TO CALL ANY WEB SERVICE
******************************************************************************/
CallWebService = function (url, inputData, method, contentType, callback) {
    document.getElementById('loaddingimg').style.display = "block";
    try {
        var xhr;
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


            if (xhr.readyState == 4 && (xhr.status == 404 || xhr.status == 403 || xhr.status == 500 || xhr.status == 504)) {
                //alert(xhr.status + 'status(500status)');
                jAlert("The System is temporarily unavailable, please try again later.", 'Info');
                document.getElementById('loaddingimg').style.display = "none";

            }
        };

        xhr.onerror = function (e) {

            jAlert("The System is temporarily unavailable, please try again later.", 'Info');
            document.getElementById('loaddingimg').style.display = "none";


        };

        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", contentType);
        xhr.timeout = 60000;
        xhr.ontimeout = function (e) {
            jAlert("The System is temporarily unavailable, please try again later.", 'Info');
            document.getElementById('loaddingimg').style.display = "none";

        }


        if (inputData !== '') {
            if (window.navigator.onLine == true) {


                xhr.send(inputData);
            } else {
                jAlert("No network connection,Please check your network connectivity!", 'Info');
                document.getElementById('loaddingimg').style.display = "none";
            }
        } else {
            if (window.navigator.onLine == true) {

                xhr.send(null);
            } else {

                jAlert("No network connection,Please check your network connectivity!", 'Info');
                document.getElementById('loaddingimg').style.display = "none";
            }
        }

    } catch (ex) {

    }
}


function gotoWallet() {
    // alert("wallet");
    if (checkLogin()) {
        // alert("wallet");
        prevPage = currentPage;
        $.mobile.changePage('#indexwallet', {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexwallet';
        pageData.push(currentPage);
    }
}
/*** DEC 6th ASHA ******/

function gotoBenifit() {
    if (checkLogin()) {
        document.getElementById('loaddingimg').style.display = "block";
        setTimeout(function () {
            $("#tbldisplaycategories tr").remove();
            prevPage = currentPage;
            $.mobile.changePage('#indexbenefit', {
                transition: "none",
                reverse: false,
                changeHash: false
            });
            currentPage = 'indexbenefit';
            pageData.push(currentPage);

            $("#tbldisplaycategoriesbycid tr").remove();
            $("#tbldisplaymerchantdeals tr").remove();
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
            //setTimeout(function () { GetDisplayCategories(); }, 100);


        },
200);
    }
}


function RandoLoginCallBackNew(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {

            var xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("status")[0] != null && xmlDoc.getElementsByTagName("status")[0].textContent !== "") {
                localStorage.randgosessionid = xmlDoc.getElementsByTagName("sessionid")[0].textContent;
                GetDisplayCategories();

            }
        }
        else {
            jAlert('No Data Found', 'Info');
            return false;
        }

    } catch (exp) {
    }
}

function gotoProfile() {

    if (checkLogin()) {
        document.getElementById('loaddingimg').style.display = "block";
        setTimeout(function () {
            prevPage = currentPage;
            document.getElementById('txtuname').value = "";
            document.getElementById('txtname').value = "";
            document.getElementById('txtsname').value = "";
            document.getElementById('txtemail').value = "";
            document.getElementById('txtcellno').value = "";
            document.getElementById('txtid').value = "";
            document.getElementById('txtnewpin').value = "";
            document.getElementById('txtconpin').value = "";



            $.mobile.changePage('#indexprofile', {
                transition: "none",
                reverse: false,
                changeHash: false
            });
            currentPage = 'indexprofile';
            pageData.push(currentPage);
            //setTimeout(function () { GetProfileDetails(); }, 100);
            GetProfileDetails();
        },
200);


    }
}




function gotoBalance() {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#yourbalance', {
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
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
            transition: "none",
            reverse: false,
            changeHash: false
        });
        currentPage = 'trdtls';
        pageData.push(currentPage);
        //Airtimedenomlist();
    }
}
function login() {



    document.getElementById('txtLoginUserName').value = "";
    document.getElementById('txtLoginPassword').value = "";

    prevPage = currentPage;
    $.mobile.changePage('#log', {
        transition: "none",
        reverse: false,
        changeHash: false
    });
    currentPage = 'log';
    pageData.push(currentPage);

    /*prevPage = currentPage;
    $.mobile.changePage('#log', {
    transition: "none",
    reverse: false,
    changeHash: false
    });
    currentPage = 'log';
    pageData.push(currentPage);

    document.getElementById('txtLoginUserName').value = "";
    document.getElementById('txtLoginPassword').value = "";*/
}

function goToMainIndex() {

    prevPage = currentPage;
    $.mobile.changePage('#indexPage', {
        transition: "none",
        reverse: true,
        changeHash: false
    });
    currentPage = 'indexPage';
    pageData.push(currentPage);
}

function LoginValidation() {
    var name = document.getElementById('txtLoginUserName').value;
    var pw = document.getElementById('txtLoginPassword').value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var checkbox1 = document.getElementById('chk');
    var pattern = /^\d{10}$/;
    var pwd = /^\d{5}$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var logunameexp = /^[A-Za-z ']*$/;
    var curimgsrc = document.getElementById('chkremember').src;
    if (cell == "") {
        jAlert("Please enter your cellphone number", 'Info');
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
    if (currentPage == 'log' || currentPage == 'RegFstPage') {
        setTimeout(function () {
            prevPage = currentPage;
            $.mobile.changePage('#indexPage', {
                transition: "none",
                reverse: false,
                changeHash: false
            });
            currentPage = 'indexPage';
            pageData.push(currentPage);

        },

        200);
    }
    else if (currentPage == 'qtnanswers') {
        document.getElementById('loaddingimg').style.display = "block";
        setTimeout(function () {
            pageData.pop();
            currentPage = pageData[pageData.length - 1];
            $.mobile.changePage('#' + currentPage, {
                transition: "none",
                reverse: true,
                changeHash: false
            });
            document.getElementById('loaddingimg').style.display = "none";
        },
        200);

    }
    else {
        document.getElementById('txtmerchantsearch').value = "";
        pageData.pop();
        currentPage = pageData[pageData.length - 1];
        $.mobile.changePage('#' + currentPage, {
            transition: "none",
            reverse: true,
            changeHash: false
        });
    }
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
            transition: "none",
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
            transition: "none",
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
return true;
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

    openpopupTdtls();
}

function GetMoreInfo1(pageType) {
    if (checkLogin()) {
        prevPage = currentPage;
        $.mobile.changePage('#clickformoreinfo', {
            transition: "none",
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
            transition: "none",
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
    $(window).scrollTop(0);

    var Name = document.getElementById('txtuname').value;
    var FName = document.getElementById('txtname').value;
    var SurName = document.getElementById('txtsname').value;
    var EmailID = document.getElementById('txtemail').value;
    var CellNumber = document.getElementById('txtcellno').value;
    if (CellNumber.charAt(3) == 0) {
        CellNumberResult = CellNumber.replace(CellNumber.charAt(3), '');
    }
    else {
        CellNumberResult = CellNumber;
    }
    var IdNumber = document.getElementById('txtid').value;
    var pinnew = document.getElementById('txtnewpin').value;
    var pinconfirm = document.getElementById('txtconpin').value;
    var policyno = document.getElementById('txtRegPolicyNumber').value;
    var unameexp = /^[A-Za-z ']*$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var checkbox1 = document.getElementById('chk');
    var pattern = /^\d{11}$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var idexp = /^(\d{13})$/;
    var num = /^(\(?\+?[0-9]*\)?)*$/g;
    var pwd = /^\d{5}$/;
    var checnum = /^\d+$/;

    if (Name == "") {
        jAlert("Please enter the User Name!", 'Info');
        return false;
    }
    else if (!Name.match(unameexp)) {
        jAlert("Please enter valid User Name!", 'Info');
        return false;
    } else if (FName == "") {
        jAlert("Please enter your first name!", 'Info');
        return false;
    }
    else if (!FName.match(unameexp)) {
        jAlert("Please enter your first name!", 'Info');
        return false;
    }
    else if (SurName == "") {
        jAlert("Please enter your surname!", 'Info');
        return false;
    }
    else if (!SurName.match(unameexp)) {
        jAlert("Please enter valid Surname!", 'Info');
        return false;
    }
    else if (EmailID == "") {
        jAlert("Please enter your email address!", 'Info');
        return false;
    }
    else if (EmailID.indexOf("@", 0) < 0) {
        jAlert("Please enter a valid Email address!", 'Info');
        return false;
    }

    else if (EmailID.indexOf(".", 0) < 0) {
        jAlert("Please enter your email address!", 'Info');
        return false;
    }

    else if (CellNumberResult == "+27") {
        jAlert("Please enter your cellphone number!", 'Info');
        return false;
    } else if (!CellNumberResult.match(num)) {
        jAlert("Please enter your cellphone number!", 'Info');
        return false;
    }
    else if (CellNumberResult.length < '12') {
        jAlert("Please enter your cellphone number!", 'Info'); return false;
    }
    else if (CellNumberResult.length > '12') {
        jAlert("Please enter your cellphone number!", 'Info'); return false;
    }
    else if (IdNumber == "") {
        jAlert("Please enter your ID Number!", 'Info');
        return false;
    }
    else if (!IdNumber.match(idexp)) {
        jAlert("Please enter a valid 13 digit ID number!", 'Info');
        return false;
    } else {
        //  alert(CellNumberResult);
        CellNumberResult = CellNumberResult.slice(1);
        if (pinnew == '') {
            document.getElementById('txtnewpin').value = 'gohome';
            Profileupdate(document.getElementById('userid').value, FName, SurName, Name, document.getElementById('oldpin').value, IdNumber, EmailID, CellNumberResult);

        } else {
            if (pinnew.length < 5) {
                jAlert("Password must contain at least five characters!", " Info ");
                return false;
            }
            if (pinconfirm == "") {
                jAlert("Please enter the confirm password!", " Info ");
                return false;
            }
            if (pinnew != pinconfirm) {
                jAlert("Passwords do not match please confirm your password!", "Info ");
                return false;
            }
          /*  var confirmpw = jConfirm("Are you sure you want to change your password!", "Info ");
            if (confirmpw == true) {
             
                Profileupdate(document.getElementById('userid').value, FName, SurName, Name, pinnew, IdNumber, EmailID, CellNumberResult);
            }*/
            jConfirm('Are you sure you want to change your password?', 'Info', function (r) {
            if (r == true) {
            Profileupdate(document.getElementById('userid').value, FName, SurName, Name, pinnew, IdNumber, EmailID, CellNumberResult);
            }
        else {
            prevPage = currentPage;
            $.mobile.changePage('#indexprofile', {
                transition: "none",
                reverse: false,
                changeHash: false
            });
            currentPage = 'indexprofile';
            pageData.push(currentPage);
            }
            });
          
        }
    }


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
    CallWebService('http://118.139.160.226/Europewebservice/EuropeAssistStaticDataWS.asmx?op=GetProfileDetails', profileinputdata, 'POST', 'text/xml', GetProfileDetailsCallBack);
    // CallWebService('http://118.139.160.226:8058/EuropeAssistStaticDataWS.asmx?op=GetProfileDetails', profileinputdata, 'POST', 'text/xml', GetProfileDetailsCallBack);
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
                document.getElementById('txtuname').value = xmlDoc.getElementsByTagName("UserName")[0].textContent;
                document.getElementById('txtname').value = xmlDoc.getElementsByTagName("FirstName")[0].textContent;
                document.getElementById('txtsname').value = xmlDoc.getElementsByTagName("LastName")[0].textContent;
                document.getElementById('txtid').value = xmlDoc.getElementsByTagName("IDNumber")[0].textContent;
                document.getElementById('txtcellno').value = '+' + xmlDoc.getElementsByTagName("CellNumber")[0].textContent;
                document.getElementById('txtemail').value = xmlDoc.getElementsByTagName("EMAILID")[0].textContent;
                document.getElementById('oldpin').value = xmlDoc.getElementsByTagName("Password")[0].textContent;
                document.getElementById('userid').value = xmlDoc.getElementsByTagName("UserId")[0].textContent;


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
/********************************Change password*****************************/
function Profileupdate(Userid, Fname, Sname, Uname, Password, IDNum, EmailID, celnum) {

    var changepinInputdata = "";

    changepinInputdata = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    changepinInputdata = changepinInputdata + '<soap:Body>';
    changepinInputdata = changepinInputdata + '<UpdateUserdetails xmlns="http://tempuri.org/">';
    changepinInputdata = changepinInputdata + '<UserId>' + Userid + '</UserId>';
    changepinInputdata = changepinInputdata + '<FirstName>' + Fname + '</FirstName>';
    changepinInputdata = changepinInputdata + '<LastName>' + Sname + '</LastName>';
    changepinInputdata = changepinInputdata + '<UserName>' + Uname + '</UserName>';
    changepinInputdata = changepinInputdata + '<Password>' + Password + '</Password>';
    changepinInputdata = changepinInputdata + '<IDNumber>' + IDNum + '</IDNumber>';
    changepinInputdata = changepinInputdata + '<EMAILID>' + EmailID + '</EMAILID>';
    changepinInputdata = changepinInputdata + '<CellNumber>' + celnum + '</CellNumber>';
    changepinInputdata = changepinInputdata + '</UpdateUserdetails>';
    changepinInputdata = changepinInputdata + '</soap:Body>';
    changepinInputdata = changepinInputdata + '</soap:Envelope>';

    //CallWebService('http://118.139.160.226:8058/EuropeAssistStaticDataWS.asmx?op=UpdateUserdetails', changepinInputdata, 'POST', 'text/xml', ProfileupdateCallback);
    CallWebService('http://118.139.160.226/Europewebservice/EuropeAssistStaticDataWS.asmx?op=UpdateUserdetails', changepinInputdata, 'POST', 'text/xml', ProfileupdateCallback);

}
function ProfileupdateCallback(responseData) {
    // alert("ProfileChangepasswordCallback:::::::::::" + responseData);
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            var xmlDoc = parser.parseFromString(responseData, "text/xml");

            if (xmlDoc.getElementsByTagName("UpdateUserdetailsResult")[0].textContent == 0) {
                jAlert("Your password has not changed.", 'Info');
                return false;
            }
            else {
                //alert('::' + document.getElementById('txtnewpin').value);
                if (document.getElementById('txtnewpin').value == 'gohome') {
                    jAlert("Thank you! Your profile has updated successfully.", 'Info');
                    document.getElementById('txtnewpin').value = '';
                    gotoService();
                    return false;
                } else {
                    jAlert("Thank you! Your password is now changed.", 'Info');
                    localStorage.randgosessionid = null;
                    localStorage.loginID = null;
                    prevPage = currentPage;
                    $.mobile.changePage('#indexPage', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'indexPage';
                    pageData.push(currentPage);
                }
            }
        }
    }
    catch (exp) {
    }
}
/*******************************Accept Terms and Conditions**********/
function gototerms() {
    prevPage = currentPage;
    $.mobile.changePage('#terms', {
        transition: "none",
        reverse: false,
        changeHash: false
    });
    currentPage = 'terms';
    pageData.push(currentPage);
}

/********************************pin**************************************/


/***********18/10/2013*************/
function checkremember() {
    $("#tlimg,#lgimg,#rdimg,#mdimg,#hmimg").hide();
    $("#NOproductDiv").hide();
    $("#divhm,#divmm,#divrd,#divle,#divtr").hide();
    $("#hme,#medical,#roadas,#legalas,#travelas").hide(); //color img
    $(".trheight3").hide();
    if (localStorage.loginID == 0 || localStorage.loginID == undefined || localStorage.loginID == null || localStorage.loginID == 'undefined' || localStorage.loginID == '' || localStorage.loginID == "null") {
        localStorage.randgosessionid = null;

        localStorage.gettravel = 0;
        localStorage.getlegal = 0;
        localStorage.getroad = 0;
        localStorage.getmedical = 0;
        localStorage.gethome = 0;

        prevPage = currentPage;
        $.mobile.changePage('#indexPage', {
            transition: "none",
            reverse: true,
            changeHash: false
        });
        currentPage = 'indexPage'; //'indexservice' indexbenefit indexwallet indexPage;qtnanswers;clickformoreinfo
        pageData.push(currentPage);


    }
   
    else {
        Pagename = 'indexservice';
        inputData = '<?xml version="1.0" encoding="utf-8"?>';
        inputData = inputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
        inputData = inputData + '<soap:Body>';
        inputData = inputData + '<EAAppConfig  xmlns="http://tempuri.org/" />';
        inputData = inputData + '</soap:Body>';
        inputData = inputData + '</soap:Envelope>';
        CallWebService('http://dsg.star-knowledge.com/service.asmx', inputData, 'POST', 'text/xml', checkAppLogin);
    }
}

/* ****** ASHA DEC 3/12/2013 ******* */

function EALoginValidation() {
    $(window).scrollTop(0);
    var name = document.getElementById('txtLoginUserName').value;
    var pw = document.getElementById('txtLoginPassword').value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var checkbox1 = document.getElementById('chk');
    var pattern = /^\d{10}$/;
    var pwd = /^\d{5}$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var logunameexp = /^[A-Za-z ']*$/;
    var curimgsrc = document.getElementById('chkremember').src;

    if (name == "") {
        jAlert("Please enter your username!", 'Info');
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

    CallWebService('http://118.139.160.226/Europewebservice/EuropeAssistStaticDataWS.asmx?op=MobileUserLogin', eaLoginInputData, 'POST', 'text/xml', MYLogintoAllServicesCallBack);
    // CallWebService('http://118.139.160.226:8058/EuropeAssistStaticDataWS.asmx?op=MobileUserLogin', eaLoginInputData, 'POST', 'text/xml', MYLogintoAllServicesCallBack);
}


/***********************/
function MYLogintoAllServicesCallBack(responseData) {
    try {

        $("#divhm,#divmm,#divrd,#divle,#divtr").hide();
        $("#hme,#medical,#roadas,#legalas,#travelas").hide(); //color img
        $(".trheight3").hide();
        $("#NOproductDiv").hide();

        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0] == undefined) {
                localStorage.guid = xmlDoc.getElementsByTagName("mobileUserGuid")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("mobileUserGuid")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("mobileUserGuid")[0].childNodes[0].nodeValue;
                localStorage.username = xmlDoc.getElementsByTagName("UserName")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("UserName")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("UserName")[0].childNodes[0].nodeValue;
                localStorage.firstname = xmlDoc.getElementsByTagName("FirstName")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("FirstName")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("FirstName")[0].childNodes[0].nodeValue;
                localStorage.SurName = xmlDoc.getElementsByTagName("LastName")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("LastName")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("LastName")[0].childNodes[0].nodeValue;
                localStorage.EmailID = xmlDoc.getElementsByTagName("EMAILID")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("EMAILID")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("EMAILID")[0].childNodes[0].nodeValue;
                localStorage.CellNumber = xmlDoc.getElementsByTagName("CellNumber")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("CellNumber")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("CellNumber")[0].childNodes[0].nodeValue;
                //localStorage.Description = xmlDoc.getElementsByTagName("Description")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("Description")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("Description")[0].childNodes[0].nodeValue;
                var nodval = xmlDoc.getElementsByTagName("SchemaUrlTable");
                // alert(xmlDoc.getElementsByTagName("SchemaUrlTable")[0].childNodes[0].nodeValue);
                for (i = 0; i < nodval.length; i++) {
                
                    if (i == 0) {

                        document.getElementById('homecontent').innerHTML = "";
                        // document.getElementById('homecontent').innerHTML = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        var desc1 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc1 = desc1.replace(/&lt;/g, '<');
                        desc1 = desc1.replace(/&gt;/g, '/>');
                        desc1 = desc1.replace(/&quot;/g, '"');
                        desc1 = desc1.replace(/&nbsp;/g, ' ');
                        desc1 = desc1.replace(/&amp;/g, '&');
                        desc1 = desc1.replace(/&#39;/g, "'");
                        document.getElementById('homecontent').innerHTML = desc1;
                      
                        localStorage.imgUrlHome = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlHome = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;



                    } else if (i == 1) {
                        document.getElementById('medicontent').innerHTML = "";
                        var desc2 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc2 = desc2.replace(/&lt;/g, '<');
                        desc2 = desc2.replace(/&gt;/g, '/>');
                        desc2 = desc2.replace(/&quot;/g, '"');
                        desc2 = desc2.replace(/&nbsp;/g, ' ');
                        desc2 = desc2.replace(/&amp;/g, '&');
                        desc2 = desc2.replace(/&#39;/g, "'");
                        document.getElementById('medicontent').innerHTML = desc2;
                       
                        localStorage.imgUrlMedical = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlMedical = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent; 
                    } else if (i == 2) {
                        document.getElementById('rdcontent').innerHTML = "";
                        var desc3 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc3 = desc3.replace(/&lt;/g, '<');
                        desc3 = desc3.replace(/&gt;/g, '/>');
                        desc3 = desc3.replace(/&quot;/g, '"');
                        desc3 = desc3.replace(/&nbsp;/g, ' ');
                        desc3 = desc3.replace(/&amp;/g, '&');
                        desc3 = desc3.replace(/&#39;/g, "'");
                      
                        document.getElementById('rdcontent').innerHTML = desc3;

                        localStorage.imgUrlRoad = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlRoad = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                    } else if (i == 3) {
                        document.getElementById('lecontent').innerHTML = "";
                        var desc4 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc4 = desc4.replace(/&lt;/g, '<');
                        desc4 = desc4.replace(/&gt;/g, '/>');
                        desc4 = desc4.replace(/&quot;/g, '"');
                        desc4 = desc4.replace(/&nbsp;/g, ' ');
                        desc4 = desc4.replace(/&amp;/g, '&');
                        desc4 = desc4.replace(/&#39;/g, "'");
                       
                        document.getElementById('lecontent').innerHTML = desc4;

                        localStorage.imgUrlLegal = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlLegal = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent; 
                    } else if (i == 4) {
                        document.getElementById('travelcontent').innerHTML = "";
                        var desc5 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc5 = desc5.replace(/&lt;/g, '<');
                        desc5 = desc5.replace(/&gt;/g, '/>');
                        desc5 = desc5.replace(/&quot;/g, '"');
                        desc5 = desc5.replace(/&nbsp;/g, ' ');
                        desc5 = desc5.replace(/&amp;/g, '&');
                        desc5 = desc5.replace(/&#39;/g, "'");
                        
                        document.getElementById('travelcontent').innerHTML = desc5;

                        localStorage.imgUrlTravel = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlTravel = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent; 
                    }

                }



                if (xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.gethome = 0;

                }
                else {
                    localStorage.gethome = 1;
                    HomeID = xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue;
                    var productid = xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Home Assistance ";
                    $("#hme,#assisth").show();

                    //  document.getElementById('hme').style.backgroundImage = 'url(' + localStorage.imgUrlHome + ')';
                    document.getElementById("hmimg").src = localStorage.imgUrlHome;
                    document.getElementById("hmimg1").src = localStorage.imgUrlHome;

                    $("#hmimg").show();

                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divhm').className = "panelcollapsed";
                    $("#divhm").show(); //whole div red
                }

                if (xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue == null) {
                    localStorage.getmedical = 0;
                }
                else {
                    MedicalID = xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue;
                    localStorage.getmedical = 2;
                    var productid = xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Medical Assistance ";
                    $("#medical,#medtb").show();
                    // document.getElementById('medical').style.backgroundImage = 'url(' + localStorage.imgUrlMedical + ')';
                    document.getElementById("mdimg").src = localStorage.imgUrlMedical;
                    document.getElementById("mdimg1").src = localStorage.imgUrlMedical;
                    $("#mdimg").show();
                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divmm').className = "panelcollapsed";
                    $("#divmm").show();
                }
                if (xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue == null) {
                    localStorage.getroad = 0;
                }
                else {

                    RoadID = xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue;
                    localStorage.getroad = 3;
                    var productid = xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Roadside Assistance ";
                    $("#roadas,#rdtb").show();
                  
                    document.getElementById("rdimg").src = localStorage.imgUrlRoad;
                    document.getElementById("rdimg1").src = localStorage.imgUrlRoad;
                    $("#rdimg").show();
                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divrd').className = "panelcollapsed";
                    $("#divrd").show();
                }

                if (xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.getlegal = 0;
                }
                else {
                    legalID = xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue;
                    localStorage.getlegal = 4;
                    var productid = xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Legal Assistance";
                    $("#legalas,#letb").show();
                    document.getElementById("lgimg").src = localStorage.imgUrlLegal;
                    document.getElementById("lgimg1").src = localStorage.imgUrlLegal;
                    $("#lgimg").show();

                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divle').className = "panelcollapsed";
                    $("#divle").show();
                }

                if (xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.gettravel = 0;
                }
                else {
                    TravelID = xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue;
                    localStorage.gettravel = 5;
                    var productid = xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue;
                    var productname = "Travel Assistance";
                    $("#travelas,#trtb").show();
                
                    document.getElementById("tlimg").src = localStorage.imgUrlTravel;
                    document.getElementById("tlimg1").src = localStorage.imgUrlTravel;
                    $("#tlimg").show();
                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divtr').className = "panelcollapsed";
                    $("#divtr").show();

                } $(".trheight3").show();
                // LOGIN TO RANDGO SERVICES
                prevPage = currentPage;
                $.mobile.changePage('#indexservice', {
                    transition: "none",
                    reverse: true,
                    changeHash: false
                });
                currentPage = 'indexservice';
                pageData.push(currentPage);

            } //if
            else {
                if (xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0].nodeValue == 'NO MOBILEUSERGUID') {
                    localStorage.guid = '';
                    localStorage.gettravel = 0;
                    localStorage.getlegal = 0;
                    localStorage.getroad = 0;
                    localStorage.getmedical = 0;
                    localStorage.gethome = 0;

                    localStorage.username = xmlDoc.getElementsByTagName("UserName")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("UserName")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("UserName")[0].childNodes[0].nodeValue;
                    $("#divhm,#divmm,#divrd,#divle,#divtr").hide();
                    $("#hme,#medical,#roadas,#legalas,#travelas").hide(); //color img
                    $(".trheight3").hide();
                    localStorage.username = xmlDoc.getElementsByTagName("UserName")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("UserName")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("UserName")[0].childNodes[0].nodeValue;
                    localStorage.firstname = xmlDoc.getElementsByTagName("FirstName")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("FirstName")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("FirstName")[0].childNodes[0].nodeValue;
                    localStorage.SurName = xmlDoc.getElementsByTagName("LastName")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("LastName")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("LastName")[0].childNodes[0].nodeValue;
                    localStorage.EmailID = xmlDoc.getElementsByTagName("EMAILID")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("EMAILID")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("EMAILID")[0].childNodes[0].nodeValue;
                    localStorage.CellNumber = xmlDoc.getElementsByTagName("CellNumber")[0].childNodes[0] == undefined || xmlDoc.getElementsByTagName("CellNumber")[0].childNodes[0] == 'null' ? '' : xmlDoc.getElementsByTagName("CellNumber")[0].childNodes[0].nodeValue;
                    prevPage = currentPage;
                    $.mobile.changePage('#indexservice', {
                        transition: "none",
                        reverse: true,
                        changeHash: false
                    });
                    currentPage = 'indexservice';
                    pageData.push(currentPage);
                    $("#NOproductDiv").show();

                } else {
                    jAlert(xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0].nodeValue, 'Info');
                    return false;
                }
            }
        }

    }

    catch (exp) {
    }
}
/**********************/





/***********DEC9th ************/
function gotoService() {

    if (checkLogin()) {
        $("#tlimg,#lgimg,#rdimg,#mdimg,#hmimg").hide();
        $("#NOproductDiv").hide();
        $("#divhm,#divmm,#divrd,#divle,#divtr").hide();
        $("#hme,#medical,#roadas,#legalas,#travelas").hide(); //color img
        $(".trheight3").hide();
        prevPage = currentPage;
        $.mobile.changePage('#indexservice', {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexservice';
        pageData.push(currentPage);

        document.getElementById("hmimg").src = "";
        document.getElementById("hmimg1").src = "";

        document.getElementById("mdimg").src = "";
        document.getElementById("mdimg1").src = "";



        document.getElementById("rdimg").src = "";
        document.getElementById("rdimg1").src = "";


        document.getElementById("lgimg").src = "";
        document.getElementById("lgimg1").src = "";


        document.getElementById("tlimg").src = "";
        document.getElementById("tlimg1").src = "";

        var mobileuserguidInputData = '';
        mobileuserguidInputData = '<?xml version="1.0" encoding="utf-8"?>';
        mobileuserguidInputData = mobileuserguidInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
        mobileuserguidInputData = mobileuserguidInputData + '<soap:Body>';
        mobileuserguidInputData = mobileuserguidInputData + '<GetUserProducts xmlns="http://tempuri.org/">'
        mobileuserguidInputData = mobileuserguidInputData + '<mobileuserguid>' + localStorage.guid + '</mobileuserguid>'
        mobileuserguidInputData = mobileuserguidInputData + '</GetUserProducts>'
        mobileuserguidInputData = mobileuserguidInputData + '</soap:Body>';
        mobileuserguidInputData = mobileuserguidInputData + '</soap:Envelope>';
        CallWebService('http://118.139.160.226/Europewebservice/EuropeAssistStaticDataWS.asmx?op=GetUserProducts', mobileuserguidInputData, 'POST', 'text/xml', mobileuserguidCallBack);
        //  CallWebService('http://118.139.160.226:8058/EuropeAssistStaticDataWS.asmx?op=GetUserProducts', mobileuserguidInputData, 'POST', 'text/xml', mobileuserguidCallBack);

    }
}

function mobileuserguidCallBack(responseData) {

    try {
      
        $("#divhm,#divmm,#divrd,#divle,#divtr").hide();
        $("#hme,#medical,#roadas,#legalas,#travelas").hide(); //color img
        $(".trheight3").hide();
        $("#NOproductDiv").hide();

        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0] == undefined) {
                var nodval = xmlDoc.getElementsByTagName("SchemaUrlTable");
                for (i = 0; i < nodval.length; i++) {
                    if (i == 0) {

                        document.getElementById('homecontent').innerHTML = "";

                        var desc1 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc1 = desc1.replace(/&lt;/g, '<');
                        desc1 = desc1.replace(/&gt;/g, '/>');
                        desc1 = desc1.replace(/&quot;/g, '"');
                        desc1 = desc1.replace(/&nbsp;/g, ' ');
                        desc1 = desc1.replace(/&amp;/g, '&');
                        desc1 = desc1.replace(/&#39;/g, "'");
                        document.getElementById('homecontent').innerHTML = desc1;
                        localStorage.imgUrlHome = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlHome = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;

                    } else if (i == 1) {
                        document.getElementById('medicontent').innerHTML = "";
                        var desc2 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc2 = desc2.replace(/&lt;/g, '<');
                        desc2 = desc2.replace(/&gt;/g, '/>');
                        desc2 = desc2.replace(/&quot;/g, '"');
                        desc2 = desc2.replace(/&nbsp;/g, ' ');
                        desc2 = desc2.replace(/&amp;/g, '&');
                        desc2 = desc2.replace(/&#39;/g, "'");
                        document.getElementById('medicontent').innerHTML = desc2;
                        localStorage.imgUrlMedical = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlMedical = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent; ;
                    } else if (i == 2) {
                        document.getElementById('rdcontent').innerHTML = "";
                        var desc3 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc3 = desc3.replace(/&lt;/g, '<');
                        desc3 = desc3.replace(/&gt;/g, '/>');
                        desc3 = desc3.replace(/&quot;/g, '"');
                        desc3 = desc3.replace(/&nbsp;/g, ' ');
                        desc3 = desc3.replace(/&amp;/g, '&');
                        desc3 = desc3.replace(/&#39;/g, "'");
                        document.getElementById('rdcontent').innerHTML = desc3;
                        localStorage.imgUrlRoad = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlRoad = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent; ;
                    } else if (i == 3) {
                        document.getElementById('lecontent').innerHTML = "";
                        var desc4 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc4 = desc4.replace(/&lt;/g, '<');
                        desc4 = desc4.replace(/&gt;/g, '/>');
                        desc4 = desc4.replace(/&quot;/g, '"');
                        desc4 = desc4.replace(/&nbsp;/g, ' ');
                        desc4 = desc4.replace(/&amp;/g, '&');
                        desc4 = desc4.replace(/&#39;/g, "'");
                        document.getElementById('lecontent').innerHTML = desc4;
                        localStorage.imgUrlLegal = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlLegal = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent; ;
                    } else if (i == 4) {
                        document.getElementById('travelcontent').innerHTML = "";
                        var desc5 = xmlDoc.getElementsByTagName("Description")[i].textContent;
                        desc5 = desc5.replace(/&lt;/g, '<');
                        desc5 = desc5.replace(/&gt;/g, '/>');
                        desc5 = desc5.replace(/&quot;/g, '"');
                        desc5 = desc5.replace(/&nbsp;/g, ' ');
                        desc5 = desc5.replace(/&amp;/g, '&');
                        desc5 = desc5.replace(/&#39;/g, "'");
                        document.getElementById('travelcontent').innerHTML = desc5;
                        localStorage.imgUrlTravel = 'http://118.139.160.226/EASACMS2/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent;
                        // localStorage.imgUrlTravel = 'http://118.139.160.226:8059/Uploadimages/' + xmlDoc.getElementsByTagName("Filename")[i].textContent; ;
                    }

                }



                if (xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.gethome = 0;

                }
                else {
                    localStorage.gethome = 1;
                    HomeID = xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue;
                    var productid = xmlDoc.getElementsByTagName("HomeAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Home Assistance ";
                    $("#hme,#assisth").show();

                    document.getElementById("hmimg").src = localStorage.imgUrlHome;
                    $("#hmimg").show();


                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divhm').className = "panelcollapsed";
                    $("#divhm").show(); //whole div red
                }

                if (xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue == null) {
                    localStorage.getmedical = 0;
                }
                else {
                    MedicalID = xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue;
                    localStorage.getmedical = 2;
                    var productid = xmlDoc.getElementsByTagName("MedicalAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Medical Assistance ";
                    $("#medical,#medtb").show();

                    document.getElementById("mdimg").src = localStorage.imgUrlMedical;
                    $("#mdimg").show();
                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divmm').className = "panelcollapsed";
                    $("#divmm").show();
                }
                if (xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue == null) {
                    localStorage.getroad = 0;
                }
                else {

                    RoadID = xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue;
                    localStorage.getroad = 3;
                    var productid = xmlDoc.getElementsByTagName("RoadAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Roadside Assistance ";
                    $("#roadas,#rdtb").show();

                    document.getElementById("rdimg").src = localStorage.imgUrlRoad;
                    $("#rdimg").show();


                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divrd').className = "panelcollapsed";
                    $("#divrd").show();
                }

                if (xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.getlegal = 0;
                }
                else {
                    legalID = xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue;
                    localStorage.getlegal = 4;
                    var productid = xmlDoc.getElementsByTagName("LegalAssistance")[0].childNodes[0].nodeValue;
                    var productname = " Legal Assistance";
                    $("#legalas,#letb").show();

                    document.getElementById("lgimg").src = localStorage.imgUrlLegal;
                    $("#lgimg").show();
                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divle').className = "panelcollapsed";
                    $("#divle").show();
                }

                if (xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue == 'null' || xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue == null) {

                    localStorage.gettravel = 0;
                }
                else {
                    TravelID = xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue;
                    localStorage.gettravel = 5;
                    var productid = xmlDoc.getElementsByTagName("travelAssistance")[0].childNodes[0].nodeValue;
                    var productname = "Travel Assistance";
                    $("#travelas,#trtb").show();
                    document.getElementById("tlimg").src = localStorage.imgUrlTravel;
                    $("#tlimg").show();
                    $("#homeseperator").removeClass("middlecontent3");
                    document.getElementById('divtr').className = "panelcollapsed";
                    $("#divtr").show();

                } $(".trheight3").show();

                if (localStorage.gethome == 0 && localStorage.getmedical == 0 && localStorage.getroad == 0 && localStorage.getlegal == 0 && localStorage.gettravel == 0) {
                    $("#NOproductDiv").show();
                    $(".trheight3").hide();
                   /* prevPage = currentPage;
                    $.mobile.changePage('#indexservice', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'indexservice';
                    pageData.push(currentPage);*/

                } else {
                    $("#NOproductDiv").hide();
                  /*  prevPage = currentPage;
                    $.mobile.changePage('#indexservice', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'indexservice';
                    pageData.push(currentPage);*/
                }
            } //if
            else {
                if (xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0].nodeValue == 'NO MOBILEUSERGUID') {

                    localStorage.gettravel = 0;
                    localStorage.getlegal = 0;
                    localStorage.getroad = 0;
                    localStorage.getmedical = 0;
                    localStorage.gethome = 0;
                    $("#NOproductDiv").show();
                    $(".trheight3").hide();
                    
                   /* prevPage = currentPage;
                    $.mobile.changePage('#indexservice', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'indexservice';
                    pageData.push(currentPage);*/


                } else {
                    jAlert(xmlDoc.getElementsByTagName("MESSAGE")[0].childNodes[0].nodeValue, 'Info');
                    return false;
                }
            }
        }

    }

    catch (exp) {
        //alert(exp);
        jAlert("The System is temporarily unavailable, please try again later.", 'Info');
      /*  $.mobile.changePage('#indexservice', {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        currentPage = 'indexservice';
        pageData.push(currentPage);*/

    }
}


/*****************************************************************************************************
* PURPOSE :CreatePleaseCallMeRequestNew(Services indexervice.html)
* AUTHOR : kavya(call image reverse back)
* CREATED DATE : 11 FEB 2014
******************************************************************************************************/


function CreatePleaseCallMeRequestNew(type) {
    // alert("type::::::" + type);
    // alert("localStorage.count::::::" + localStorage.count);
    // alert("HomeID:::::::" + HomeID)
    var productiID = '';
    if (type == 'home' && localStorage.count == 0) {
    productiID = ''; productiID = HomeID; localStorage.count = 1; var europInputData = ""; europInputData = '<?xml version="1.0" encoding="utf-8"?>'; europInputData = europInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="https://api.europassistance.co.za/">'; europInputData = europInputData + '<soapenv:Header/>'; europInputData = europInputData + '<soapenv:Body>'; europInputData = europInputData + '<api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '<api:mobileUserGuid>' + localStorage.guid + '</api:mobileUserGuid>'; europInputData = europInputData + '<api:validateOnly>false</api:validateOnly>'; europInputData = europInputData + '<api:testOnly>true</api:testOnly>'; europInputData = europInputData + '<api:mobileProductGuid>' + productiID + '</api:mobileProductGuid>'; europInputData = europInputData + '<api:latitude>0</api:latitude>'; europInputData = europInputData + '<api:longitude>0</api:longitude>'; europInputData = europInputData + '</api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '</soapenv:Body>'; europInputData = europInputData + '</soapenv:Envelope>'; CallWebService('https://api.europassistance.co.za/services/MobileServices.asmx', europInputData, 'POST', 'text/xml', CreatePleaseCallMeRequestCallbackNew);
    } else if (type == 'medical' && localStorage.count == 0) {
    productiID = ''; productiID = MedicalID; localStorage.count = 1; var europInputData = ""; europInputData = '<?xml version="1.0" encoding="utf-8"?>'; europInputData = europInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="https://api.europassistance.co.za/">'; europInputData = europInputData + '<soapenv:Header/>'; europInputData = europInputData + '<soapenv:Body>'; europInputData = europInputData + '<api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '<api:mobileUserGuid>' + localStorage.guid + '</api:mobileUserGuid>'; europInputData = europInputData + '<api:validateOnly>false</api:validateOnly>'; europInputData = europInputData + '<api:testOnly>true</api:testOnly>'; europInputData = europInputData + '<api:mobileProductGuid>' + productiID + '</api:mobileProductGuid>'; europInputData = europInputData + '<api:latitude>0</api:latitude>'; europInputData = europInputData + '<api:longitude>0</api:longitude>'; europInputData = europInputData + '</api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '</soapenv:Body>'; europInputData = europInputData + '</soapenv:Envelope>'; CallWebService('https://api.europassistance.co.za/services/MobileServices.asmx', europInputData, 'POST', 'text/xml', CreatePleaseCallMeRequestCallbackNew);
    } else if (type == 'road' && localStorage.count == 0) {
     productiID = ''; productiID = RoadID; localStorage.count = 1; var europInputData = ""; europInputData = '<?xml version="1.0" encoding="utf-8"?>'; europInputData = europInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="https://api.europassistance.co.za/">'; europInputData = europInputData + '<soapenv:Header/>'; europInputData = europInputData + '<soapenv:Body>'; europInputData = europInputData + '<api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '<api:mobileUserGuid>' + localStorage.guid + '</api:mobileUserGuid>'; europInputData = europInputData + '<api:validateOnly>false</api:validateOnly>'; europInputData = europInputData + '<api:testOnly>true</api:testOnly>'; europInputData = europInputData + '<api:mobileProductGuid>' + productiID + '</api:mobileProductGuid>'; europInputData = europInputData + '<api:latitude>0</api:latitude>'; europInputData = europInputData + '<api:longitude>0</api:longitude>'; europInputData = europInputData + '</api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '</soapenv:Body>'; europInputData = europInputData + '</soapenv:Envelope>'; CallWebService('https://api.europassistance.co.za/services/MobileServices.asmx', europInputData, 'POST', 'text/xml', CreatePleaseCallMeRequestCallbackNew);
    } else if (type == 'legal' && localStorage.count == 0) {
    productiID = ''; productiID = legalID; localStorage.count = 1; var europInputData = ""; europInputData = '<?xml version="1.0" encoding="utf-8"?>'; europInputData = europInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="https://api.europassistance.co.za/">'; europInputData = europInputData + '<soapenv:Header/>'; europInputData = europInputData + '<soapenv:Body>'; europInputData = europInputData + '<api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '<api:mobileUserGuid>' + localStorage.guid + '</api:mobileUserGuid>'; europInputData = europInputData + '<api:validateOnly>false</api:validateOnly>'; europInputData = europInputData + '<api:testOnly>true</api:testOnly>'; europInputData = europInputData + '<api:mobileProductGuid>' + productiID + '</api:mobileProductGuid>'; europInputData = europInputData + '<api:latitude>0</api:latitude>'; europInputData = europInputData + '<api:longitude>0</api:longitude>'; europInputData = europInputData + '</api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '</soapenv:Body>'; europInputData = europInputData + '</soapenv:Envelope>'; CallWebService('https://api.europassistance.co.za/services/MobileServices.asmx', europInputData, 'POST', 'text/xml', CreatePleaseCallMeRequestCallbackNew);
    } else if (type == 'travel' && localStorage.count == 0) {
    productiID = ''; productiID = TravelID; localStorage.count = 1; var europInputData = ""; europInputData = '<?xml version="1.0" encoding="utf-8"?>'; europInputData = europInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:api="https://api.europassistance.co.za/">'; europInputData = europInputData + '<soapenv:Header/>'; europInputData = europInputData + '<soapenv:Body>'; europInputData = europInputData + '<api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '<api:mobileUserGuid>' + localStorage.guid + '</api:mobileUserGuid>'; europInputData = europInputData + '<api:validateOnly>false</api:validateOnly>'; europInputData = europInputData + '<api:testOnly>true</api:testOnly>'; europInputData = europInputData + '<api:mobileProductGuid>' + productiID + '</api:mobileProductGuid>'; europInputData = europInputData + '<api:latitude>0</api:latitude>'; europInputData = europInputData + '<api:longitude>0</api:longitude>'; europInputData = europInputData + '</api:CreatePleaseCallMeRequest>'; europInputData = europInputData + '</soapenv:Body>'; europInputData = europInputData + '</soapenv:Envelope>'; CallWebService('https://api.europassistance.co.za/services/MobileServices.asmx', europInputData, 'POST', 'text/xml', CreatePleaseCallMeRequestCallbackNew);
    } else {
        productiID = '735c8b67-37c4-4f72-af94-105a26e22d2c';
    }
}

function CreatePleaseCallMeRequestCallbackNew(responseData) {
    responseData = responseData.replace(/&gt;/gi, '>');
    responseData = responseData.replace(/&lt;/gi, '<');
    var parser = new DOMParser();
    if (responseData !== "") {
        xmlDoc = parser.parseFromString(responseData, "text/xml");
        xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].nodeValue;
        if (xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].nodeValue != 0) {
            jAlert(xmlDoc.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue, 'Info');
            //jAlert(xmlDoc.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue);
        } else {
            jAlert('Thank you for contacting us, we will call you soon.', 'Info');
            //alert("Thank you for contacting us, we will call you soon")
        }
    }
}





/*****************************************************************************************************
* PURPOSE :Registration
* AUTHOR : Asha
* CREATED DATE : 14 DEC 2013
******************************************************************************************************/


function UserRegistration() {

    // window.resizeTo($(window).width(), $(window).height());
    try {
        $(window).scrollTop(0);//sometimes alert box goes down 
        prevPage = currentPage;
        var Name = document.getElementById('txtRegName').value;
        var SurName = document.getElementById('txtRegSurName').value;
        var EmailID = document.getElementById('txtRegEmail').value;
        var CellNumber = document.getElementById('txtRegCell').value;
        if (CellNumber.charAt(3) == 0) {
            CellNumberResult = CellNumber.replace(CellNumber.charAt(3), '');
        }
        else {
            CellNumberResult = CellNumber;
        }
        var IdNumber = document.getElementById('txtRegIDNo').value;
        var policyno = document.getElementById('txtRegPolicyNumber').value;
        var unameexp = /^[A-Za-z ']*$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var checkbox1 = document.getElementById('chk');
        var pattern = /^\d{11}$/;
        // var pattern = ^(\d{9}|\d{11})$;
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var curimgsource = document.getElementById('chkAcceptTerms').src;
        var idexp = /^(\d{13})$/;
        var num = /^(\(?\+?[0-9]*\)?)*$/g;
        //var pwd = ^[0-9]{5}$
        var pwd = /^\d{5}$/;
        var checnum = /^\d+$/;
        if (Name == "") {
            jAlert("Please enter your first name!", 'Info');
        
            return false;
        }
        else if (!Name.match(unameexp)) {
            jAlert("Please enter your first name!", 'Info');
            return false;
        }
        else if (SurName == "") {
            jAlert("Please enter your surname!", 'Info');
            return false;
        }
        else if (!SurName.match(unameexp)) {
            jAlert("Please enter your surname!", 'Info');
            return false;
        }
        else if (EmailID == "") {
            jAlert("Please enter your email address!", 'Info');
            return false;
        }
        else if (EmailID.indexOf("@", 0) < 0) {
            jAlert("Please enter a valid Email address!", 'Info');
            return false;
        }

        else if (EmailID.indexOf(".", 0) < 0) {
            jAlert("Please enter your email address!", 'Info');
            return false;
        }

        else if (CellNumberResult == "+27") {
            jAlert("Please enter your cellphone number!", 'Info');
            return false;
        } else if (!CellNumberResult.match(num)) {
            jAlert("Please enter a valid cellphone number!", 'Info');
            return false;
        }
        else if (CellNumberResult.length < '12') {
            jAlert("Please enter a valid cellphone number!", 'Info'); return false;
        }
        else if (CellNumberResult.length > '12') {
            jAlert("Please enter a valid cellphone number!", 'Info'); return false;
        }
        else if (IdNumber == "") {
            jAlert("Please enter your ID Number!", 'Info');
            return false;
        }
        else if (!IdNumber.match(idexp)) {
            jAlert("Please enter a valid 13 digit ID number!", 'Info');
            return false;
        }
        else if (policyno == "") {
            jAlert("Please enter your Policy Number!", 'Info');
            return false;
        } else if (!policyno.match(checnum)) {
            jAlert("Please enter valid Policy number!", 'Info');
            return false;
        }
        else if (policyno.length < 8) {
            jAlert("Please enter a valid  8 digit Policy number!", 'Info');
           
        }
        else if (curimgsource.indexOf('acceptedbutton.png') < 0) {
            jAlert("Please accept the Terms and Conditions!", 'Info');
            return false;
        }
        else {
            CellNumberResult = CellNumberResult.slice(1);
           
            RegisterUserNew(Name, SurName, userName, CellNumberResult, passowrd, IdNumber, EmailID, policyno);
        }

    }
    catch (ex) {
        //   alert("aaaaaaaaa"+ex);
    }

}

function RegisterUserNew(Name, SurName, userName, CellNumberResult, passowrd, IdNumber, EmailID, policyno) {
    try {
        localStorage.Name = Name;
        localStorage.SurName = SurName;
        localStorage.EmailID = EmailID;
        localStorage.CellNumber = CellNumberResult;
        //alert(localStorage.CellNumber);
        var registeruserdata = "";
        registeruserdata = '<?xml version="1.0" encoding="utf-8"?>';
        registeruserdata = registeruserdata + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
        registeruserdata = registeruserdata + '<soap:Body>';
        registeruserdata = registeruserdata + '<MobileUserRegister xmlns="http://tempuri.org/">';
        registeruserdata = registeruserdata + '<Name>' + Name + '</Name>';
        registeruserdata = registeruserdata + '<Surname>' + SurName + '</Surname>';
        registeruserdata = registeruserdata + '<username>' + userName + '</username>';
        registeruserdata = registeruserdata + '<CellNumber>' + CellNumberResult + '</CellNumber>';
        registeruserdata = registeruserdata + '<Password>' + passowrd + '</Password>';
        registeruserdata = registeruserdata + '<IdNumber>' + IdNumber + '</IdNumber>';
        registeruserdata = registeruserdata + '<EmailID>' + EmailID + '</EmailID>';
        registeruserdata = registeruserdata + '<policyno>' + policyno + '</policyno>';
        registeruserdata = registeruserdata + '</MobileUserRegister>';
        registeruserdata = registeruserdata + '</soap:Body>';
        registeruserdata = registeruserdata + '</soap:Envelope>';
        //alert(registeruserdata);
        CallWebService('http://118.139.160.226/Europewebservice/EuropeAssistStaticDataWS.asmx?op=MobileUserRegister', registeruserdata, 'POST', 'text/xml', RegisterUserCallback);
        // CallWebService('http://118.139.160.226:8058/EuropeAssistStaticDataWS.asmx?op=MobileUserRegister', registeruserdata, 'POST', 'text/xml', RegisterUserCallback);

    } catch (exp) {
        //alert(exp);
    }

}




function RegisterUserCallback(responseData) {
    try {
        window.resizeTo($(window).width(), $(window).height());
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            var xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0] != null && xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0] != "" && xmlDoc.getElementsByTagName("MobileUserRegisterResult")[0] != undefined) {
                if (xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].nodeValue == '-1') {
                    //User already registered.
                    jAlert(xmlDoc.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue, 'Info');
                    return false;
                } else if (xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].nodeValue == '0' || xmlDoc.getElementsByTagName("ErrorCode")[0].childNodes[0].nodeValue == 0) {
                    prevPage = currentPage;
                    $.mobile.changePage('#indexPage', {
                        transition: "none",
                        reverse: true,
                        changeHash: false
                    });
                    currentPage = 'indexPage';
                    pageData.push(currentPage);
                    jAlert('Registration successful, Thank you for registering.', 'Info');
                    return false;
                } 
                else {
                    jAlert(xmlDoc.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue, 'Info', function (r) {
                        if (r == true) {
                            // jAlert('Register is successfull. You can login to the application, but you have no access to Europe Assist services', 'Info');
                            jAlert('Registration has been successful. You can now login to the application with limited access within the application', 'Info');
                            prevPage = currentPage;
                            $.mobile.changePage('#indexPage', {
                                transition: "none",
                                reverse: true,
                                changeHash: false
                            });
                            currentPage = 'indexPage';
                            pageData.push(currentPage);


                        }

                    });

                }
               


            }
            else {
                jAlert("Register Failed.", 'Info');
                return false;
            }
        }
    }
    catch (exp) {

    }
}


function oncheck() {
    var curimgsource = document.getElementById('chkAcceptTerms').src;
    // alert(curimgsource.indexOf());
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

function gotoRegFirstPage() {


    document.getElementById('txtusernameregfirst').value = "";
    document.getElementById('txtpwregfirst').value = "";
    document.getElementById('txtconfirmpwregfirst').value = "";

    prevPage = currentPage;
    $.mobile.changePage('#RegFstPage', {
        transition: "none",
        reverse: false,
        changeHash: false
    });
    currentPage = 'RegFstPage';
    pageData.push(currentPage);

}

//txtusernameregfirst




/*******Second time click clear all fields in page & navigate ****/

function gotoRegister() {
    $(window).scrollTop(0);
    var regfirstuname = document.getElementById('txtusernameregfirst').value;
    var regfirstpw = document.getElementById('txtpwregfirst').value;
    var regfirstconfirmpw = document.getElementById('txtconfirmpwregfirst').value;
    var unameexp = /^[A-Za-z ']*$/;

    if (regfirstuname == "") {
        jAlert("Please enter your username!", 'Info');
        return false;
    }
    else if (!regfirstuname.match(unameexp)) {
        jAlert("Please enter a valid username!", 'Info');
        return false;
    }

    if (regfirstpw == "") {
        jAlert("Please enter your password!", 'Info');
        return false;
    }
    //alert(regfirstpw.length);
    if (regfirstpw.length < 5) {
        // jAlert("hello" + Password);
        jAlert("Password must contain at least five characters!", 'Info');
        return false;
    }

    if (regfirstconfirmpw == "") {
        jAlert("Please confirm your password!", 'Info');
        return false;
    }
    if (regfirstconfirmpw != regfirstpw) {
        jAlert("Passwords typed do not match, please re-enter your password!", 'Info');
        return false;

    }
    else {

        userName = regfirstuname;
        passowrd = regfirstpw;
        prevPage = currentPage;
        document.getElementById('txtRegName').value = "";
        document.getElementById('txtRegSurName').value = "";
        document.getElementById('txtRegEmail').value = "";
        document.getElementById('txtRegCell').value = "+27";
        document.getElementById('txtRegIDNo').value = "";
        document.getElementById('txtRegPolicyNumber').value = "";
        var curimgsource = document.getElementById('chkAcceptTerms').src;
        document.getElementById('chkAcceptTerms').src = "public/images/checkbox.png";
        $.mobile.changePage('#reg', {
            transition: "none",
            reverse: false,
            changeHash: false
        });
        currentPage = 'reg';
        pageData.push(currentPage);
    }

}

/*****************************************************************************************************
* PURPOSE :ForgotPassword
* AUTHOR : Asha
* CREATED DATE : 14 DEC 2013
******************************************************************************************************/
function ForgotPasswordValidation() {
    var num = /^(\(?\+?[0-9]*\)?)*$/g;
    var cellRemoveFirstZero;
    var FCellNumber = document.getElementById('txtfpcellno').value;
    if (FCellNumber.charAt(3) == 0) {
        cellRemoveFirstZero = FCellNumber.replace(FCellNumber.charAt(3), '');

    }
    else {
        cellRemoveFirstZero = FCellNumber;

    }
    if (document.getElementById('txtfpcellno').value == "+27") {
        jAlert("Please enter your cellphone number!", 'Info');

    } else if (!cellRemoveFirstZero.match(num)) {

        jAlert("Please enter a valid cellphone number!", 'Info');

    }
    else if (cellRemoveFirstZero.length < '12') {
        jAlert("Please enter a valid cellphone number!", 'Info');

    }
    else if (cellRemoveFirstZero.length > '12') {
        jAlert("Please enter a valid cellphone number!", 'Info');

    } else {
        var FCellNumber = document.getElementById('txtfpcellno').value;
        cellRemoveFirstZero = cellRemoveFirstZero.slice(1);
        //alert(cellRemoveFirstZero);
        ForgotPasswordService(cellRemoveFirstZero);
    }
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


    // CallWebService('http://118.139.160.226/Europewebservice/EuropeAssistStaticDataWS.asmx?op=ForgotPassword', forgotpwdata, 'POST', 'text/xml', ForgotPasswordServiceCallback);
    // CallWebService('http://118.139.160.226:8058/EuropeAssistStaticDataWS.asmx?op=ForgotPassword', forgotpwdata, 'POST', 'text/xml', ForgotPasswordServiceCallback);
    //  CallWebService('http://117.247.177.228:8079/EuropeAssistStaticDataWS.asmx?op=ForgotPassword', forgotpwdata, 'POST', 'text/xml', ForgotPasswordServiceCallback);
    CallWebService('http://197.96.19.188/EASAwebservice/EuropeAssistStaticDataWS.asmx?op=ForgotPassword', forgotpwdata, 'POST', 'text/xml', ForgotPasswordServiceCallback);


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
                jAlert("Please Enter a Valid CellNumber.", 'Info');
                return false;
            }
            else {
                // jAlert("Thank you,We have sent you an Email with your password", 'Info');
                //   jAlert("Thank you,We have sent your password to the registered EmailAddress", 'Info');
                // jAlert("Thank you,We have sent your password to your registered EmailAddress", 'Info');
                jAlert("Thank you. We have sent your password to the registered email address listed", 'Info');

                prevPage = currentPage;
                $.mobile.changePage('#indexPage', {
                    transition: "none",
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
    document.getElementById('txtfpcellno').value = "+27";
    $.mobile.changePage('#ForgotPassword', {
        transition: "none",
        reverse: false,
        changeHash: false
    });
    currentPage = 'ForgotPassword';
    pageData.push(currentPage);
}



function ShowExitDialog() {
    //alert(localStorage.loginID + '::' + localStorage.randgosessionid);
    if (localStorage.loginID == 0 || localStorage.loginID == null || localStorage.loginID == '' || localStorage.loginID == 'null') {
        localStorage.randgosessionid = null;
    }
    device.exitApp();
}

function gotoHelp() {
    if (checkLogin()) {
        var qtnvalue = 0;
        // $("#tbldisplaycategoriesbycid tr").remove();
        //$("#tbldisplaymerchantdeals tr").remove();
        $("#tblhelp tr").remove()
        document.getElementById('loaddingimg').style.display = "block";
        setTimeout(function () {
            ;
            prevPage = currentPage;
            $.mobile.changePage('#indexhelp', {
                transition: "none",
                reverse: false,
                changeHash: false
            });
            currentPage = 'indexhelp';
            pageData.push(currentPage);


            DisplayHelpDetails(qtnvalue);
        },
200);
    }
}

/*****************************************************************************************************
* PURPOSE :DisplayHelpDetails(indexhelp)
* AUTHOR : ASHA
* CREATED DATE : Jan 13 2014
******************************************************************************************************/

function DisplayHelpDetails(qtnvalue) {
    var helpInputData = '';
    helpInputData = '<?xml version="1.0" encoding="utf-8"?>';
    helpInputData = helpInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    helpInputData = helpInputData + '<soap:Body>';
    helpInputData = helpInputData + '<GetFAQs xmlns="http://tempuri.org/">'
    helpInputData = helpInputData + '<FAQID> ' + qtnvalue + ' </FAQID>'
    helpInputData = helpInputData + '</GetFAQs>'
    helpInputData = helpInputData + '</soap:Body>';
    helpInputData = helpInputData + '</soap:Envelope>';

    CallWebService('http://118.139.160.226/Europewebservice/EuropeAssistStaticDataWS.asmx?op=GetFAQs', helpInputData, 'POST', 'text/xml', DisplayHelpDetailsCallback);
    // CallWebService('http://118.139.160.226:8058/EuropeAssistStaticDataWS.asmx?op=GetFAQs', helpInputData, 'POST', 'text/xml', DisplayHelpDetailsCallback);

}

function DisplayHelpDetailsCallback(responseData) {

    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                var gettblhelp = document.getElementById('tblhelp');
                gettblhelp.innerHTML = "";
                if (xmlDoc.getElementsByTagName("FAQs") != null && xmlDoc.getElementsByTagName("FAQs").length > 0) {

                    var faqlist = xmlDoc.getElementsByTagName("FAQs");
                    for (var i = 0; i < faqlist.length; i++) {
                        var rowcount = gettblhelp.rows.length;
                        var row = gettblhelp.insertRow(rowcount);
                        var question = xmlDoc.getElementsByTagName("FAQName")[i].textContent;
                        var faqrowid = xmlDoc.getElementsByTagName("FAQID")[i].textContent;
                        row.setAttribute('id', 'row' + faqrowid);
                        var cell = row.insertCell(0);
                        /*** question ***/
                        var divques = document.createElement("div");
                        var lblhelp = document.createElement("label");
                        lblhelp.innerHTML = xmlDoc.getElementsByTagName("FAQName")[i].textContent;
                        divques.appendChild(lblhelp);
                        cell.appendChild(divques);
                        divques.setAttribute('class', 'textstyle3new');
                        /*** img ***/
                        var divimg = document.createElement("div");
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/rightsymbolarrow.png';
                        divimg.appendChild(img);
                        cell.appendChild(divimg);
                        divimg.setAttribute('class', 'regcol1new');
                        cell.setAttribute('class', 'qtn1');
                        row.onclick = function () {
                            document.getElementById('loaddingimg').style.display = "block";
                            //setTimeout(function () {
                            var FAQhelpID = this.id;
                            FAQhelpID = FAQhelpID.replace('row', '');
                            $("#tblquestionans tr").remove();
                            setTimeout(function () {
                                prevPage = currentPage;
                                $.mobile.changePage('#qtnanswers', {
                                    transition: "none",
                                    reverse: false,
                                    changeHash: false
                                });
                                currentPage = 'qtnanswers';
                                pageData.push(currentPage);
                                DisplayQuestionAnswers(FAQhelpID);
                            }, 200);

                        }

                    }

                }
            }
        } catch (exp) {
            //alert("exp:::::::::::" + exp)
        }

    }
}


/*****************************************************************************************************
* PURPOSE :DisplayQuestionAnswers(helpID)
* AUTHOR : ASHA
* CREATED DATE : Jan 13 2014
******************************************************************************************************/
function DisplayQuestionAnswers(FAQhelpID) {
    var helpInputData = '';
    helpInputData = '<?xml version="1.0" encoding="utf-8"?>';
    helpInputData = helpInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    helpInputData = helpInputData + '<soap:Body>';
    helpInputData = helpInputData + '<GetFAQs xmlns="http://tempuri.org/">'
    helpInputData = helpInputData + '<FAQID>' + FAQhelpID + '</FAQID>'
    helpInputData = helpInputData + '</GetFAQs>'
    helpInputData = helpInputData + '</soap:Body>';
    helpInputData = helpInputData + '</soap:Envelope>';

    CallWebService('http://118.139.160.226/Europewebservice/EuropeAssistStaticDataWS.asmx?op=GetFAQs', helpInputData, 'POST', 'text/xml', DisplayQuestionAnswersCallback);
    // CallWebService('http://118.139.160.226:8058/EuropeAssistStaticDataWS.asmx?op=GetFAQs', helpInputData, 'POST', 'text/xml', DisplayQuestionAnswersCallback);

}


function DisplayQuestionAnswersCallback(responseData) {
    //alert("questions:::ANS:::::::" + responseData);
    if (checkLogin()) {
        try {

            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");

                var gettblquestionans = document.getElementById('tblquestionans');
                gettblquestionans.innerHTML = "";
                if (xmlDoc.getElementsByTagName("FAQs") != null && xmlDoc.getElementsByTagName("FAQs").length > 0) {
                    var faqlist = xmlDoc.getElementsByTagName("FAQs");
                    for (var i = 0; i < faqlist.length; i++) {

                        var rowcount = gettblquestionans.rows.length;
                        var row = gettblquestionans.insertRow(rowcount);

                        // var rowid = xmlDoc.getElementsByTagName("FAQID")[i].textContent;
                        var question = xmlDoc.getElementsByTagName("FAQName")[i].textContent;

                        var ans = xmlDoc.getElementsByTagName("Description")[i].textContent;

                        var cell1 = row.insertCell(0);
                        cell1.setAttribute('width', '100%');

                        var lblquestion = document.createElement("label");
                        var lblquestionformat = xmlDoc.getElementsByTagName("FAQName")[i].textContent;
                        lblquestionformat = lblquestionformat.replace(/&lt;/g, '<');
                        lblquestionformat = lblquestionformat.replace(/&gt;/g, '/>');
                        lblquestionformat = lblquestionformat.replace(/&quot;/g, '"');
                        lblquestionformat = lblquestionformat.replace(/&nbsp;/g, ' ');
                        lblquestionformat = lblquestionformat.replace(/&amp;/g, '&');
                        lblquestionformat = lblquestionformat.replace(/&#39;/g, "'");
                        lblquestion.innerHTML = lblquestionformat;
                        lblquestion.setAttribute('class', 'textstyle3 qtnbot');
                        cell1.appendChild(lblquestion);

                        rowcount = gettblquestionans.rows.length;
                        var row2 = gettblquestionans.insertRow(rowcount);

                        var cell2 = row2.insertCell(0);
                        cell2.setAttribute('width', '100%');

                        var lblans = document.createElement("label");
                        var lblansremovebreak = xmlDoc.getElementsByTagName("Description")[i].textContent
                        lblansremovebreak = lblansremovebreak.replace(/&lt;/g, '<');
                        lblansremovebreak = lblansremovebreak.replace(/&gt;/g, '/>');
                        lblansremovebreak = lblansremovebreak.replace(/&quot;/g, '"');
                        lblansremovebreak = lblansremovebreak.replace(/&nbsp;/g, ' ');
                        lblansremovebreak = lblansremovebreak.replace(/&amp;/g, '&');
                        lblansremovebreak = lblansremovebreak.replace(/&#39;/g, "'");
                        lblans.innerHTML = lblansremovebreak;
                        lblans.setAttribute('class', 'qtncontent');
                        cell2.appendChild(lblans);

                        $("a").removeAttr('href');
                    }

                }

            }
        } catch (exp) {
            // alert("exp:::::::::" + exp);
        }


    }
}



function GetMoreInfo(pageType) {
    if (checkLogin()) {
        document.getElementById('loaddingimg').style.display = "block";
        setTimeout(function () {

            prevPage = currentPage;
            $.mobile.changePage('#clickformoreinfo', {
                transition: "none",
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
            document.getElementById('loaddingimg').style.display = "none";

            $("a").removeAttr('href');

        },
        200);
    }
}

/*****************************************************************************************************
* PURPOSE :gotoFstpage
* CREATED DATE : feb 1 2014
******************************************************************************************************/

function gotoFstpage(pagename) {
    document.getElementById('txtusernameregfirst').value = "";
    document.getElementById('txtpwregfirst').value = "";
    document.getElementById('txtconfirmpwregfirst').value = "";
    document.getElementById('txtLoginUserName').value = "";
    document.getElementById('txtLoginPassword').value = "";
    Pagename = pagename;
    //$('#txtusernameregfirst,#txtpwregfirst,#txtconfirmpwregfirst').val('');
    var inputData = '';
    inputData = '<?xml version="1.0" encoding="utf-8"?>';
    inputData = inputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    inputData = inputData + '<soap:Body>';
    inputData = inputData + '<EAAppConfig  xmlns="http://tempuri.org/" />';
    inputData = inputData + '</soap:Body>';
    inputData = inputData + '</soap:Envelope>';
    CallWebService('http://dsg.star-knowledge.com/service.asmx', inputData, 'POST', 'text/xml', checkAppLogin);
}
function checkAppLogin(responseData) {
    responseData = responseData.replace(/&gt;/gi, '>');
    responseData = responseData.replace(/&lt;/gi, '<');
    try {
        if (responseData != '' && responseData != null) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(responseData, "text/xml");
            if (doc.getElementsByTagName('EAAppConfigResult')[0].textContent != null && doc.getElementsByTagName('EAAppConfigResult')[0].textContent != undefined) {
                if (doc.getElementsByTagName('EAAppConfigResult')[0].textContent == 1) {
                    if (Pagename == 'reg') {
                        prevPage = currentPage;
                        $.mobile.changePage('#RegFstPage', {
                            transition: "none",
                            reverse: true,
                            changeHash: false
                        });
                        currentPage = 'RegFstPage';
                        pageData.push(currentPage);
                    } else if (Pagename == 'login') {
                        prevPage = currentPage;
                        $.mobile.changePage('#log', {
                            transition: "none",
                            reverse: true,
                            changeHash: false
                        });
                        currentPage = 'log';
                        pageData.push(currentPage);
                    } else {
                        gotoService();
                    }
                } else {
                    if (window.localStorage.getItem("loginID") == 1) {
                        prevPage = currentPage;
                        $.mobile.changePage('#indexPage', {
                            transition: "none",
                            reverse: true,
                            changeHash: false
                        });
                        currentPage = 'indexPage';
                        pageData.push(currentPage);
                        window.localStorage.setItem("randgosessionid", "null");
                        window.localStorage.setItem("loginID", 0);
                        localStorage.gettravel = 0;
                        localStorage.getlegal = 0;
                        localStorage.getroad = 0;
                        localStorage.getmedical = 0;
                        localStorage.gethome = 0;
                    } else {
                        jAlert("The System is temporarily unavailable, please try again later.", 'Info');
                        document.getElementById('loaddingimg').style.display = "none";
                    }
                }
            } else {
                jAlert("The System is temporarily unavailable, please try again later.", 'Info');
                document.getElementById('loaddingimg').style.display = "none";
            }
        } else {
            jAlert("The System is temporarily unavailable, please try again later.", 'Info');
            document.getElementById('loaddingimg').style.display = "none";
        }
    } catch (ex) {
    }
}
