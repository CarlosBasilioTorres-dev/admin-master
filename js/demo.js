document.querySelector(".switch-button").addEventListener("click",(evt) => {
    if(evt.target.querySelector("input").checked){
        document.querySelector("input").checked = false;
        document.querySelector(".switch-button").classList.remove("on");
        document.querySelector("body").classList.remove("dark-mode");
    }else{
        document.querySelector("input").checked = true;
        document.querySelector(".switch-button").classList.add("on");
        document.querySelector("body").classList.add("dark-mode");
    }
})