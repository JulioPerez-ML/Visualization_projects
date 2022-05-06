// establecer las dimensiones y los márgenes del gráfico
var margin = {top: 50, right: 30, bottom: 30, left: 90},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// añadir el objeto svg al cuerpo de la página
var svg = d3.select("#bubble")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Cargar los datos
d3.csv("https://raw.githubusercontent.com/JulioPerez-ML/Visualization_projects/main/Datasets/dataframe_puertos_tenerife_2.csv", function(data) {

  // Añadir el eje X
  var x = d3.scaleLinear()
    .domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function(d) { return d.year; })])
    .range([ 0, width ]);
  
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Años");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([8000000, 20000000])
    .range([ height,0]);
  svg.append("g")
    .call(d3.axisLeft(y));
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y",-30)
    .attr('x',30)
    .attr("dy", ".75em")
    .attr("transform", "rotate(0)")
    .text("Tráfico Total(Tn)");
  // poner por fuera del eje o por encima

  // Añadir la escala a los círculos
  var z = d3.scaleSqrt()
    .domain([0,100000])
    .range([ 1, 10]);

  // Añadir la representación de los datos
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.year); } )
      .attr("cy", function (d) { return y(d.total_traffic); } )
      .attr("r", function (d) { return z(d.fresh_fish); } )
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")

})