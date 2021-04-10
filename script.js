document.write(d3.version);

let donnees = [30,60,120,340];

let corps = d3.select('body');

// ajouter un canevas à la page
let canevas = corps.append('svg')
    .attr('width',600)
    .attr('height',600);

// ajout d'un cercle
// let mon_cercle = canevas.append('circle')
//    .attr('cx',60)
//    .attr('cy',60)
//    .attr('r',40)

// ajout d'autant de cercles qu'il y a de données

canevas.selectAll('circle')
    .data(donnees)
    .enter()
    .append('circle')
        .attr('cx',d => d)
        .attr('cy',300)
        .attr('r',(d,i) => 5+(i*20))
        .style('opacity',0.5);
