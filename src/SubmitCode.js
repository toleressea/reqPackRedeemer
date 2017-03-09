ReqRedeem = {};

ReqRedeem.submitter = function() {
  
  var port = chrome.runtime.connect({name:"backgroundComm"});
  
  chrome.extension.onMessage.addListener(function(msg, sender, nullResponse) {
    console.log('Received message: ' + msg.service);
    if (msg.service == "newCode") {      
      
      // TODO - Replace this with logic for tournament Halo.gg redeem functionality
      
      // set the web edit box to potential code
      document.getElementsByName('query')[0].value = msg.code;
      
      // submit code to search
      document.forms[0].submit();
    }
  });
};

ReqRedeem.submitter();