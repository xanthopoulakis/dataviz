function digits(num, den, count) {
 let arr = [];
 let a = num, i = 0;
 while(i < count) {
   arr.push(Math.floor(a / den)); 
   a  = (a % den) * 10;
   if (a < 1) break;
   i += 1;
 }
 return arr;
}

let width = 600,height = width, step = width/10;

let svg = d3.select('#plot').append('svg').attr('width',width).attr('height', height).style('border', '1px solid gray').style('background', 'black');

let g = svg.append('g').attr('transform','translate(5,5)');

d3.select('#viz').on('click', () => {
  let value = d3.select('#input').node().value;
  render(value);
});

function render(num) { 
  let digs = digits(1,num,5000);
  
  d3.select('#result').html('0.' + digs.slice(1,50).join(''));
  
  let data = digs.map((d,i) => {
    return {id: i, digit: d, fill: d3.schemeCategory10[d], cx: 10*(i % step), cy: 10*(Math.floor(i / step))}});
  
  let circles = g.selectAll('circle').data(data, (d,i) => d.id);

  circles
    .enter()
    .append('circle')
    .attr('cx', (d,i) => d.cx)
    .attr('cy', (d,i) => d.cy)
    .transition()
    .delay((d,i) => 5 * (i + 1))
    .attr('r', (d,i) => 4)
    .style('fill', (d,i) => d.fill);

  circles
    .transition()
    .delay((d,i) => 5 * (i + 1))
    .attr('cx', (d,i) => d.cx)
    .attr('cy', (d,i) => d.cy)
    .attr('r', (d,i) => 4)
    .style('fill', (d,i) => d.fill);

  circles
    .exit()
    .transition()
    .delay((d,i) => 5 * (i + 1))
    .attr('r', (d,i) => 0)
    .remove();
}