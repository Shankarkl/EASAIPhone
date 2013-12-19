
/*****************************************************************************************************
* PURPOSE : PAY A FRIEND
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function Peertopeer(currency, amount, peernumber, peer, stm, sms) {
    //PAY A  FRIEND INPUT
    var wiInputData = '';
    wiInputData = 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<peertopeerrx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '<currencyid>2</currencyid>';
    wiInputData = wiInputData + '<amount>' + amount + '</amount>';
    wiInputData = wiInputData + '<peermobilenum>' + peernumber + '</peermobilenum>';
    wiInputData = wiInputData + '<peerusername>' + peer + '</peerusername>';
    wiInputData = wiInputData + '<stmtref>' + stm + '</stmtref>';
    wiInputData = wiInputData + '<sendsms>' + sms + '</sendsms>';
    wiInputData = wiInputData + '</peertopeerrx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', wiPeertopeerCallBack);

}

/*function wiPeertopeerCallBack(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("message")[0] != null) {
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
                $.mobile.changePage('#transactionsuccessful', {
                    transition: "slide",
                    reverse: false,
                    changeHash: false
                });
                
                //window.location.href = "../Wallet/transactionsuccessful.html";
            }
        }
    } catch (exp) {

    }
}*/


function wiPeertopeerCallBack(responseData) {
    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                if (xmlDoc.getElementsByTagName("responsedesc")[1].textContent == "Success") {
                    prevPage = currentPage;
                    $.mobile.changePage('#transactionsuccessful', {
                        transition: "slide",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'transactionsuccessful';
                    pageData.push(currentPage);
                }
                else {
                    jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
                    //window.location.href = "../Wallet/transactionsuccessful.html";
                }
            }
        } catch (exp) {

        }
    }
}

/*****************************************************************************************************
* PURPOSE : Airtime Purchase
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function AirtimePurchase(denominationId, Amount, recipient) {
    //Airtime voucher display
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<airtimepurchaserx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '<currencyid>2</currencyid>';
    wiInputData = wiInputData + '<denomid>' + denominationId + '</denomid>';
    wiInputData = wiInputData + '<amount>' + Amount + '</amount>';
    wiInputData = wiInputData + '<recipient>' + recipient + '</recipient>';
    wiInputData = wiInputData + '</airtimepurchaserx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', AirtimePurchaseCallBack);
   // alert('inputdata' + wiInputData);
}



function AirtimePurchaseCallBack(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("message")[0] != null) {
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
            }
        }
    } catch (exp) {

    }
}


/*****************************************************************************************************
* PURPOSE : Airtime denomination list
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function Airtimedenomlist() {
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<trxhistorystmtrx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '</trxhistorystmtrx>';
    wiInputData = wiInputData + '</wiapp>';

    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', TransactionHistoryCallBack);

}



function TransactionHistoryCallBack(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        if (responseData !== "") {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            var gettbltranshistory = document.getElementById('tbltranshistory');
            gettbltranshistory.innerHTML = null;
            if (xmlDoc.getElementsByTagName("desc") != null && xmlDoc.getElementsByTagName("desc").length > 0) {

                for (var i = 0; i < xmlDoc.getElementsByTagName("desc").length; i++) {
                    var rowcount = gettbltranshistory.rows.length;
                    var row = gettbltranshistory.insertRow(rowcount);

                    if (i % 2 == 0) {
                        row.setAttribute('class', 'calender');
                    } else {
                        row.setAttribute('class', 'cal');
                    }

                    var transid = xmlDoc.getElementsByTagName('id')[i].textContent
                    row.setAttribute('id', 'row' + transid);

                    var celldate = row.insertCell(0);
                    var lbldate = document.createElement("label");
                    celldate.appendChild(lbldate);
                    celldate.setAttribute('class', 'cell');
                    celldate.setAttribute('align', 'center');
                    lbldate.innerHTML = xmlDoc.getElementsByTagName("date")[i].textContent;

                    var cellcurrency = row.insertCell(1);
                    var lblcurrency = document.createElement("label");
                    cellcurrency.appendChild(lblcurrency);
                    cellcurrency.setAttribute('class', 'cell');
                    cellcurrency.setAttribute('align', 'center');
                    lblcurrency.innerHTML = xmlDoc.getElementsByTagName("currency")[i].textContent;

                    var cellamount = row.insertCell(2);
                    var lblamount = document.createElement("label");
                    cellamount.appendChild(lblamount);
                    cellamount.setAttribute('class', 'cell');
                    cellamount.setAttribute('align', 'center');
                    lblamount.innerHTML = xmlDoc.getElementsByTagName("amount")[i].textContent;
                }
            }
            else {
                jAlert("No Data found", 'Info');
            }
        }
    } catch (exp) {

    }
}



/*****************************************************************************************************
* PURPOSE :BillPayment
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function BillPayment(bill, amount) {
    //BillPayment
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051cbd55ae0456">';
    wiInputData = wiInputData + '<epbillpaymentrx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '<currencyid>2</currencyid>';
    wiInputData = wiInputData + '<billacctnum>' + bill + '</billacctnum>';
    wiInputData = wiInputData + '<amount>' + amount + '</amount>';
    wiInputData = wiInputData + '</epbillpaymentrx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', BillPaymentCallBack);
}

/*function BillPaymentCallBack(responseData) {
    try {

        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("message")[0] != null) {
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
            }
        }
    } catch (exp) {

    }
}*/

function BillPaymentCallBack(responseData) {
    if (checkLogin()) {
        try {

            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                if (xmlDoc.getElementsByTagName("responsedesc")[1].textContent == "Success") {
                    prevPage = currentPage;
                    $.mobile.changePage('#transactionsuccessful', {
                        transition: "slide",
                        reverse: false,
                        changeHash: false
                    });

                    currentPage = 'transactionsuccessful';
                    pageData.push(currentPage);
                }
                else {
                    jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
                    //window.location.href = "../Wallet/transactionsuccessful.html";
                }
            }
        } catch (exp) {

        }
    }
}

/*****************************************************************************************************
* PURPOSE :Electricity Purchase
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function ElectricityPurchase(met, amount) {
    //ElectricityPurchase
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051cbdbde52ed4">';
    wiInputData = wiInputData + '<electricitypurchaserx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '<currencyid>2</currencyid>';
    wiInputData = wiInputData + '<meterid>' + met + '</meterid >';
    wiInputData = wiInputData + '<amount>' + amount + '</amount>';
    wiInputData = wiInputData + '</electricitypurchaserx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', ElectricityPurchaseCallBack);
}

/*function ElectricityPurchaseCallBack(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("responsedesc")[0] != null) {
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');

                //window.location.href = "../Wallet/transactionsuccessful.html";
            }
        }
    } catch (exp) {

    }
}*/

function ElectricityPurchaseCallBack(responseData) {
    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                if (xmlDoc.getElementsByTagName("responsedesc")[1].textContent == "Success") {
                    prevPage = currentPage;
                    $.mobile.changePage('#transactionsuccessful', {
                        transition: "slide",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'transactionsuccessful';
                    pageData.push(currentPage);


                }
                else {
                    jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
                    //window.location.href = "../Wallet/transactionsuccessful.html";
                }
            }
        } catch (exp) {

        }
    }
}

/*****************************************************************************************************
* PURPOSE : Checkbalance
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function Checkbalance() {
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051cbe00258a44">';
    wiInputData = wiInputData + '<subbalancerx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '<currencyid>2</currencyid>';
    wiInputData = wiInputData + '</subbalancerx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', CheckbalanceCallBack);
}

function CheckbalanceCallBack(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();

        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("message")[0] != null) {
                document.getElementById('tdCurrentBalance').innerHTML = xmlDoc.getElementsByTagName("value")[0].textContent;
            }
        }
    } catch (exp) {

    }
}


/*****************************************************************************************************
* PURPOSE : Airtime List
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function AirtimeList() {
    //Airtime voucher display
    var wiInputData = '';

    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<airtimeproviderlistrx>';
    wiInputData = wiInputData + '<type>AIRTIME</type>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '<currencyid>2</currencyid>';
    wiInputData = wiInputData + '</airtimeproviderlistrx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', AirtimeListCallBack);
}

function AirtimeListCallBack(responseData) {
    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            if (responseData !== "") {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(responseData, "text/xml");

                var gettblairtimelist = document.getElementById('tblairtimelist');
                gettblairtimelist.innerHTML = null;
                if (xmlDoc.getElementsByTagName("desc") != null && xmlDoc.getElementsByTagName("desc").length > 0) {

                    var airtimelistdata = xmlDoc.getElementsByTagName("desc");
                    for (var i = 0; i < airtimelistdata.length; i++) {
                        var rowcount = gettblairtimelist.rows.length;
                        var row = gettblairtimelist.insertRow(rowcount);

                        row.setAttribute('class', 'tdbgc');

                        var airtimeid = xmlDoc.getElementsByTagName("id")[i].textContent;
                        row.setAttribute('id', 'row' + airtimeid);

                        var cellBlank = row.insertCell(0);
                        cellBlank.setAttribute('class', 'regcol1');

                        var cell = row.insertCell(1);
                        var lblairtime = document.createElement("label");
                        cell.appendChild(lblairtime);
                        cell.setAttribute('class', 'textstyle1 menulist');
                        lblairtime.innerHTML = xmlDoc.getElementsByTagName("desc")[i].textContent;

                        var celimg = row.insertCell(2);
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/singlerightarrow.png';
                        celimg.setAttribute('class', 'regcol2');
                        img.setAttribute('class', 'rightarr');
                        celimg.appendChild(img);

                        //var cellBlank2 = row.insertCell(3);
                        //cellBlank2.setAttribute('class', 'regcol1');


                        row.onclick = function () {
                            localStorage.providerId = this.id.replace('row', '');
                            //Heading
                            var AlistName = this.innerText.replace(/%20/g, ' ');
                            document.getElementById('vodacomheader').innerHTML = AlistName;
                            prevPage = currentPage;
                            $.mobile.changePage('#vodacom', {
                                transition: "slide",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'vodacom';
                            pageData.push(currentPage);

                            AirtimeVoucherList(localStorage.providerId);

                        }
                    }
                }
                else {
                    jAlert('No Data found', 'Info');
                }
            }
        } catch (exp) {

        }
    }
}


/*****************************************************************************************************
* PURPOSE : Airtime Vocher List
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function AirtimeVoucherList(providerID) {
    //Airtime voucher display
    var wiInputData = '';

    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<airtimetypelistrx>';
    wiInputData = wiInputData + '<providerid>' + providerID + '</providerid>';
    wiInputData = wiInputData + '<currencyid>2</currencyid>';
    wiInputData = wiInputData + '</airtimetypelistrx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', AirtimeVoucherListCallBack);
}

function AirtimeVoucherListCallBack(responseData) {
    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');

            if (responseData !== "") {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(responseData, "text/xml");

                var gettblvodacom = document.getElementById('tblvodacom');
                tblvodacom.innerHTML = null;

                if (xmlDoc.getElementsByTagName("desc") != null && xmlDoc.getElementsByTagName("desc").length > 0) {

                    var vodacomlistdata = xmlDoc.getElementsByTagName("desc");

                    for (var i = 0; i < vodacomlistdata.length; i++) {
                        var rowcount = gettblvodacom.rows.length;
                        var row = gettblvodacom.insertRow(rowcount);

                        row.setAttribute('class', 'tdbgc');

                        var vodacomid = xmlDoc.getElementsByTagName("id")[i].textContent;
                        row.setAttribute('id', 'row' + vodacomid);

                        var cellBlank = row.insertCell(0);
                        cellBlank.setAttribute('class', 'regcol1');

                        var cell = row.insertCell(1);
                        var lblvodacom = document.createElement("label");
                        cell.appendChild(lblvodacom);
                        cell.setAttribute('class', 'textstyle1 menulist');
                        lblvodacom.innerHTML = xmlDoc.getElementsByTagName("desc")[i].textContent;

                        var celimg = row.insertCell(2);
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/singlerightarrow.png';
                        celimg.setAttribute('class', 'regcol2');
                        img.setAttribute('class', 'rightarr');
                        celimg.appendChild(img);

                        //var cellBlank2 = row.insertCell(3);
                        //cellBlank2.setAttribute('class', 'regcol1');


                        row.onclick = function () {
                            //window.location.href = "../Wallet/avldenom.html?providerId=" + this.id;
                            prevPage = currentPage;
                            $.mobile.changePage('#avldenom', {
                                transition: "slide",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'avldenom';
                            pageData.push(currentPage);


                            var type = "AIRTIME";

                            AirtimeDenominationList(this.id.replace('row', ''), type);
                        }
                    }
                }
                else {
                    jAlert('No Data found', 'Info');
                }
            }
        } catch (exp) {

        }
    }
}




/*****************************************************************************************************
* PURPOSE : Airtime Denom List
* AUTHOR : Thrupthi
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function AirtimeDenominationList(providerID, type) {
    //Airtime voucher display
    var wiInputData = '';

    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<airtimedenomlistrx>';
    wiInputData = wiInputData + '<providerid>' + localStorage.providerId + '</providerid>';
    wiInputData = wiInputData + '<type>AIRTIME</type>';
    wiInputData = wiInputData + '<currencyid>2</currencyid>';
    wiInputData = wiInputData + '</airtimedenomlistrx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', AirtimeDenominationListCallBack);
}

function AirtimeDenominationListCallBack(responseData) {
    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');

            if (responseData !== "") {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                var gettblavailabledeno = document.getElementById('tblavailabledeno');
                gettblavailabledeno.innerHTML = null;
                if (xmlDoc.getElementsByTagName("desc") != null && xmlDoc.getElementsByTagName("desc").length > 0) {

                    var availabledenodata = xmlDoc.getElementsByTagName("desc");
                    for (var i = 0; i < availabledenodata.length; i++) {
                        var rowcount = gettblavailabledeno.rows.length;
                        var row = gettblavailabledeno.insertRow(rowcount);

                        row.setAttribute('class', 'tdbgc');

                        var availabledenoid = xmlDoc.getElementsByTagName('id')[i].textContent;
                        row.setAttribute('id', 'row' + availabledenoid);

                        var cellBlank = row.insertCell(0);
                        cellBlank.setAttribute('class', 'regcol1');

                        var cell = row.insertCell(1);
                        var lblavailabledeno = document.createElement("label");
                        cell.appendChild(lblavailabledeno);
                        cell.setAttribute('class', 'textstyle1 menulist');
                        lblavailabledeno.innerHTML = xmlDoc.getElementsByTagName("desc")[i].textContent;


                        var celimg = row.insertCell(2);
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/singlerightarrow.png';
                        celimg.setAttribute('class', 'regcol2');
                        img.setAttribute('class', 'rightarr');
                        celimg.appendChild(img);

                        //var cellBlank2 = row.insertCell(3);
                        //cellBlank2.setAttribute('class', 'regcol1');


                        row.onclick = function () {
                            //window.location.href = "../Wallet/trdtls.html?denominationId=" + this.id + "&dValue=" + this.innerText;
                            prevPage = currentPage;
                            $.mobile.changePage('#trdtls', {
                                transition: "slide",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'trdtls';
                            pageData.push(currentPage);


                            denominationID = this.id;
                            dValue = this.innerText;
                            denominationID = denominationID.replace('row', '');
                            document.getElementById('txtair').value = dValue;
                            document.getElementById('txtfee').value = "R1.50";
                            document.getElementById('txttotal').value = 'R' + (parseFloat(dValue.replace('R', '')) + 1.50);


                            document.getElementById("txtair").disabled = true;
                            document.getElementById("txtfee").disabled = true;
                            document.getElementById("txttotal").disabled = true;
                        }
                    }
                }
                else {
                    jAlert('No Data found', 'Info');
                }
            }
        } catch (exp) {

        }
    }
}


function TopUp(amount, card, cvv) {
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<topupccrx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '<amount>' + amount + '</amount>';
    wiInputData = wiInputData + '<pmid>' + card + '</pmid>';
    wiInputData = wiInputData + '<cvv>' + cvv + '</cvv>';
    wiInputData = wiInputData + '</topupccrx>';
    wiInputData = wiInputData + '</wiapp>';

    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', TopUpCallBack);
}


function TopUpCallBack(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("message")[0] != null) {
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
            }
        }
    } catch (exp) {

    }
}



function TransactionHistory() {
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<trxhistorystmtrx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '</trxhistorystmtrx>';
    wiInputData = wiInputData + '</wiapp>';

    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', TransactionHistoryCallBack);

}



function TransactionHistoryCallBack(responseData) {
    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            if (responseData !== "") {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                var gettbltranshistory = document.getElementById('tbltranshistory');
                gettbltranshistory.innerHTML = null;
                if (xmlDoc.getElementsByTagName("desc") != null && xmlDoc.getElementsByTagName("desc").length > 0) {

                    for (var i = 0; i < xmlDoc.getElementsByTagName("desc").length; i++) {
                        var rowcount = gettbltranshistory.rows.length;
                        var row = gettbltranshistory.insertRow(rowcount);

                        if (i % 2 == 0) {
                            row.setAttribute('class', 'calender');
                        } else {
                            row.setAttribute('class', 'cal');
                        }

                        var transid = xmlDoc.getElementsByTagName('id')[i].textContent
                        row.setAttribute('id', 'row' + transid);

                        var celldate = row.insertCell(0);
                        var lbldate = document.createElement("label");
                        celldate.appendChild(lbldate);
                        celldate.setAttribute('class', 'cell');
                        celldate.setAttribute('align', 'center');
                        lbldate.innerHTML = xmlDoc.getElementsByTagName("date")[i].textContent;

                        var cellcurrency = row.insertCell(1);
                        var lblcurrency = document.createElement("label");
                        cellcurrency.appendChild(lblcurrency);
                        cellcurrency.setAttribute('class', 'cell');
                        cellcurrency.setAttribute('align', 'center');
                        lblcurrency.innerHTML = xmlDoc.getElementsByTagName("currency")[i].textContent;

                        var cellamount = row.insertCell(2);
                        var lblamount = document.createElement("label");
                        cellamount.appendChild(lblamount);
                        cellamount.setAttribute('class', 'cell');
                        cellamount.setAttribute('align', 'center');
                        lblamount.innerHTML = xmlDoc.getElementsByTagName("amount")[i].textContent;

                        row.onclick = function () {
                            prevPage = currentPage;
                            $.mobile.changePage('#vodacom', {
                                transition: "slide",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'vodacom';
                            pageData.push(currentPage);


                            //window.location.href = "../Wallet/vodacom.html";
                        }
                    }
                }
                else {
                    jAlert("No Data found", 'Info');
                }
            }
        } catch (exp) {

        }
    }
}





/*****************************************************************************************************
* PURPOSE : StoreLocator
* AUTHOR : Asha
* CREATED DATE : July 4th 2013
******************************************************************************************************/


function provincestorelocator() {

    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<provincelistrx>';
    wiInputData = wiInputData + '<countryid>ZA</countryid>';
    wiInputData = wiInputData + '</provincelistrx>';
    wiInputData = wiInputData + '</wiapp>';

   CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', provincestorelocatorCallback);
   


}

function provincestorelocatorCallback(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        if (responseData !== "") {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            var gettblstorelocator = document.getElementById('tblstorelocator');
            //gettblstorelocator.innerHTML = null;
            if (xmlDoc.getElementsByTagName("desc") != null && xmlDoc.getElementsByTagName("desc").length > 0) {

                var SLdata = xmlDoc.getElementsByTagName("desc");
                var selectprovincectrl = document.getElementById('selectprovinceid');
              
                //remove values
                for (i = 1; i < selectprovincectrl.length; i++) {
                    if (selectprovincectrl.options[i].value) {
                        
                        selectprovincectrl.remove(i);
                    }
                }

                for (var i = 0; i < SLdata.length; i++) {
                   
                    var option = document.createElement("option");
                    option.text = xmlDoc.getElementsByTagName("desc")[i].textContent;
                    option.value = xmlDoc.getElementsByTagName("id")[i].textContent;
                    selectprovincectrl.appendChild(option);

                }
            }
            else {
                jAlert('No Data found', 'Info');
            }
        }
    } catch (exp) {

    }
}


/*******************City**************/
function citystorelocator(provinceID) {
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<regionlistrx>';
    wiInputData = wiInputData + '<provinceid>' + provinceID + '</provinceid>';
    wiInputData = wiInputData + '</regionlistrx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', citystorelocatorCallback);
    
}

function citystorelocatorCallback(responseData) {
   
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        if (responseData !== "") {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            var gettblstorelocator = document.getElementById('tblstorelocator');
            //gettblstorelocator.innerHTML = null;
            if (xmlDoc.getElementsByTagName("desc") != null && xmlDoc.getElementsByTagName("desc").length > 0) {

                var SLdata = xmlDoc.getElementsByTagName("desc");
                var selectcityctrl = document.getElementById('selectcityid');

                //remove values
                for (i = 1; i < selectcityctrl.length; i++) {
                    if (selectcityctrl.options[i].value) {
                        selectcityctrl.remove(i);
                    }
                }

                for (var i = 0; i < SLdata.length; i++) {
                    var option = document.createElement("option");
                    option.text = xmlDoc.getElementsByTagName("desc")[i].textContent;
                    option.value = xmlDoc.getElementsByTagName("id")[i].textContent;
                    selectcityctrl.appendChild(option);
                }
            }
            else {
                jAlert('No Data found', 'Info');
            }
        }
    } catch (exp) {

    }
}


/****************Suburb****************/


function subrubstorelocator(regionID) {
    var wiInputData = '';
    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<suburblistrx>';
    wiInputData = wiInputData + '<regionid>' + regionID + '</regionid>';
    wiInputData = wiInputData + '</suburblistrx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', subrubstorelocatorCallback);
   
}

function subrubstorelocatorCallback(responseData) {

    
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        if (responseData !== "") {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(responseData, "text/xml");
            var gettblstorelocator = document.getElementById('tblstorelocator');
            // gettblstorelocator.innerHTML = null;
           
            if (xmlDoc.getElementsByTagName("desc") != null && xmlDoc.getElementsByTagName("desc").length > 0) {

                var SLdata = xmlDoc.getElementsByTagName("desc");
                var selectsubrubctrl = document.getElementById('selectsuburbid');
                 //remove values
                for (i = 1; i < selectsubrubctrl.length; i++) {
                   
                    if (selectsubrubctrl.options[i].value) {
                        selectsubrubctrl.remove(i);
                    }
                }
                for (var i = 0; i < SLdata.length; i++) {
                    var option = document.createElement("option");
                    option.text = xmlDoc.getElementsByTagName("desc")[i].textContent;
                    option.value = xmlDoc.getElementsByTagName("id")[i].textContent;
                    selectsubrubctrl.appendChild(option);
                }
            }
            else {
                jAlert('No Data found', 'Info');
            }
        }
    } catch (exp) {

    }
}


/*****************************************************************************************************
* PURPOSE : Store in your area
* AUTHOR : Asha
* CREATED DATE : July 4th 2013 function DisplayMerchantsDetails(regionID,categoryID,tt) { function DisplayMerchantsDetails(getprovince, getcity, getsuburb){
******************************************************************************************************/

function DisplayMerchantsDetails(provinceID, cityID, suburbID) {
    var wiInputData = '';

    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<getmerchantlistrx>';
    if (provinceID != "0") {
        wiInputData = wiInputData + '<provinceid>' + provinceID + '</provinceid>';
    }

    if (cityID != "0") {
        wiInputData = wiInputData + '<regionid>' + cityID + '</regionid>';
    }

    if (suburbID != "0") {
        wiInputData = wiInputData + '<suburbid>' + suburbID + '</suburbid>';
    }
    wiInputData = wiInputData + '</getmerchantlistrx>';
    wiInputData = wiInputData + '</wiapp>';

    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', DisplayMerchantsDetailsCallback);
}





/*****************************************************************************************************
* PURPOSE : Stores by GPS Location
* AUTHOR : GEERVANI
* CREATED DATE : July 7th 2013 
******************************************************************************************************/

function GetMerchantsByGPS() {
    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    var onSuccess = function (position) {
        alert('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n');


        var wiInputData = '';

        wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
        wiInputData = wiInputData + '<getmerchantlistrx>';
        wiInputData = wiInputData + '<gps>';
        wiInputData = wiInputData + '<longitude>' + position.coords.latitude + '</longitude>';
        wiInputData = wiInputData + '<longitude>' + position.coords.longitude + '</longitude>';
        wiInputData = wiInputData + '</gps>';
        wiInputData = wiInputData + '</wiapp>';

        CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', DisplayMerchantsDetailsCallback);

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert(error.message);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}



function DisplayMerchantsDetailsCallback(responseData) {
    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            if (responseData !== "") {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                var gettblmerchantsdetails = document.getElementById('tblmerchantsdetails');
                gettblmerchantsdetails.innerHTML = null;
                if (xmlDoc.getElementsByTagName("name") != null && xmlDoc.getElementsByTagName("name").length > 0) {
                    var merchantdata = xmlDoc.getElementsByTagName("name");
                    for (var i = 0; i < merchantdata.length; i++) {
                        var rowcount = gettblmerchantsdetails.rows.length;
                        var row = gettblmerchantsdetails.insertRow(rowcount);
                        row.setAttribute('class', 'tdbgc');
                        var merchantid = xmlDoc.getElementsByTagName('id')[i].textContent;
                        row.setAttribute('id', 'row' + merchantid);

                        var cellBlank = row.insertCell(0);
                        cellBlank.setAttribute('class', 'regcol1');

                        var cellstorename = row.insertCell(1);
                        var lblstorename = document.createElement("label");
                        cellstorename.appendChild(lblstorename);
                        cellstorename.setAttribute('class', 'textstyle1 menulist');
                        lblstorename.innerHTML = xmlDoc.getElementsByTagName("name")[i].textContent;


                        var celimg = row.insertCell(2);
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/singlerightarrow.png';
                        img.setAttribute('class', 'rightarr');
                        celimg.setAttribute('class', 'regcol2');
                        celimg.appendChild(img);

                        row.onclick = function () {
                            prevPage = currentPage;
                            $.mobile.changePage('#storedetails', {
                                transition: "slide",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'storedetails';
                            pageData.push(currentPage);

                            GetMerchantInfo(this.id.replace('row', ''), type);
                        }
                    }
                }
                else {
                    jAlert('No Data found', 'Info');
                }
            }
        } catch (exp) {

        }
    }
}

/*****************************************************************************************************
* PURPOSE : GET STORE INFO
* AUTHOR : Geervani
* CREATED DATE : July 7th 2013 
******************************************************************************************************/

function GetMerchantInfo(merchantID) {
    var wiInputData = '';

    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<getmerchantinforx>';
    wiInputData = wiInputData + '<merchantid>' + merchantID + '</merchantid>';
    wiInputData = wiInputData + '</getmerchantinforx>';
    wiInputData = wiInputData + '</wiapp>';

    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', GetMerchantInfoCallback);
}



function GetMerchantInfoCallback(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        if (responseData !== "") {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(responseData, "text/xml");

            if (xmlDoc.getElementsByTagName("merchantinfo") != null && xmlDoc.getElementsByTagName("merchantinfo").length > 0) {

                document.getElementById('StoreName').innerHTML = xmlDoc.getElementsByTagName("name")[0].textContent;

                document.getElementById('StoreAddress').innerHTML = xmlDoc.getElementsByTagName("address")[0].textContent + "<br/>" + xmlDoc.getElementsByTagName("address")[1].textContent + '<br/>' + xmlDoc.getElementsByTagName("postalcode")[0].textContent;

                document.getElementById('StoreManager').innerHTML = xmlDoc.getElementsByTagName("contactperson")[0].textContent;

                document.getElementById('StoreTel').innerHTML = xmlDoc.getElementsByTagName("telephone")[0].textContent;

                document.getElementById('StoreFax').innerHTML = xmlDoc.getElementsByTagName("webaddress")[0].textContent;

                document.getElementById('StoreBusinessHours').innerHTML = xmlDoc.getElementsByTagName("tradinghours")[0].textContent;
            }
            else {
                jAlert('No Data found', 'Info');
            }
        }
    } catch (exp) {

    }
}

function GetCurrency() {
    var wiInputData = '';

    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<subcurrencylistrx>';
    wiInputData = wiInputData + '<username>' + localStorage.username + '</username>';
    wiInputData = wiInputData + '<sessionid>' + localStorage.wisessionid + '</sessionid>';
    wiInputData = wiInputData + '<show>LINKED</show>';
    wiInputData = wiInputData + '<type>ALL</type>';
    wiInputData = wiInputData + '</subcurrencylistrx>';
    wiInputData = wiInputData + '</wiapp>';
    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', GetCurrencyCallBack);
}

function GetCurrencyCallBack(responseData) {
    try {
        // alert(responseData);
    }
    catch (exp) {

    }
}


/*****************************************************************************************************
* PURPOSE :My Coupons List Page
* AUTHOR : Asha
* CREATED DATE : July 11th 2013 
******************************************************************************************************/


function MyCouponsList() {
   
    var wiInputData = '';

    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<cvchannellistrx>';
    wiInputData = wiInputData + '<filterid>COUPON</filterid>';
    wiInputData = wiInputData + '</cvchannellistrx>';
    wiInputData = wiInputData + '</wiapp>';

    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', MyCouponsListCallBack);
    
}

function MyCouponsListCallBack(responseData) {
    if (checkLogin()) {
        try {
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            if (responseData !== "") {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(responseData, "text/xml");

                var gettblmycouponslist = document.getElementById('tblmycouponslist');

                if (xmlDoc.getElementsByTagName("name") != null && xmlDoc.getElementsByTagName("name").length > 0) {
                    gettblmycouponslist.innerHTML = null;
                    var mycouponslistdata = xmlDoc.getElementsByTagName("name");
                    for (var i = 0; i < mycouponslistdata.length; i++) {
                        var rowcount = gettblmycouponslist.rows.length;
                        var row = gettblmycouponslist.insertRow(rowcount);
                        row.setAttribute('class', 'tdbgc');

                        var channelid = xmlDoc.getElementsByTagName("id")[i].textContent;
                        row.setAttribute('id', 'row' + channelid);

                        var cellBlank = row.insertCell(0);
                        cellBlank.setAttribute('class', 'regcol1');

                        var cell = row.insertCell(1);
                        var lblmycoupname = document.createElement("label");
                        cell.appendChild(lblmycoupname);
                        cell.setAttribute('class', 'textstyle1 menulist');
                        lblmycoupname.innerHTML = xmlDoc.getElementsByTagName("name")[i].textContent;

                        var celimg = row.insertCell(2);
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/singlerightarrow.png';
                        celimg.setAttribute('class', 'regcol2');
                        img.setAttribute('class', 'rightarr');
                        celimg.appendChild(img);

                        //var cellBlank2 = row.insertCell(3);
                        //cellBlank2.setAttribute('class', 'regcol1');


                        row.onclick = function () {

                            prevPage = currentPage;
                            $.mobile.changePage('#picknpay', {
                                transition: "slide",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'picknpay';
                            pageData.push(currentPage);


                            PicknPayList();


                        }
                    }
                }
                else {
                    jAlert('No Data found', 'Info');
                }
            }
        } catch (exp) {

        }
    }
}


/*****************************************************************************************************
* PURPOSE :picknpay list page
* AUTHOR : Asha
* CREATED DATE : July 11th 2013 
******************************************************************************************************/

function PicknPayList() {

    var wiInputData = '';

    wiInputData = wiInputData + 'xml=<wiapp ver="2.4" appid="TEST" password="test" reqid="DSG-051caaaeacd5b2">';
    wiInputData = wiInputData + '<cvcampaignlistrx>';
    wiInputData = wiInputData + '<username>LikeNoOther</username>';
    wiInputData = wiInputData + '<sessionid>455621654dsd32</sessionid>';
    wiInputData = wiInputData + '<campaigntype>COUPON</campaigntype>';
    wiInputData = wiInputData + '<channelid>WC</channelid>';
    wiInputData = wiInputData + '<addword>UCT</addword>';
    wiInputData = wiInputData + '<addword>US</addword>';
    wiInputData = wiInputData + '</addwordlist>';
    wiInputData = wiInputData + '</cvcampaignlistrx>';
    wiInputData = wiInputData + '</wiapp>';

    CallWebService('http://dev.wigroup.co/easa/http_to_socket/', wiInputData, 'POST', 'application/x-www-form-urlencoded', PicknPayListCallBack);
   
}

function PicknPayListCallBack(responseData) {

    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        if (responseData !== "") {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(responseData, "text/xml");

            var gettblpicknpaylist = document.getElementById('tblpicknpaylist');

            if (xmlDoc.getElementsByTagName("name") != null && xmlDoc.getElementsByTagName("name").length > 0) {
                gettblpicknpaylist.innerHTML = null;
                var picknpaylistdata = xmlDoc.getElementsByTagName("name");
                for (var i = 0; i < picknpaylistdata.length; i++) {
                    var rowcount = gettblpicknpaylist.rows.length;
                    var row = gettblpicknpaylist.insertRow(rowcount);
                    row.setAttribute('class', 'tdbgc');

                    var channelid = xmlDoc.getElementsByTagName("id")[i].textContent;
                    row.setAttribute('id', 'row' + channelid);
                    
                    var cellBlank = row.insertCell(0);
                    cellBlank.setAttribute('class', 'regcol1');
                    cellBlank.setAttribute('width', '2%');

                    var celimg = row.insertCell(1);
                    celimg.rowSpan = 2;
                    var img = document.createElement("img");
                    img.src = xmlDoc.getElementsByTagName("imageurl")[i].textContent;
                    celimg.setAttribute('class', 'submitbtn');
                    celimg.appendChild(img);
                    celimg.setAttribute('width', '20%');


                    var cell = row.insertCell(2);
                    var lblpicknpay = document.createElement("label");
                    lblpicknpay.innerHTML = xmlDoc.getElementsByTagName("amount")[i].textContent;
                    cell.appendChild(lblpicknpay);
                    cell.setAttribute('class', 'couponamt');                    

                    var cellBlank2 = row.insertCell(3);
                    cellBlank2.setAttribute('class', 'regcol1');

                    /****** 2nd row Name******/
                    rowcount = gettblpicknpaylist.rows.length;
                    row = gettblpicknpaylist.insertRow(rowcount);
                    var cellBlank = row.insertCell(0);
                    cellBlank.setAttribute('class', 'regcol1');

                    var cnamecell = row.insertCell(1);
                    var lblcname = document.createElement("label");
                    cnamecell.appendChild(lblcname);
                    cnamecell.setAttribute('class', 'couponname');
                    lblcname.innerHTML = xmlDoc.getElementsByTagName("name")[i].textContent;

                    var cellBlank2 = row.insertCell(2);
                    cellBlank2.setAttribute('class', 'regcol1');
                    cellBlank2.setAttribute('width', '2%');
                    /****** 2nd row Name end******/
                    /*row.onclick = function () {


                        $.mobile.changePage('#couponsdetails', {
                            transition: "slide",
                            reverse: false,
                            changeHash: false
                        });

                      

                    }*/
                }
            }
            else {
                jAlert('No Data found', 'Info');
            }
        }
    } catch (exp) {
    alert(exp);
    }
}


/*****************************************************************************************************
* PURPOSE :couponsdetails
* AUTHOR : Asha
* CREATED DATE : July 11th 2013 
******************************************************************************************************/



