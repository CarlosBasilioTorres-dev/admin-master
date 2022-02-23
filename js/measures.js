class Measures{

    constructor(properties){
        console.warn("Bienvenido a adminMaster, esta clase es un ejemplo para que aprendas a utilizar esta libreria, todos los errores apareceran en españos e ingles para que puedas entenderlo mejor");
        console.warn("Welcome to adminMaster, this class is an example to learn how to use this library, all errors will appear in spanish and english to understand it better");

        this.properties = properties;
        this.cards = properties.cards;
        this.values = properties.values;
        this.dark = properties.dark;

        this.init()
    }

    setCardElements(){
        this.values.forEach((value,index) => {
            var element = document.createElement('div');
            element.classList.add("card-container")
            element.setAttribute('data-value',value.value);

            var body = document.createElement('div');
            body.classList.add("card-body");

            var progress_container = document.createElement('div');
            progress_container.classList.add("progress-container");

            var card_number = document.createElement('div');
            card_number.classList.add("card-number");
            card_number.innerHTML = "0%";

            var progress = document.createElement('div');
            progress.classList.add("progress");

            var progress_bar = document.createElement('div')
            progress_bar.classList.add("progress-bar");
            progress_bar.style.height = "0%";

            var card_concept = document.createElement('div');
            card_concept.classList.add("card-concept");
            card_concept.classList.add("bg-green");
            card_concept.innerHTML = value.concept;


            progress.appendChild(progress_bar);
            progress_container.appendChild(progress)
            progress_container.appendChild(card_number);
            body.appendChild(progress_container);
            element.appendChild(body);
            element.appendChild(card_concept);
            this.container.appendChild(element);
        })
    }

    setContainer(){
        this.container = document.createElement('div');
        this.container.classList.add('cards-container');
        this.container.classList.add('col-2');

        document.querySelector(this.properties.container).appendChild(this.container);
    }

    startAnimation(){
        var self = this;
        document.querySelectorAll(".card-container").forEach((card,index) => {
            var element = card.querySelector(".progress-bar").style.height.replace("%","");
            if(card.getAttribute('data-value').localeCompare(element) != 0){
                card.querySelector(".progress-bar").style.height = (Number(element) + 1) + "%";
                card.querySelector(".card-number").textContent = (Number(element) + 1) + "%";
            }
        })
    }

    setDarkMode(){
    
        if(this.dark){
            document.querySelector(this.properties.container).classList.add("dark-mode");
        }else{
            document.querySelector(this.properties.container).classList.remove("dark-mode");
        }
    }

    init(){
        if(this.dark === undefined){
            this.dark = false;
        }
        
        this.setContainer();
        this.setCardElements();
        setInterval(this.startAnimation,10)
        
        this.setDarkMode();
    }

}