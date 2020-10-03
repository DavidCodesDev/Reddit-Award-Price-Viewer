(function(){


    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'reddit.com'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);

})
chrome.runtime.onMessage.addListener(
  
  function(request, sender, sendResponse){
     
  }
);

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      
      if (tab.url.includes('reddit.com')) {

        fetch(tab.url + '/.json').then((data) => data.json()).then((jsonData) => {
          for (let i = 0; i < jsonData.data.children.length; i++) {
           
              jsonData.data.children[i].data.all_awardings.map
              
            
            jsonData.data.children[i].data.all_awardings
            
          }
          console.log(jsonData.data.children);
          })
      }

    }
});
  
  
      })();