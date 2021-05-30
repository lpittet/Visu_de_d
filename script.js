// d3.csv('Divorces_totaux.csv')
// .then(data => {
//     data.forEach(d=> {
//         d.Divorces = +d.Divorces;
//         d["annees"] = +d["annee"];
//     });
//     return data
    
// })
  let data = d3.csv('Mariages_Divorces.csv',function(d){
    return {
      annee : d.annee, 
      mariages : +d.mariages,
      divorces : +d.divorces,
    }
  }) 
  .then(data => {
    console.log("Mariages_Divorces",data);

    let empan_divorces = d3.extent(data, d => d.divorces) // [valeur_min,valeur_max]
    console.log("Empan_d",empan_divorces);

    let empan_mariages = d3.extent(data, d => d.mariages) // [valeur_min,valeur_max]
    console.log("Empan_m",empan_mariages);    

  })

  // ICICICICICICICICI
  // var svg = d3.select("svg"),
  //     margin = 200,
  //     width = svg.attr("width") - margin,
  //     height = svg.attr("height") - margin;
  
  // var xScale = d3.scaleBand().range([0,width]).padding(0.4),
  //     yScale = d3.scaleLinear().range([height,0]);
  
  // var g = svg.append("g")
  //             .attr("transform","translate("+100 +"," + 100 +")");
  // d3.csv("Divorces_totaux.csv",function(error,data){
  //   if (error) {
  //     throw error;
  //   }  
    
  //   xScale.domain(data.map(function(d){return d.annees;}));
  //   yScale.domain([0,d3.max(data,function(d){return d.divorces;})]);

  //   g.append("g")
  //     .attr("transform","translate(0,"+ height + ")")
  //     .call(d3.axisBottom(xScale));
  //   g.append("g")
  //     .call(d3.axisLeft(yScale).tickFormat(function(d){
  //       return "$" + d;
  //     }),ticks(10))
  //     .append("text")
  //     .attr("y",6)
  //     .attr("dy","0.71em")
  //     .attr("text-anchor","end")
  //     .text("value");
  //   });
  // ICICICICICICIICICIC
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

var svg = d3.select('svg');

var width = +svg.attr('width');
var height = +svg.attr('height');

const render = data => {

    const margin = {top: 20, right: 50, bottom: 20, left: 50};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([-d3.max(data, d => d.divorces), d3.max(data, d => d.mariages)])
      .range([0, innerWidth]);

    //const yAxis = d3.
      
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.annees))
      .range([0, innerHeight])
      .padding(0.1); 

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
      .attr('transform', `translate(0,${innerHeight})`);  
    
    g.selectAll('rect').data(data)
      .enter().append('rect')
        .attr('x', d => xScale(0))
        .attr('y', d => yScale(d.annee))
        .attr('width', d => xScale(d.mariages)-xScale(1000))
        .attr('height', yScale.bandwidth())
        .style('fill','lightgreen')
        .style('opacity',.5);

    g.selectAll("circle").data(data)
      .enter().append("circle")
        .attr("cy", d => yScale(d.annees)+11.5)
        .attr("cx", d => xScale(-d.divorces))
        .attr("r", yScale.bandwidth()/6)
        .style('opacity',.3);

    /*
    svg.selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .text((d) => d))
    .on("click", (e) => {
      let annee_choisie = e.target.innerText;
      // ceci vaut ma sélection de ligne
      // à mélanger avec https://codepen.io/isaacpante/pen/ZEeyeLo?editors=0010
      // regénérer ce qui change
    });
    
    */
};

d3.csv('Mariages_Divorces.csv').then(data => {
  data.forEach(d => {
    d.annees = +d.annee;
    d.mariages = +d.mariages;
    d.divorces = +d.divorces;
  })
  render(data);
});
