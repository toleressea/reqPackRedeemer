ReqRedeem = {};

ReqRedeem.submitter = function() {
  
  var port = chrome.runtime.connect({name:"backgroundComm"});
  
  chrome.extension.onMessage.addListener(function(msg, sender, nullResponse) {
    console.log('Received message: ' + msg.service);
    if (msg.service == "newCode") {      
      
      // set the web edit box to potential code
      console.log('Attempting code: ' + msg.code)
      document.getElementsByName('code')[0].value = msg.code;
      
      // submit code to search
      document.forms[2][1].click();
    }
  });
};

ReqRedeem.submitter();