function buildMetadata(sample) {
  
  // @TODO: Complete the following function that builds the metadata panel 

  // Use `d3.json` to fetch the metadata for a sample
  var MetaData = `/metadata/${sample}`;
  d3.json(MetaData).then(function(response){
    // Use d3 to select the panel with id of `#sample-metadata`
    var datos = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    datos.html("");
    
    // Use `Object.entries` to add each key and value pair to the panel
    var data = Object.entries(response);
    // console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      datos.append("div").text(`${data[i][0]}: ${data[i][1]}`);
      }
    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chartm
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var sample = `/samples/${sample}`;
  d3.json(sample).then(function(response){
    // var piechart = d3.select("#pie");
    var data=response;
    
    var labels1 = data.otu_ids;
    console.log(labels1)
    var hovertext1 = data.otu_labels;
    var values1 = data.sample_values;

    var labels=labels1.slice(0,10);
    var values=values1.slice(0,10);
    var hovertext=hovertext1.slice(0,10);
    
    var data2 = [{
      labels: labels,
      values: values,
      hovertext: hovertext,
      type: "pie"}]
    console.log(data);
    // @TODO: Build a Bubble Chart using the sample data
      var x1 = response.otu_ids;
      var y1 = response.sample_values;
      var text1 = response.otu_labels;

      var bblData = [{
        mode: 'markers',
        x: x1,
        y: y1,
        text: text1,
        marker: {color: x1, colorscale: 'Greens', size: y1}}];
      var layout2 = {
          showlegend: false,
          height: 600,
          width: 1600
          };
    Plotly.newPlot('bubble', bblData, layout2); 
    // @TODO: Build a Pie Chart
    var layout = {
      }
    Plotly.newPlot("pie", data2, layout);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
