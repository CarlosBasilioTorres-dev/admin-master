class MasterChart {
    constructor(properties) {
        this.properties = properties;
        this.initActions();
    }

    setPieChartElements(element) {
        var cadena = "";

        var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>"
        svg += "<path d='M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z'/></svg>";

        for (var i = 0; i < this.properties.datas.length; i++) {
            cadena = cadena + svg;
        }

        element.innerHTML = cadena;

    }

    setStrokes(element, divider) {

        var counter = 100;

        element.querySelectorAll("svg").forEach((element, index) => {

            element.style.width = this.properties.width
            element.style.height = this.properties.width


            counter -= this.properties.datas[index].data;
            element.style.stroke = this.properties.datas[index].color;
            element.style.transform = "rotatez(" + ((3.6 * (counter / divider))) + "deg) scale(1)";
            setTimeout(() => {
                element.style.strokeDashoffset = 3.15 * (100 - (Number(this.properties.datas[index].data) / divider)) + "%";
            })
        });
    }


    createPieChart(divider) {

        var pie_chart = document.createElement("div");

        pie_chart.classList.add("pie-chart");
        pie_chart.style.width = this.properties.width;
        pie_chart.style.height = this.properties.width;

        this.container.appendChild(pie_chart);
        this.setPieChartElements(pie_chart);
        this.setStrokes(pie_chart, divider)
    }

    validatePieDatas() {
        var counter = 0;

        this.properties.datas.forEach(element => {
            counter += element.data;
        })

        return counter == 100
    }

    createCenterCircle() {

        this.circle = document.createElement("div");
        this.circle.classList.add("circle-center");
        this.circle.textContent = this.properties.value + "%";

        this.container.appendChild(this.circle)

    }

    percentCorrection() {
        var r_circle = this.container.querySelector("svg");
        r_circle.style.transform = "rotateZ(269deg) scale(1)";
    }

    pieChartCorrectionForVelocimeter() {
        var element = document.querySelector(".pie-chart");
        var velocimetro = document.querySelector(".velocimetro");

        element.style.transform = "rotateZ(180deg) rotateY(180deg)";
        velocimetro.style.width = this.properties.width;
        velocimetro.style.height = (this.properties.width.replace("px", "") / 2) + "px";

        document.querySelectorAll(".velocimetro .labels").forEach((label, index) => {
            label.style.transform = "rotateZ(" + (18 * index) + "deg)";

            if (index == 0) {
                label.style.transform = "rotateZ(2deg)";
            }

            if (index == 10) {
                label.style.transform = "rotateZ(178deg)";
            }

            if (index > 5) {
                label.firstElementChild.style.transform = "rotateY(180deg) rotateX(180deg)";
            }
        })

    }

    addVelocimeterMeasures() {
        for (var i = 0; i <= 10; i++) {
            var label = document.createElement("div");
            var masures_makers = document.createElement("div");

            label.classList.add("labels")
            label.style.width = this.properties.width;
            label.style.height = this.properties.width;

            masures_makers.classList.add("measures-makers")
            masures_makers.textContent = (i * 10) + "%"

            label.appendChild(masures_makers)

            this.container.appendChild(label)
        }
    }

    addMarker() {
        var marker_container = document.createElement("div");
        var marker = document.createElement("div");

        marker_container.classList.add("marker-container")
        marker.classList.add("marker");

        marker_container.append(marker);
        this.container.appendChild(marker_container);

        marker.style.borderBottom = "2px solid " + this.properties.color[3];
        marker_container.style.transform = "rotateZ(" + 1.8 * this.properties.value + "deg)"
        if (!this.properties.color[3]) {
            console.warn("No se ha condigurado color para indicador")
        }

    }

    setColorsForVelocimeter() {
        if (this.properties.color) {
            this.properties.datas = [{
                data: 75,
                value: "cuota",
                color: this.properties.color[0] || "green"
            }, {
                data: 15,
                value: "cuota",
                color: this.properties.color[1] || "yellow"
            }, {
                data: 10,
                value: "cuota",
                color: this.properties.color[2] || "red"
            }]

            return true
        } else {
            return false
        }
    }

    createChart() {
        switch (this.properties.type) {
            case 1:
                if (this.validatePieDatas()) {
                    this.createPieChart(1);
                } else {
                    console.warn("La suma de elementos debe de ser igual a 100%")
                }
                break;

            case 2:

                this.properties.datas = [{
                    data: this.properties.value,
                    value: "cuota",
                    color: this.properties.color
                }]

                this.createPieChart(1);
                this.percentCorrection();
                this.createCenterCircle();
                break;
            case 3:
                if (this.setColorsForVelocimeter()) {
                    this.createPieChart(2);
                    this.addVelocimeterMeasures();
                    this.pieChartCorrectionForVelocimeter();
                    this.addMarker()
                } else {
                    console.error("Por favor configura los colores que necesitas para tu grafica")
                }

                break;

        }
    }

    initActions() {
        this.container = document.querySelector(this.properties.container);
        this.createChart();
    }
}