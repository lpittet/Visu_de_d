//d3.csv('Divorces_totaux.csv')
//.then(data => {
//    data.forEach(d=> {
//        d.Divorces = +d.Divorces;
//        d["annees"] = +d["annee"];
//    });
//    return data
//    
//})
   
//d3
  //.csv("https://cdn.rawgit.com/vlandham/js_data/master/data/cities.csv")
  //.then(data => {
    //data.forEach(d => {
      //d.population = +d.population;
      //d["land area"] = +d["land area"];
    //});
    //return data;
  //})

//  let data = d3.csv('Divorces_totaux.csv',function(d){
//    return {
//      annees : d.annees, 
//      divorces : +d.divorces,
//    }
//  }) 
//  .then(data => {
//    console.log("Divorces",data);

// //   let empan_divorces = d3.extent(data, d => d.divorces) // [valeur_min,valeur_max]
// //   console.log("Empan",empan_divorces);
// // })

//  let canevas = d3.select("body").append("svg")
//    .attr("width", 960)
//    .attr("height", 30000)

// canevas.selectAll("rect")
//   .data("Divorces")
//   .enter()
//   .append("rect")
//     .attr("y", 50)
//     .attr("x", 50)
//     .attr("width", 20)
//     .attr("height", 60)
//     .style('fill','lightgreen')
//     .style('stroke','green');

// // ajouter l'axe des X
// canevas.append("g")
//   .attr("transform", 'translate(0,400)')
//   .call(d3.axisBottom("x"));
// // ajouter l'axe des Y
// canevas.append("g")
//   .attr("transform", 'translate(100,100)')
//   .call(d3.axisLeft("y").ticks(6));



// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("Divorces_totaux.csv", function(data) {
  var map =data.map(function(i) { return parseInt(i.divorces); })
  var histogram =d3.layout.histogram()
      .bin(5)
      (map)
      console.log(histogram);
      })
      

//   // X axis: scale and draw:
//   var x = d3.scaleLinear()
//       .domain([1880, 2019])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
//       .range([0, width]);
//   svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//   // Y axis: initialization
//   var y = d3.scaleLinear()
//       .range([height, 0]);
//   var yAxis = svg.append("g")

//   // A function that builds the graph for a specific value of bin
//   function update(nBin) {

//     // set the parameters for the histogram
//     var histogram = d3.histogram()
//         .value(function(d) { return d.divorces; })   // I need to give the vector of value
//         .domain(x.domain())  // then the domain of the graphic
//         .thresholds(x.ticks(nBin)); // then the numbers of bins

//     // And apply this function to data to get the bins
//     var bins = histogram(data);

//     // Y axis: update now that we know the domain
//     y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
//     yAxis
//         .transition()
//         .duration(2019)
//         .call(d3.axisLeft(y));

//     // Join the rect with the bins data
//     var u = svg.selectAll("rect")
//         .data(bins)

//     // Manage the existing bars and eventually the new ones:
//     u
//         .enter()
//         .append("rect") // Add a new rect for each new elements
//         .merge(u) // get the already existing elements as well
//         .transition() // and apply changes to all of them
//         .duration(2019)
//           .attr("x", 1)
//           .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
//           .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
//           .attr("height", function(d) { return height - y(d.length); })
//           .style("fill", "#69b3a2")


//     // If less bar in the new histogram, I delete the ones not in use anymore
//     u
//         .exit()
//         .remove()

//     }

//   // Initialize with 20 bins
//   update(20)

//   // Listen to the button -> update if user change it
//   d3.select("#nBin").on("input", function() {
//     update(+this.value);
//   });

// });
