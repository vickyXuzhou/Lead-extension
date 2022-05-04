
let myleads = []
let inputEl = document.getElementById("input-el")
let saveEl = document.getElementById("save-btn");
let ulEl = document.getElementById("ul-el")
let deleteBTN = document.getElementById("delete-btn")
let elementfrmlocalst = JSON.parse(localStorage.getItem("myleads"))
let savetab = document.getElementById("save-tab")
if(elementfrmlocalst){
    myleads = elementfrmlocalst;
    renderLeads(myleads)
}

saveEl.addEventListener("click", function(){
    myleads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myleads",JSON.stringify(myleads));
 renderLeads(myleads)   
 
 console.log("the local storage is "+elementfrmlocalst)
})


savetab.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("tabs",JSON.stringify(myleads))
        let tablocal = JSON.parse(localStorage.getItem("tabs"))
        console.log(tablocal)
        if(tablocal){
            myleads=tablocal;
        }
        renderLeads(myleads);
    })

})
deleteBTN.addEventListener("click",function(){
    localStorage.clear();
    myleads = []
    renderLeads(myleads);
})

function renderLeads(leads){
let mylist = ""
for(let i = 0; i<myleads.length; i++){
    
    mylist+=`<li><a target="_blank" href="${leads[i]}">${leads[i]}</a></li>`
}
ulEl.innerHTML=mylist;
}