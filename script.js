var svg = d3.select('svg');

var width = +svg.attr('width');
var height = +svg.attr('height');

function renderTotal(data) {
  document.getElementsByTagName('svg')[0].innerHTML = ""
  const margin = {top: 50, right: 50, bottom: 20, left: 50};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.annee))
    .range([0, innerWidth])
    .padding(0.1); 
  
  const yScale = d3.scaleLinear()
    .domain([d3.max(data, d => d.mariages), 0])
    .range([0, innerHeight]);
  
  svg.append("text")
    .attr("x", width / 2)          
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")  
    .style("font-size", "20px") 
    .style("font-weight", "bold") 
    .style("text-decoration", "underline")  
    .text("Visualisation globale");

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  g.append('g').call(d3.axisLeft(yScale));
  g.append('g').call(d3.axisBottom(xScale))
    .attr('transform', `translate(0,${innerHeight})`);  
  
  g.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('y', d => yScale(d.mariages))
    .attr('x', d => xScale(d.annee))
    .attr('height', d => innerHeight-yScale(d.mariages))
    .attr('width', xScale.bandwidth())
    .style('fill','lightgreen')
    .style('opacity',.5);
  
  g.selectAll("circle").data(data)
    .enter().append("circle")
    .attr("cy", d => yScale(d.divorces))
    .attr("cx", d => xScale(d.annee)+19)
    .attr("r", 5)
    .style('fill','orange')
    .style('opacity',.6);
};

function renderYear(yearData) {
  const graphData = [
    {
      title: "Mariages",
      value: +yearData.mariages
    },
    {
      title: "Divorces",
      value: +yearData.divorces
    }
  ]
  
  document.getElementsByTagName('svg')[0].innerHTML = ""
  const margin = {top: 50, right: 50, bottom: 20, left: 50};
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xScale = d3.scaleBand()
    .domain(graphData.map(x => x.title))
    .range([0, innerWidth])
    .padding(0.1); 
  
  const yScale = d3.scaleLinear()
    .domain([Math.max.apply(Math, graphData.map(x => x.value)), 0])
    .range([0, innerHeight]);
  
  svg.append("text")
    .attr("x", width / 2)             
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")  
    .style("font-size", "20px") 
    .style("font-weight", "bold") 
    .style("text-decoration", "underline")  
    .text("Mariages vs. Divorces en " + yearData.annee);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  g.append('g').call(d3.axisLeft(yScale));
  g.append('g').call(d3.axisBottom(xScale))
    .attr('transform', `translate(0,${innerHeight})`);  
  
  g.selectAll('rect').data(graphData)
    .enter().append('rect')
    .attr('y', d => yScale(d.value))
    .attr('x', d => xScale(d.title))
    .attr('height', d => innerHeight-yScale(d.value))
    .attr('width', xScale.bandwidth())
    .style('fill', d => d.title == "Mariages" ? 'lightgreen' : 'orange')
    .style('opacity',.5);

  if (yearData.divorces == 0){
  g.selectAll('text').data(data)
    .enter().append('text')
    .attr('x', width / 1.5)
    .attr('y', height / 2.3)
    .attr("text-anchor", "middle")  
    .style("font-size", "18px") 
    .style('fill', 'orange')
    .style('opacity',.5)
    .text("Données non disponibles pour les divorces")
  };
}

async function loadData() {
  let data = await d3.csv('Mariages_Divorces.csv', function(d) {
    return {
      annee : d.annee, 
      mariages : +d.mariages,
      divorces : +d.divorces,
    }
  })
  return data;
}

function addSelectValues(data) {
  var select = document.getElementById('year-select');
  let selector = data.map(x => x.annee);
  for (let i = 0; i < selector.length; i++) {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(selector[i]) );
    opt.value = selector[i];
    if (i == 0) {
      opt.selected = true;
    }
    select.append(opt);
  }
}

function reloadGraph() {
  const select = document.getElementById('year-select');
  const value = select.value;
  const d = data.filter(x => x.annee == value)[0];
  renderYear(d);
}

function showTotalGraph() {
  renderTotal(data);
}

let data = [];
loadData().then(
  d => { 
    data = d.slice();
    addSelectValues(d);
    reloadGraph();
  })