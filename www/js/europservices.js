
/*****************************************************************************************************
* PURPOSE :CreatePleaseCallMeRequest(Services indexervice.html)
* AUTHOR : THRUPTHI
* CREATED DATE : 28 JUN 2013
******************************************************************************************************/
function CreatePleaseCallMeRequest() {
    var europInputData = "";
    europInputData = '<?xml version="1.0" encoding="utf-8"?>';
    europInputData = europInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    europInputData = europInputData + '<soap:Body>';
    europInputData = europInputData + '<CreatePleaseCallMeRequest xmlns="https://api.europassistance.co.za/">';
    europInputData = europInputData + '<mobileUserGuid></mobileUserGuid>';
    europInputData = europInputData + '<validateOnly>false</validateOnly>';
    europInputData = europInputData + '<testOnly>true</testOnly>';
    europInputData = europInputData + '<mobileProductGuid></mobileProductGuid>';
    europInputData = europInputData + '<latitude></latitude>';
    europInputData = europInputData + '<longitude></longitude>';
    europInputData = europInputData + '</CreatePleaseCallMeRequest>';
    europInputData = europInputData + '</soap:Body>';
    europInputData = europInputData + '</soap:Envelope>';
    //europInputData = '<?xml version="1.0" encoding="utf-8"?>';
    //europInputData = europInputData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    //europInputData = europInputData + '<soap:Body>';
    //europInputData = europInputData + '<CreatePleaseCallMeRequest xmlns="https://api.europassistance.co.za/">';
    //europInputData = europInputData + '<mobileUserGuid></mobileUserGuid>';
    //europInputData = europInputData + '<validateOnly>false</validateOnly>';
    //europInputData = europInputData + '<testOnly>true</testOnly>';
    //europInputData = europInputData + '<mobileProductGuid></mobileProductGuid>';
    //europInputData = europInputData + '<latitude></latitude>';
    //europInputData = europInputData + '<longitude></longitude>';
    //europInputData = europInputData + '</CreatePleaseCallMeRequest>';
    //europInputData = europInputData + '</soap:Body>';
    //europInputData = europInputData + '</soap:Envelope>';

    CallWebService('https://api.europassistance.co.za/services/MobileServices.asmx', europInputData, 'POST', 'text/xml', CreatePleaseCallMeRequestCallback);
    //alert(europInputData + 'Europinput');
    //CreatePleaseCallMeRequestCallback();
}
function CreatePleaseCallMeRequestCallback(responseData) {
    //responseData = '';
    //responseData = '<?xml version="1.0" encoding="utf-8"?>';
    //responseData = responseData + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    //responseData = responseData + '<soap:Body>';
    //responseData = responseData + '<CreatePleaseCallMeRequestResponse xmlns="https://api.europassistance.co.za/">';
    //responseData = responseData + '<CreatePleaseCallMeRequestResult>';
    //responseData = responseData + '<SuccessfulTransactionGuid>guid</SuccessfulTransactionGuid>';
    //responseData = responseData + '<ErrorCode></ErrorCode>';
    //responseData = responseData + '<ErrorMessage></ErrorMessage>';
    //responseData = responseData + '<ExecutionTimeInMilliSeconds></ExecutionTimeInMilliSeconds>';
    //responseData = responseData + '</CreatePleaseCallMeRequestResult>';
    //responseData = responseData + '</CreatePleaseCallMeRequestResponse>';
    //responseData = responseData + '</soap:Body>';
    //responseData = responseData + '</soap:Envelope>';
    //alert(responseData);
    jAlert("The System is temporarily unavailable, please try again later.", 'Info');
    try
    {
    }
    catch (exp) {
        //alert(exp);
   }
    //alert(responseData);
}



