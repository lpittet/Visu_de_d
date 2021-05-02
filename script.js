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

let donnees = d3.csv('Divorces_totaux.csv',function(d){
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

let canevas = d3.select("body").append("svg")
  .attr("width", 960)
  .attr("height", 30000)

canevas.selectAll("rect")
  .data("Divorces")
  .enter()
  .append("rect")
    .attr("y", 50)
    .attr("x", 50)
    .attr("width", 20)
    .attr("height", 50)
    .style('fill','lightgreen')
    .style('stroke','green');

// ajouter l'axe des X
canevas.append("g")
  .attr("transform", 'translate(0,400)')
  .call(d3.axisBottom("x"));
// ajouter l'axe des Y
canevas.append("g")
  .attr("transform", 'translate(100,100)')
  .call(d3.axisLeft("y").ticks(6));