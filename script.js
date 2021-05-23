// d3.csv('Divorces_totaux.csv')
// .then(data => {
//     data.forEach(d=> {
//         d.Divorces = +d.Divorces;
//         d["annees"] = +d["annee"];
//     });
//     return data
    
// })
  let data = d3.csv('Divorces_totaux.csv',function(d){
    return {
      annees : d.annees, 
      divorces : +d.divorces,
    }
  }) 
  .then(data => {
    console.log("Divorces",data);

    let empan_divorces = d3.extent(data, d => d.divorces) // [valeur_min,valeur_max]
    console.log("Empan",empan_divorces);
  })

  var svg = d3.select("svg"),
      margin = 200,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;
  
  var xScale = d3.scaleBand().range([0,width]).padding(0.4),
      yScale = d3.scaleLinear().range([height,0]);
  
  var g = svg.append("g")
              .attr("transform","translate("+100 +"," + 100 +")");
  d3.csv("Divorces_totaux.csv",function(error,data){
    if (error) {
      throw error;
    }  
    
    xScale.domain(data.map(function(d){return d.annees;}));
    yScale.domain([0,d3.max(data,function(d){return d.divorces;})]);

    g.append("g")
      .attr("transform","translate(0,"+ height + ")")
      .call(d3.axisBottom(xScale));
    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(function(d){
        return "$" + d;
      }),ticks(10))
      .append("text")
      .attr("y",6)
      .attr("dy","0.71em")
      .attr("text-anchor","end")
      .text("value");
    });
  
//   let canevas = d3.select("body").append("svg")
//     .attr("width", 9600)
//     .attr("height", 30000)

//  canevas.selectAll("rect")
//    .data("Divorces")
//    .enter()
//    .append("rect")
//      .attr("y", 50)
//      .attr("x", 50)
//      .attr("width", 20)
//      .attr("height", 60)
//      .style('fill','lightgreen')
//      .style('stroke','green');
  