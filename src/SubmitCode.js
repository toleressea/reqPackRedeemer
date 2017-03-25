ReqRedeem = {};

ReqRedeem.submitter = function() {
  
  var port = chrome.runtime.connect({name:"backgroundComm"});
  var queue = [];
  var history = [];
  
  chrome.extension.onMessage.addListener(function(msg, sender, nullResponse) {
    console.log('Received message: ' + msg.service);
    if (msg.service == "newCode") {
      // check for duplicate with previously tried codes
      if (history.indexOf(msg.code) == -1) {
        console.log('Adding new code to queue: ' + msg.code);
        history.push(msg.code);
        queue.push(msg.code);
      } else {
        console.log('Code already tried: ' + msg.code)
      }
    }
  });
  
  setInterval(function() {
    if (queue.length > 0) {
      // get code from queue
      var code = queue.shift();
      
      // set the web edit box to potential code
      console.log('Redeeming code: ' + code)
      document.getElementsByName('code')[0].value = code;
      
      // submit code to search
      $(":contains('Redeem')").closest('button').click();
      
      code = null;      
    }
  }, Math.random() * (60000 - 45000) + 45000);
};

ReqRedeem.submitter();