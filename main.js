const puppeteer = require("puppeteer");

let link = 'https://www.wikipedia.org/';

let browserOpen = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args :['--start-maximized']
})

let page

browserOpen.then(function(browserObj){
    let browserOpenPromsie = browserObj.newPage()
    return browserOpenPromsie; 
}).then(function(newTab){
    page = newTab
    let wikiOpenPromise = newTab.goto(link)
    return wikiOpenPromise;
}).then(function(){
    let enClick = page.click('a[title="English — Wikipedia — The Free Encyclopedia"]',{delay:100})
    return enClick;
}).then(function(){
    let portalClick = page.click('a[title="Wikipedia:Contents/Portals"]',{delay:500})
    return portalClick;
}).then(function(){
    let a2z = waitAndClick('a[title="Wikipedia:Contents/A–Z index"]',page)
    return a2z;
}).then(function(){
    let SelectS = waitAndClick('a[href="/wiki/Special:AllPages/S"]',page)
    return SelectS;
}).then(function(){
    let sSelect = waitAndClick('a[href="/wiki/S"]',page)
    return sSelect;
}).then(function(){
    let history = waitAndClick('span[class="toctext"]',page)
    return history;

    
}).then (async function(){
    // let textArr = pag("div.hatnote.navigation-not-searchable p");
  await page.waitForSelector(".hatnote.navigation-not-searchable a[title='Shin (letter)']")
  let textArr = await page.$eval(".hatnote.navigation-not-searchable a[title='Shin (letter)']" );
  let value = await page.evaluate(el=>el.textContent , textArr)
    console.log(value);

})




//-----to wait for selctor of upcoming page---//
function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector);
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(){
            reject(); 
        })
    })
}