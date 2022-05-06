// Set graph margins and dimensions
// Seteamos el margen izquierdo a 90 para que no corte las clases Tenerife, Gran Canaria, etc
var margin = {top: 20, right: 20, bottom: 30, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Establecemos los ejes X e Y

var x = d3.scaleLinear()
          .range([0,height])

var y = d3.scaleBand()
          .range([0,width])
          .padding(0.1);

//Generamos el elemento svg con con las dimensiones antes indicadas y los márgenes
var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Cargamos los datos
d3.csv("https://raw.githubusercontent.com/JulioPerez-ML/Visualization_projects/main/data.csv").then(function(data) {
  console.log('lectura de datos', data)

  // Escala el rango de los datos en los dominios
  x.domain([0, d3.max(data, function(d) { return d.value; })]);
  console.log('Dominio de X',x.domain())
  
  y.domain(data.map(function(d) { return d.place; }));
  console.log('Dominio de Y', y.domain())
  
  // Añadir rectángulos para el gráfico de barras
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr('x',x(0))
      .attr('y', function(d) {
            console.log(y(d.place))
            return y(d.place)
      })
      .attr('width', d => x(d.value))
      .attr('height', y.bandwidth())

  // Añadir el eje X
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Añadir el eje Y
  svg.append("g")
      .call(d3.axisLeft(y));
  // Añadir la leyenda en el eje Y
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Precio(€)");

});