var categoryid = '';

/*****************************************************************************************************
* PURPOSE :DisplayCategories(Benefits Indexben.html)
* AUTHOR : ASHA
* CREATED DATE : 26 JUN 2013
******************************************************************************************************/

function GetDisplayCategories() {
    var randgoInputData = '';
    randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
    randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    randgoInputData = randgoInputData + '<soap:Body>';
    randgoInputData = randgoInputData + '<DisplayCategories xmlns="http://tempuri.org/">'
    randgoInputData = randgoInputData + '<dSessionID>' + localStorage.randgosessionid + '</dSessionID>'
    randgoInputData = randgoInputData + '</DisplayCategories>'
    randgoInputData = randgoInputData + '</soap:Body>';
    randgoInputData = randgoInputData + '</soap:Envelope>';

    CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', GetDisplayCategoriesCallback);

}

function GetDisplayCategoriesCallback(responseData) {
    if (checkLogin()) {
        try {
            //alert("GetDisplayCategories:::::::" + responseData);
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                if (xmlDoc.getElementsByTagName("message")[0].textContent === "Your session has timed out. Please open a new session.") {
                    localStorage.randgosessionid = null;
                    jAlert('Your session has expired. Please login again.', 'Info');
                    prevPage = currentPage;
                    $.mobile.changePage('#log', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'log';
                    pageData.push(currentPage);
                }

                var gettbldisplaycategories = document.getElementById('tbldisplaycategories');
                gettbldisplaycategories.innerHTML = null;
                if (xmlDoc.getElementsByTagName("category") != null && xmlDoc.getElementsByTagName("category").length > 0) {
                    var categorylist = xmlDoc.getElementsByTagName("category");

                    for (var i = 0; i < categorylist.length; i++) {
                        var rowcount = gettbldisplaycategories.rows.length;
                        var row = gettbldisplaycategories.insertRow(rowcount);
                        row.setAttribute('class', 'tdbgc');
                        var categoryid = xmlDoc.getElementsByTagName('category')[i].getAttribute("id");
                        row.setAttribute('id', 'row' + categoryid);

                        var cellBlank = row.insertCell(0);
                        cellBlank.setAttribute('class', 'regcol1');

                        var cell = row.insertCell(1);
                        var lblcategory = document.createElement("label");
                        lblcategory.setAttribute('class', 'nameclass');
                        cell.appendChild(lblcategory);
                        cell.setAttribute('class', 'textstyle1 gorow');
                        lblcategory.innerHTML = xmlDoc.getElementsByTagName("category")[i].textContent;

                        var celimg = row.insertCell(2);
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/singlerightarrow.png';
                        img.setAttribute('class', 'rightarr');
                        celimg.setAttribute('align', 'center');
                        celimg.setAttribute('class', 'regcol2');
                        celimg.appendChild(img);

                        row.onclick = function () {

                            var categoryID = this.id;
                            //categoryID = categoryID.replace('row', '');
                            localStorage.categoryID = categoryID.replace('row', '');
                            $("#tbldisplaycategoriesbycid tr").remove();
                            //  document.getElementById('txtmerchantsearch').innerHTML = null;
                            document.getElementById('txtmerchantsearch').value = "";
                            //heading display
                            var MName = this.innerText.replace(/%20/g, ' ');
                            document.getElementById('tblheading').innerHTML = MName;
                            prevPage = currentPage;
                            $.mobile.changePage('#merchantnames', {
                                transition: "none",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'merchantnames';
                            pageData.push(currentPage);

                            setTimeout(function () {
                                var randgoInputData = ''; randgoInputData = '<?xml version="1.0" encoding="utf-8"?>'; randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'; randgoInputData = randgoInputData + '<soap:Body>'; randgoInputData = randgoInputData + '<Login xmlns="http://tempuri.org/">'; randgoInputData = randgoInputData + '<lUserName>ws@europassistance</lUserName>'; randgoInputData = randgoInputData + '<lPassword>e@s@ws</lPassword>'; randgoInputData = randgoInputData + '</Login>'; randgoInputData = randgoInputData + '</soap:Body>'; randgoInputData = randgoInputData + '</soap:Envelope>'; CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', RandoLoginCallBackNewMer1);
                            }, 100);



                        }
                    }
                }
            }
        } catch (exp) {

        }

    }
}
function RandoLoginCallBackNewMer1(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            var xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("status")[0] != null && xmlDoc.getElementsByTagName("status")[0].textContent !== "") {
                window.localStorage.setItem("randgosessionid", xmlDoc.getElementsByTagName("sessionid")[0].textContent);
                GetDisplayMerchantsByCategories(localStorage.categoryID);
            }
        }
        else {
            alert('No Data Found');
            return false;
        }
    } catch (exp) {
        //alert('RandoLoginCallBackNew' + exp);
    }
}

/*****************************************************************************************************
* PURPOSE :DisplayMerchantsByCategories(MerchantNames)
* AUTHOR : ASHA
* CREATED DATE : 27 JUN 2013
******************************************************************************************************/
function GetDisplayMerchantsByCategories(categoryID) {
    var randgoInputData = '';
    randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
    randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    randgoInputData = randgoInputData + '<soap:Body>';
    randgoInputData = randgoInputData + '<DisplayMerchantsByCategory xmlns="http://tempuri.org/">';
    randgoInputData = randgoInputData + '<dSessionID>' + localStorage.randgosessionid + '</dSessionID>';
    randgoInputData = randgoInputData + '<dCategoryID>' + categoryID + '</dCategoryID>';
    randgoInputData = randgoInputData + '</DisplayMerchantsByCategory>';
    randgoInputData = randgoInputData + '</soap:Body>';
    randgoInputData = randgoInputData + '</soap:Envelope>';

    CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx?op=DisplayMerchantsByCategory', randgoInputData, 'POST', 'text/xml', GetDisplayMerchantsByCategoriesCallback);
}



function GetDisplayMerchantsByCategoriesCallback(responseData) {
    if (checkLogin()) {
        try {
            // alert("DisplayMerchantsByCategories:::::::" + responseData);
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                if (xmlDoc.getElementsByTagName("message")[0].textContent === "Your session has timed out. Please open a new session.") {
                    localStorage.randgosessionid = null;
                    jAlert('Your session has expired. Please login again.', 'Info');
                    prevPage = currentPage;
                    $.mobile.changePage('#log', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'log';
                    pageData.push(currentPage);

                }
                var gettbldisplaycategoriesbycid = document.getElementById('tbldisplaycategoriesbycid');
                gettbldisplaycategoriesbycid.innerHTML = null;
                if (xmlDoc.getElementsByTagName("merchant") != null && xmlDoc.getElementsByTagName("merchant").length > 0) {
                    var merchantlist = xmlDoc.getElementsByTagName("merchant");

                    for (var i = 0; i < merchantlist.length; i++) {
                        var rowcount = gettbldisplaycategoriesbycid.rows.length;
                        var row = gettbldisplaycategoriesbycid.insertRow(rowcount);
                        row.setAttribute('class', 'tdbgc');
                        var merchantid = xmlDoc.getElementsByTagName('merchant')[i].getAttribute("id");
                        row.setAttribute('id', 'row' + merchantid);

                        var imgpath = xmlDoc.getElementsByTagName('merchant')[i].getAttribute("imageUrl");
                        //row.setAttribute('imageUrl', 'row' + imgpath);

                        //var cellBlank1 = row.insertCell(0);
                        // cellBlank1.setAttribute('class', 'regcol1');
                        var logoimgcell = row.insertCell(0);
                        var logoimg = document.createElement("img");
                        logoimg.src = imgpath;
                        logoimg.setAttribute('class', 'logoimgclass');
                        logoimgcell.setAttribute('class', 'cellclass');
                        logoimgcell.appendChild(logoimg);

                        var cell = row.insertCell(1);
                        var lblcategory = document.createElement("label");
                        cell.appendChild(lblcategory);
                        cell.setAttribute('class', 'textstyle1 gorow');
                        lblcategory.innerHTML = xmlDoc.getElementsByTagName("merchant")[i].textContent;

                        var celimg = row.insertCell(2);
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/singlerightarrow.png';
                        img.setAttribute('class', 'rightarr');
                        celimg.setAttribute('align', 'center');
                        celimg.setAttribute('class', 'regcol2');
                        celimg.appendChild(img);

                        //var cellBlank2 = row.insertCell(3);
                        //cellBlank2.setAttribute('class', 'regcol1');

                        row.onclick = function () {
                            // window.location.href = "../Help/goeat.html?merchantId=" + this.id + "&merchantname=" + this.innerText;
                            var merchantId = this.id;
                            merchantId = merchantId.replace('row', '');
                            localStorage.merchantId = merchantId;
                            $("#tbldisplaymerchantdeals tr").remove();
                            document.getElementById('txtmerchantsearch').value = "";
                            //heading display
                            var MName = this.innerText.replace(/%20/g, ' ');
                            document.getElementById('tblmerchantnameheading').innerHTML = MName;
                            prevPage = currentPage;
                            $.mobile.changePage('#goeat', {
                                transition: "none",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'goeat';
                            pageData.push(currentPage);
                            setTimeout(function () {
                                var randgoInputData = ''; randgoInputData = '<?xml version="1.0" encoding="utf-8"?>'; randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'; randgoInputData = randgoInputData + '<soap:Body>'; randgoInputData = randgoInputData + '<Login xmlns="http://tempuri.org/">'; randgoInputData = randgoInputData + '<lUserName>ws@europassistance</lUserName>'; randgoInputData = randgoInputData + '<lPassword>e@s@ws</lPassword>'; randgoInputData = randgoInputData + '</Login>'; randgoInputData = randgoInputData + '</soap:Body>'; randgoInputData = randgoInputData + '</soap:Envelope>'; CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', RandoLoginCallBackNew2);
                            }, 100);


                        }
                    }
                }
                /* else {
                alert("");
                }*/
            }
        } catch (exp) {

        }


    }
}
function RandoLoginCallBackNew2(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            var xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("status")[0] != null && xmlDoc.getElementsByTagName("status")[0].textContent !== "") {
                window.localStorage.setItem("randgosessionid", xmlDoc.getElementsByTagName("sessionid")[0].textContent);
                GetDisplayMerchantDeals(localStorage.merchantId);
            }
        }
        else {
            alert('No Data Found');
            return false;
        }
    } catch (exp) {
        //alert('RandoLoginCallBackNew' + exp);
    }
}

/*****************************************************************************************************
* PURPOSE :Display Merchant Deals(goeat.html)
* AUTHOR : ASHA
* CREATED DATE : 27 JUN 2013

******************************************************************************************************/
function GetDisplayMerchantDeals(merchantID) {
    var randgoInputData = '';
    randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
    randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    randgoInputData = randgoInputData + '<soap:Body>';
    randgoInputData = randgoInputData + '<DisplayMerchantDeals xmlns="http://tempuri.org/">';
    randgoInputData = randgoInputData + '<dSessionId>' + localStorage.randgosessionid + '</dSessionId>';
    randgoInputData = randgoInputData + '<dMerchantId>' + merchantID + '</dMerchantId>';
    randgoInputData = randgoInputData + '</DisplayMerchantDeals>';
    randgoInputData = randgoInputData + '</soap:Body>';
    randgoInputData = randgoInputData + '</soap:Envelope>';

    CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx?op=DisplayMerchantDeals', randgoInputData, 'POST', 'text/xml', GetDisplayMerchantDealsCallback);
}

/*** DEC 7th 2013***as per client req retrive dealsms tag if 1 call reqsmsdeal else ignore ****/

function GetDisplayMerchantDealsCallback(responseData) {
    if (checkLogin()) {

        try {
            //  alert("Display Merchant Deals:::::::::::::" + responseData);
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                if (xmlDoc.getElementsByTagName("message")[0].textContent == "Your session has timed out. Please open a new session.") {
                    localStorage.randgosessionid = null;
                    jAlert('Your session has expired. Please login again.', 'Info');
                    prevPage = currentPage;
                    $.mobile.changePage('#log', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });

                    currentPage = 'log';
                    pageData.push(currentPage);
                }
                else {
                    var gettbldisplaymerchantdeals = document.getElementById('tbldisplaymerchantdeals');
                    gettbldisplaymerchantdeals.innerHTML = null;
                    if (xmlDoc.getElementsByTagName("deals") != null && xmlDoc.getElementsByTagName("deals").length > 0) {
                        var deallist = xmlDoc.getElementsByTagName("deal");

                        for (var i = 0; i < deallist.length; i++) {

                            var rowcount = gettbldisplaymerchantdeals.rows.length;
                            var row = gettbldisplaymerchantdeals.insertRow(rowcount);

                            var dealid = xmlDoc.getElementsByTagName('deal')[i].getAttribute("id");
                            var offerid = xmlDoc.getElementsByTagName('deal')[i].getAttribute("offerId");
                            /***added**/
                            var offertype = xmlDoc.getElementsByTagName('deal')[i].getAttribute("offerType");
                            /** dec7th 2013 ***/
                            var dealsms = xmlDoc.getElementsByTagName("dealSMS")[i].textContent;
                            // alert("dealsms::::: " + dealsms);
                            /** dec7th end***/
                            row.setAttribute('offerId', 'row' + offerid);
                            var cell = row.insertCell(0);
                            cell.setAttribute('width', '100%');
                            var lbldealtitle = document.createElement("label");
                            lbldealtitle.innerHTML = xmlDoc.getElementsByTagName("dealTitle")[i].textContent;
                            lbldealtitle.setAttribute('class', 'divheading');

                            cell.appendChild(lbldealtitle);

                            rowcount = gettbldisplaymerchantdeals.rows.length;
                            var row2 = gettbldisplaymerchantdeals.insertRow(rowcount);

                            var cell = row2.insertCell(0);
                            cell.setAttribute('width', '100%');
                            var lbldealdesc = document.createElement("label");
                            lbldealdesc.setAttribute('class', 'divcontent');
                            lbldealdesc.innerHTML = xmlDoc.getElementsByTagName("dealDescription")[i].textContent;
                            cell.appendChild(lbldealdesc);

                            if (offertype == "url-based") {
                                rowcount = gettbldisplaymerchantdeals.rows.length;
                                var row3 = gettbldisplaymerchantdeals.insertRow(rowcount);
                                var celimg = row3.insertCell(0);
                                celimg.setAttribute('width', '30%');
                                var img = document.createElement("img");
                                img.src = 'public/images/EAslicing/visit.png';
                                img.setAttribute('id', 'row' + dealid);
                                img.setAttribute('name', 'offerType' + offertype);
                                celimg.setAttribute('align', 'right');
                                celimg.setAttribute('class', 'regcol2 setheight');
                                celimg.appendChild(img); img.setAttribute('alt', 'dealSMS' + xmlDoc.getElementsByTagName("dealSMS")[i].textContent);
                                img.setAttribute('id', 'row' + dealid);
                            }
                            else if (offertype == "email-based") {
                                rowcount = gettbldisplaymerchantdeals.rows.length;
                                var row3 = gettbldisplaymerchantdeals.insertRow(rowcount);
                                var celimg = row3.insertCell(0);
                                celimg.setAttribute('width', '30%');
                                var img = document.createElement("img");
                                img.src = 'public/images/EAslicing/contact.png';
                                img.setAttribute('id', 'row' + dealid);
                                img.setAttribute('name', 'offerType' + offertype);
                                celimg.setAttribute('align', 'right');
                                celimg.setAttribute('class', 'regcol2 setheight');
                                celimg.appendChild(img); img.setAttribute('alt', 'dealSMS' + xmlDoc.getElementsByTagName("dealSMS")[i].textContent);
                                img.setAttribute('id', 'row' + dealid);
                            }

                            else if ((offertype == "print-based") && (dealsms == 1)) {
                                rowcount = gettbldisplaymerchantdeals.rows.length;
                                var row3 = gettbldisplaymerchantdeals.insertRow(rowcount);
                                var celimg = row3.insertCell(0);
                                celimg.setAttribute('width', '30%');
                                var img = document.createElement("img");
                                img.src = 'public/images/EAslicing/sms.png';
                                img.setAttribute('id', 'row' + dealid);
                                img.setAttribute('name', 'offerType' + offertype);
                                celimg.setAttribute('align', 'right');
                                celimg.setAttribute('class', 'regcol2 setheight');
                                celimg.appendChild(img);
                                img.setAttribute('alt', 'dealSMS' + xmlDoc.getElementsByTagName("dealSMS")[i].textContent);
                                img.setAttribute('id', 'row' + dealid);
                            }
                            // if ((offertype == "print-based") && (dealsms == 1)) 
                            else {
                                rowcount = gettbldisplaymerchantdeals.rows.length;
                                var row3 = gettbldisplaymerchantdeals.insertRow(rowcount);
                                var celimg = row3.insertCell(0);
                                celimg.setAttribute('width', '30%');
                                var img = document.createElement("img");
                                img.src = 'public/images/EAslicing/GetVoucher.png';
                                img.setAttribute('id', 'row' + dealid);
                                img.setAttribute('name', 'offerType' + offertype);
                                celimg.setAttribute('align', 'right');
                                celimg.setAttribute('class', 'regcol2 setheight');
                                celimg.appendChild(img); img.setAttribute('alt', 'dealSMS' + xmlDoc.getElementsByTagName("dealSMS")[i].textContent);
                                img.setAttribute('id', 'row' + dealid);
                            }

                            $("a").removeAttr('href');

                            img.onclick = function () {

                                localStorage.dealsms = this.alt.replace('dealSMS', '');
                                localStorage.dealsID = this.id.replace('row', '');
                                localStorage.offertype = this.name.replace('offerType', '');
                                var randgoInputData = ''; randgoInputData = '<?xml version="1.0" encoding="utf-8"?>'; randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'; randgoInputData = randgoInputData + '<soap:Body>'; randgoInputData = randgoInputData + '<Login xmlns="http://tempuri.org/">'; randgoInputData = randgoInputData + '<lUserName>ws@europassistance</lUserName>'; randgoInputData = randgoInputData + '<lPassword>e@s@ws</lPassword>'; randgoInputData = randgoInputData + '</Login>'; randgoInputData = randgoInputData + '</soap:Body>'; randgoInputData = randgoInputData + '</soap:Envelope>'; CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', RandoLoginCallBackNew3);


                            }
                        }
                    }
                    else {
                        jAlert('No Data Found', 'Info');
                    }
                }
            }
        } catch (exp) {

        }

    }
}

function RandoLoginCallBackNew3(responseData) {
    try {
        responseData = responseData.replace(/&gt;/gi, '>');
        responseData = responseData.replace(/&lt;/gi, '<');
        var parser = new DOMParser();
        if (responseData !== "") {
            var xmlDoc = parser.parseFromString(responseData, "text/xml");
            if (xmlDoc.getElementsByTagName("status")[0] != null && xmlDoc.getElementsByTagName("status")[0].textContent !== "") {
                window.localStorage.setItem("randgosessionid", xmlDoc.getElementsByTagName("sessionid")[0].textContent);
                if (localStorage.offertype == "url-based") {
                    GetRequestUrlDeal(localStorage.dealsID);
                } if (localStorage.offertype == "email-based") {
                    GetRequestEmailDeal(localStorage.dealsID);
                } if (localStorage.offertype == "sms-based") {
                    GetRequestSMSDeal(localStorage.dealsID);
                } if ((localStorage.offertype == "print-based") && (localStorage.dealsms == 0)) {
                    GetRequestPrintDeal(localStorage.dealsID);
                } else if ((localStorage.offertype == "print-based") && (localStorage.dealsms == 1)) {
                    GetRequestSMSDeal(localStorage.dealsID);
                }
            }
        }
        else {
            alert('No Data Found');
            return false;
        }
    } catch (exp) {
        //alert('RandoLoginCallBackNew' + exp);
    }
}




function GetRequestEmailDeal(dealID) {
    var randgoInputData = '';

    randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
    randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    randgoInputData = randgoInputData + '<soap:Body>';
    randgoInputData = randgoInputData + '<RequestEmailDeal xmlns="http://tempuri.org/">';
    randgoInputData = randgoInputData + '<rSessionId>' + localStorage.randgosessionid + '</rSessionId>';
    randgoInputData = randgoInputData + '<rDealId>' + dealID + '</rDealId>';
    randgoInputData = randgoInputData + '<rFirstName>' + localStorage.firstname + '</rFirstName>';
    randgoInputData = randgoInputData + '<rSurname>' + localStorage.SurName + '</rSurname>';
    randgoInputData = randgoInputData + '<rEmail>' + localStorage.EmailID + '</rEmail>';
    randgoInputData = randgoInputData + '<rContact>' + localStorage.CellNumber + '</rContact>';
    randgoInputData = randgoInputData + '</RequestEmailDeal>';
    randgoInputData = randgoInputData + '</soap:Body>';
    randgoInputData = randgoInputData + '</soap:Envelope>';
    CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx?op=RequestUrlDeal', randgoInputData, 'POST', 'text/xml', GetRequestEmailDealCallback);
    //alert("RequestEmailDeal:::::::randgoInputData::::::" + randgoInputData);
}

function GetRequestEmailDealCallback(responseData) {

    if (checkLogin()) {
        try {
            // alert("RequestEmailDeal:::::::responseData::::::" + responseData);
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                //alert(xmlDoc.getElementsByTagName("deals")[0].textContent);
                var alertmsg = xmlDoc.getElementsByTagName("deals")[0].getElementsByTagName("oprationMessage")[0].textContent;
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent + " - " + alertmsg);
                if (xmlDoc.getElementsByTagName("message")[0].textContent === "Your session has timed out. Please open a new session.") {
                    localStorage.randgosessionid = null;
                    jAlert('Your session has expired. Please login again.', 'Info');
                    prevPage = currentPage;
                    $.mobile.changePage('#log', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'log';
                    pageData.push(currentPage);

                }
                else {
                    //  jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
                }
            }
        } catch (exp) {
            //alert(exp);
        }
    }
}


/*****************************************************************************************************
* PURPOSE :DisplayMerchantsBySearch(Merchants page )
* AUTHOR : ASHA
* CREATED DATE : 28 Nov 2013
******************************************************************************************************/

function GetMerchantsBySearch() {
    if (txtmerchantsearch.value != null && txtmerchantsearch.value != "" && txtmerchantsearch.value != undefined) {
        var randgoInputData = '';
        randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
        randgoInputData = randgoInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
        randgoInputData = randgoInputData + '<soap:Body>';
        randgoInputData = randgoInputData + '<DisplayMerchantsBySearch xmlns="http://tempuri.org/">'
        randgoInputData = randgoInputData + '<dSessionID>' + localStorage.randgosessionid + '</dSessionID>'
        randgoInputData = randgoInputData + '<dSearch>' + txtmerchantsearch.value + '</dSearch>'
        randgoInputData = randgoInputData + '</DisplayMerchantsBySearch>'
        randgoInputData = randgoInputData + '</soap:Body>';
        randgoInputData = randgoInputData + '</soap:Envelope>';

        CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', GetMerchantsBySearchCallback);
    }


}

function GetMerchantsBySearchCallback(responseData) {

    if (checkLogin()) {
        try {
            // alert("DisplayMerchantsBySearch::::::::::::" + responseData);
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                if (xmlDoc.getElementsByTagName("message")[0].textContent === "Your session has timed out. Please open a new session.") {
                    localStorage.randgosessionid = null;
                    jAlert('Your session has expired. Please login again.', 'Info');
                    prevPage = currentPage;
                    $.mobile.changePage('#log', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'log';
                    pageData.push(currentPage);

                }
                var gettbldisplaycategoriesbycid = document.getElementById('tbldisplaycategoriesbycid');
                gettbldisplaycategoriesbycid.innerHTML = null;
                if (xmlDoc.getElementsByTagName("merchant") != null && xmlDoc.getElementsByTagName("merchant").length > 0) {
                    var merchantlist = xmlDoc.getElementsByTagName("merchant");

                    for (var i = 0; i < merchantlist.length; i++) {
                        var rowcount = gettbldisplaycategoriesbycid.rows.length;
                        var row = gettbldisplaycategoriesbycid.insertRow(rowcount);
                        row.setAttribute('class', 'tdbgc');
                        var merchantid = xmlDoc.getElementsByTagName('merchant')[i].getAttribute("id");
                        row.setAttribute('id', 'row' + merchantid);

                        var imgpath = xmlDoc.getElementsByTagName('merchant')[i].getAttribute("imageUrl");
                        //row.setAttribute('imageUrl', 'row' + imgpath);

                        //var cellBlank1 = row.insertCell(0);
                        // cellBlank1.setAttribute('class', 'regcol1');
                        var logoimgcell = row.insertCell(0);
                        var logoimg = document.createElement("img");
                        logoimg.src = imgpath;
                        logoimg.setAttribute('class', 'logoimgclass');
                        logoimgcell.setAttribute('class', 'cellclass');
                        logoimgcell.appendChild(logoimg);

                        var cell = row.insertCell(1);
                        var lblcategory = document.createElement("label");
                        cell.appendChild(lblcategory);
                        cell.setAttribute('class', 'textstyle1 gorow');
                        lblcategory.innerHTML = xmlDoc.getElementsByTagName("merchant")[i].textContent;

                        var celimg = row.insertCell(2);
                        var img = document.createElement("img");
                        img.src = 'public/images/EAslicing/singlerightarrow.png';
                        img.setAttribute('class', 'rightarr');
                        celimg.setAttribute('align', 'center');
                        celimg.setAttribute('class', 'regcol2');
                        celimg.appendChild(img);

                        //var cellBlank2 = row.insertCell(3);
                        //cellBlank2.setAttribute('class', 'regcol1');

                        row.onclick = function () {
                            // window.location.href = "../Help/goeat.html?merchantId=" + this.id + "&merchantname=" + this.innerText;
                            var merchantId = this.id;
                            merchantId = merchantId.replace('row', '');

                            //heading display
                            var MName = this.innerText.replace(/%20/g, ' ');
                            document.getElementById('tblmerchantnameheading').innerHTML = MName;
                            prevPage = currentPage;
                            $.mobile.changePage('#goeat', {
                                transition: "none",
                                reverse: false,
                                changeHash: false
                            });
                            currentPage = 'goeat';
                            pageData.push(currentPage);
                            GetDisplayMerchantDeals(merchantId);
                        }
                    }

                }
                else {
                    jAlert('No Data Found', 'Info');
                }
            }

        } //try
        catch (exp) {

        } //catch
    } //checklogin
}

/*****************************************************************************************************
* PURPOSE :RequestSMSDeal
* AUTHOR : ASHA
* CREATED DATE : DEC 7th 2013
******************************************************************************************************/
function GetRequestSMSDeal(dealID) {
    //  alert("GetRequestSMSDeal:::::::");
    var randgoInputData = '';
    randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
    randgoInputData = randgoInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
    randgoInputData = randgoInputData + '<soapenv:Header/>';
    randgoInputData = randgoInputData + '<soapenv:Body>';
    randgoInputData = randgoInputData + '<tem:RequestSMSDeal>';
    randgoInputData = randgoInputData + '<tem:rSessionId>' + localStorage.randgosessionid + '</tem:rSessionId>';
    randgoInputData = randgoInputData + '<tem:rDealId>' + dealID + '</tem:rDealId>';
    randgoInputData = randgoInputData + '<tem:rFirstName>' + localStorage.firstname + '</tem:rFirstName>';
    randgoInputData = randgoInputData + '<tem:rSurname>' + localStorage.SurName + '</tem:rSurname>';
    randgoInputData = randgoInputData + '<tem:rContact>' + localStorage.CellNumber + '</tem:rContact>';
    randgoInputData = randgoInputData + '</tem:RequestSMSDeal>';
    randgoInputData = randgoInputData + '</soapenv:Body>';
    randgoInputData = randgoInputData + '</soapenv:Envelope>';
    CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', GetRequestSMSDealCallback);
    //alert("RequestSMSDeal:::request::::::::::" + randgoInputData);
}

function GetRequestSMSDealCallback(responseData) {
    // alert("RequestSMSDeal:::response::::::::::" + responseData);
    if (checkLogin()) {
        try {
            // alert("Display Merchant Deals:::::::::::::" + responseData);
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                if (xmlDoc.getElementsByTagName("message")[0].textContent == "Your session has timed out. Please open a new session.") {
                    localStorage.randgosessionid = null;
                    jAlert('Your session has expired. Please login again.', 'Info');
                    prevPage = currentPage;
                    $.mobile.changePage('#log', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });

                    currentPage = 'log';
                    pageData.push(currentPage);
                }
                else {

                    if (xmlDoc.getElementsByTagName("deals") != null && xmlDoc.getElementsByTagName("deals").length > 0) {

                        document.getElementById('divmsg').innerHTML = xmlDoc.getElementsByTagName("deals")[0].getElementsByTagName("oprationMessage")[0].textContent;
                        jAlert(xmlDoc.getElementsByTagName("message")[0].textContent + " oprationMessage: " + document.getElementById('divmsg').innerText, 'Info');


                    }

                    else {
                        jAlert('No Data Found', 'Info');
                    }
                }
            }
        } catch (exp) {

        }
    }
}

/**************** DEC 7th 2013 ASHA ****************************/
function GetRequestPrintDeal(dealID) {
    var randgoInputData = '';
    randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
    randgoInputData = randgoInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
    randgoInputData = randgoInputData + '<soapenv:Header/>';
    randgoInputData = randgoInputData + '<soapenv:Body>';
    randgoInputData = randgoInputData + '<tem:RequestPrintDeal>';
    randgoInputData = randgoInputData + '<tem:rSessionId>' + localStorage.randgosessionid + '</tem:rSessionId>';
    randgoInputData = randgoInputData + '<tem:rDealId>' + dealID + '</tem:rDealId>';
    randgoInputData = randgoInputData + '</tem:RequestPrintDeal>';
    randgoInputData = randgoInputData + '</soapenv:Body>';
    randgoInputData = randgoInputData + '</soapenv:Envelope>';

    CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', GetRequestPrintDealCallback);
}


function GetRequestPrintDealCallback(responseData) {
    if (checkLogin()) {
        try {
            // alert("RequestPrintDeal:::::responseData::::::::" + responseData);
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                document.getElementById('divmsg').innerHTML = xmlDoc.getElementsByTagName("deal")[0].getElementsByTagName("offerDescription")[0].textContent;
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent + " - " + document.getElementById('divmsg').innerText, 'Info');
                /**DEC 7th **/
                //  document.getElementById('divmsg').innerHTML = xmlDoc.getElementsByTagName("deal")[0].getElementsByTagName("redemptionDetails")[0].textContent;
                // alert(xmlDoc.getElementsByTagName("message")[0].textContent + " redemptionDetails::::::::: " + document.getElementById('divmsg').innerText);
                /**DEC 7th end**/
                if (xmlDoc.getElementsByTagName("message")[0].textContent === "Your session has timed out. Please open a new session.") {
                    localStorage.randgosessionid = null;
                    jAlert('Your session has expired. Please login again.', 'Info');
                    prevPage = currentPage;
                    $.mobile.changePage('#log', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'log';
                    pageData.push(currentPage);

                }
                else {
                    //jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
                }
            }
        } catch (exp) {
            //alert(exp);
        }
    }
}


function GetRequestUrlDeal(dealID) {
    var randgoInputData = '';
    randgoInputData = '<?xml version="1.0" encoding="utf-8"?>';
    randgoInputData = randgoInputData + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">';
    randgoInputData = randgoInputData + '<soapenv:Header/>';
    randgoInputData = randgoInputData + '<soapenv:Body>';
    randgoInputData = randgoInputData + '<tem:RequestUrlDeal>';
    randgoInputData = randgoInputData + '<tem:rSessionId>' + localStorage.randgosessionid + '</tem:rSessionId>';
    randgoInputData = randgoInputData + '<tem:rDealId>' + dealID + '</tem:rDealId>';
    randgoInputData = randgoInputData + '</tem:RequestUrlDeal>';
    randgoInputData = randgoInputData + '</soapenv:Body>';
    randgoInputData = randgoInputData + '</soapenv:Envelope>';

    CallWebService('http://www.randgo.com/3rdpartyservices/Service.asmx', randgoInputData, 'POST', 'text/xml', GetRequestUrlDealCallback);
}



function GetRequestUrlDealCallback(responseData) {
    if (checkLogin()) {
        try {
            //alert("Request Url Deal:::::::::::::" + responseData);
            responseData = responseData.replace(/&gt;/gi, '>');
            responseData = responseData.replace(/&lt;/gi, '<');
            var parser = new DOMParser();
            if (responseData !== "") {
                xmlDoc = parser.parseFromString(responseData, "text/xml");
                var alertmsg = xmlDoc.getElementsByTagName("deals")[0].getElementsByTagName("url")[0].textContent;
                jAlert(xmlDoc.getElementsByTagName("message")[0].textContent + " - " + alertmsg, 'Info');
                if (xmlDoc.getElementsByTagName("message")[0].textContent === "Your session has timed out. Please open a new session.") {
                    localStorage.randgosessionid = null;
                    jAlert('Your session has expired. Please login again.', 'Info');
                    prevPage = currentPage;
                    $.mobile.changePage('#log', {
                        transition: "none",
                        reverse: false,
                        changeHash: false
                    });
                    currentPage = 'log';
                    pageData.push(currentPage);

                }
                else {
                    //jAlert(xmlDoc.getElementsByTagName("message")[0].textContent, 'Info');
                }
            }
        } catch (exp) {
            //alert(exp);
        }
    }
}


