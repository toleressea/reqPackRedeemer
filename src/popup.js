var popupObject = {};

popupObject.port = chrome.runtime.connect({name: "backgroundComm"});

function restore() {
  chrome.storage.sync.get({
    enabled:false
  }, function(items) {
    $("#enabled").prop("checked", items.enabled);
  });
}

function save() {
  chrome.storage.sync.set({
    enabled: $("#enabled").is(':checked')
  }, function() {});
}

$("#enabled").click(function(){
  msg = {};
  msg.service = 'toggleEnabled';
  msg.data = $("#enabled").is(":checked");
  popupObject.port.postMessage(msg);
  msg = null;
  
  save();
});

restore();