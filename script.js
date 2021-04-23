d3.csv('Divorces_totaux.csv')
.then(data => {
    data.forEach(d=> {
        d.Divorces = +d.Divorces;
        d["annees"] = +d["annee"];
    });
    return data
    
})
   
//d3
  //.csv("https://cdn.rawgit.com/vlandham/js_data/master/data/cities.csv")
  //.then(data => {
    //data.forEach(d => {
      //d.population = +d.population;
      //d["land area"] = +d["land area"];
    //});
    //return data;
  //})