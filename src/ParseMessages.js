ReqRedeem = {};

ReqRedeem.parser = function() {
  
  var port = chrome.runtime.connect({name:"backgroundComm"});
  var enabled = false;
  
  
  var codes = [];       // potential codes
  var codeWeights = {}; // numeric value representing potential of code
  var codeUsers = {};   // keep track of all users suggesting the same value
  
  // default enabled state to saved checkbox setting
  chrome.storage.sync.get({enabled:false}, function(items) {
    enabled = items.enabled;
  });
    
  // parse potential codes out of twitch chat messages
  setInterval(function() {
    if (enabled) {
      $(".chat-line").each(function(i, li){
        if (!($(li).find('.message').attr("parsed") == "yes")) { // check flag for already parsed
          
          // prep chat message
          var chatData = {};
          $(li).find('.message').attr("parsed", "yes");          // set flag to ignore later
          chatData.user = $(li).find('.from').prop('innerText'); // get username
          chatData.text = $(li).find('.message').prop('innerText');
          
          // case-insensitive check for chat text containing a string
          if (chatData.text.toLowerCase().indexOf('code') >= 0) {
            
            // split message text into individual words, using all special characters as delimiters
            chatData.words = $(li).find('.message').prop('innerText').split(/\;|\:|\'|\"|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\+|\-|\=|\{|\}|\[|\]|\<|\>|\?|\,|\.|\/| /)
            // console.log('Converted "code" message from "' + chatData.text + '" to array: [' + chatData.words.join() + ']')
            
            // loop through potential code words
            chatData.words.forEach(function(code) {
              
              if (codes.indexOf(code) == -1) {
                
                // not a potential code yet, check against rules
                if ((code.length >= 8) && 
                   (code.length <= 12) &&
                   (code == code.toUpperCase())) {
                  // save code
                  codeUsers[code] = [chatData.user];
                  codeWeights[code] = 1; // initial weight is low
                  codes.push(code);
                }
              } else {
                
                // already a potential code
                if ((codeUsers[code].indexOf(chatData.user) == -1) && 
                   (codeWeights[code] > 0)) {
                  
                  // new user for existing code, increase weight
                  codeWeights[code] += 1;
                  codeUsers[code].push(chatData.user);
                }
              }
            });
          }
        }
      });
      
      chatData = null;
    }
  }, 500);
  
  // loop through potential codes and send to submit tab if high enough weight
  setInterval(function() {    
    if ((enabled) && (codes.length > 0)) {
      for (var i = 0; i < codes.length; i++) {
        code = codes[i];
        if (codeWeights[code] >= 1) { 
        
          // weight is high enough, build a message
          var msg = {
            service: "newCode", 
            code: code
          };
          console.log('Sent message: ' + msg.service + ', ' + msg.code);
          port.postMessage(msg)
          msg = null;    
          
          // never try the same code twice
          codeWeights[code] = 0;
          
          msg = null;
        }
      };
    }
    
  }, 500);
  
  chrome.extension.onMessage.addListener(function(msg, sender, response) {
    if (msg.service == "toggleEnabled") {
      console.log("toggle received: " + msg.data.toString());
      enabled = msg.data;
    }
  });
  
};

ReqRedeem.parser();