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

    setStrokes(element) {

        var counter = 100;

        element.querySelectorAll("svg").forEach((element, index) => {

            element.style.width = this.properties.width
            element.style.height = this.properties.width


            counter -= this.properties.datas[index].data;
            element.style.stroke = this.properties.datas[index].color;
            element.style.transform = "rotatez(" + (3.6 * counter) + "deg) scale(1)";
            setTimeout(() => {
                element.style.strokeDashoffset = 3.15 * (100 - Number(this.properties.datas[index].data)) + "%";
            })
        });
    }

    createPieChart() {

        var pie_chart = document.createElement("div");

        pie_chart.classList.add("pie-chart");
        pie_chart.style.width = this.properties.width;
        pie_chart.style.height = this.properties.width;

        this.container.appendChild(pie_chart);
        this.setPieChartElements(pie_chart);
        this.setStrokes(pie_chart)
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

    createChart() {
        switch (this.properties.type) {
            case 1:
                if (this.validatePieDatas()) {
                    this.createPieChart();
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

                this.createPieChart();
                this.percentCorrection();
                this.createCenterCircle();
                this.startintervals();
                break;
        }
    }

    initActions() {
        this.container = document.querySelector(this.properties.container);
        this.createChart();
    }
}