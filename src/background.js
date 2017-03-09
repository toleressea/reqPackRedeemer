if (typeof ReqRedeem == 'undefined') {
  window.ReqRedeem = {};
}

ReqRedeem = {
  broker: (function(){
    
    var private_var = {
      messages: [],
      port: chrome.runtime.connect({name: "backgroundComm"})
    }
    
    return{
      init:function(){
        chrome.runtime.onConnect.addListener(function(port) {
          if (port.name == "backgroundComm") {
            port.onMessage.addListener(function(msg) {
              console.log('Received message: ' + msg.service);
              
              if (msg.service == "newCode") {                
                chrome.tabs.query({url: "https://www.halowaypoint.com/*"}, function(tabs) {
                  console.log('Sent message: ' + msg.service + ', ' + msg.code);
                  chrome.tabs.sendMessage(tabs[0].id, msg, function(){});
                });
              }
              
              if (msg.service == "toggleEnabled") {
                chrome.tabs.query({url: "https://www.twitch.tv/*"}, function(tabs) {
                  console.log('Sent message: ' + msg.service);
                  chrome.tabs.sendMessage(tabs[0].id, msg, function(){});
                });
              }
            });
          }
        });
      }
    }
    
  }())
}

ReqRedeem.broker.init();