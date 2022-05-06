//https://www.goodmarketing.club/guide/d3-js-multiple-lines-chart-w-line-by-line-code-explanations/

//Leyenda
//https://bl.ocks.org/d3noob/7cd5a74c4620db72f43f

// establecer las dimensiones y los márgenes del gráfico
var margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// añadir el objeto svg al cuerpo de la página
var svg = d3.select("#line-chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Cargar los datos
d3.csv("https://raw.githubusercontent.com/JulioPerez-ML/Visualization_projects/main/Datasets/dataframe_4_cultivos.csv", function(data) {

  // agrupar los datos: Quiero dibujar una línea por grupo
  var sumstat = d3.nest() // La función nest permite agrupar el cálculo por nivel de un factor, en este caso Cultivo
    .key(function(d) { return d.Cultivo;})
    .entries(data);
  
  legendSpace = width/sumstat.length; // espaciado para la leyenda

  // Añadir eje X --> es un formato de fecha
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.Año; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Añadir eje Y
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.Precio; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // paleta de colores
  var res = sumstat.map(function(d){ return d.key }) // listado de los grupos
  var color = d3.scaleOrdinal()
    .domain(res)
.range(['#e41a1c','#377eb8','#4daf4a','#984ea3',
        '#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
console.log(res)
  // Dibujar las líneas 
  svg.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.Año); })
            .y(function(d) { return y(+d.Precio); })
            (d.values)
        })
  // Implementamos la leyenda
  sumstat.forEach(function(d,i){
    // La añadimos al objeto svg
        svg.append("text")
            .attr("x", (legendSpace/2)+i*legendSpace) // espaciado
            .attr("y", height + (margin.bottom/2)+ 15)
            .attr("class", "legend")    // estilo de la leyenda
            .style("fill", function() { // implementamos los colores dinámicos
                return d.color = color(d.key); })
            .text(d.key);
  })

})