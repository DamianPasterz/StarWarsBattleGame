import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { BattleStats } from '@state/people';
import * as d3 from 'd3';

@Component({
  selector: 'app-battle-stats-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battle-stats-chart.component.html',
  styleUrls: ['./battle-stats-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleStatsChartComponent implements AfterViewInit, OnInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;

  @Input() stats: BattleStats;
  public donutData: BattleStats;

  ngOnInit(): void {
    this.donutData = this.stats;
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  public createChart(): void {
    if (!this.donutData) {
      console.error('Data is not available for chart creation.');
      return;
    }
    const container = d3.select(this.chartContainer.nativeElement);
    const data = this.donutData;

    const totalWins = data.win;
    const totalLosses = data.loss;
    const totalTies = data.tie;
    const total = totalWins + totalLosses + totalTies;

    const chartData = [
      { label: 'Wins', value: totalWins, color: 'green' },
      { label: 'Losses', value: totalLosses, color: 'red' },
      { label: 'Ties', value: totalTies, color: 'yellow' },
    ];

    const dounatWidth = 178;
    const dounatHeight = 124;
    const values = chartData.map((d) => d.value);

    const dounatSvg = container.select('.dounat-chart__content__chart');
    const radius = dounatWidth / 2;

    dounatSvg.attr('width', dounatWidth);
    dounatSvg.attr('height', dounatHeight);

    const dounatG = dounatSvg.append('g').style('transform', 'translate(50%, 72%)');

    const pie = d3
      .pie()
      .sort(null)
      .startAngle((-108 * Math.PI) / 180)
      .endAngle((108 * Math.PI) / 180)
      .padAngle(0.03);

    const arc = d3
      .arc()
      .innerRadius(radius - 18)
      .outerRadius(radius)
      .cornerRadius(5);

    const arcShadow = d3
      .arc()
      .innerRadius(radius - 24)
      .outerRadius(radius)
      .cornerRadius(5);

    const arcsShadow = dounatG
      .selectAll('arc')
      .data(pie(values))
      .enter()
      .append('g')
      .attr('class', (_, index) => `arc-shadow arc-shadow--${index}`)
      .style('opacity', '0')
      .style('filter', 'blur(3px)');

    const arcs = dounatG.selectAll('arc').data(pie(values)).enter().append('g').attr('class', 'arc');

    const centerText = dounatG.append('text').attr('text-anchor', 'middle').attr('dy', '-0.3em');
    centerText.append('tspan').attr('x', 0).text('Hover to see').attr('fill', '#e5e8eb');
    centerText.append('tspan').attr('x', 0).attr('dy', '1.2em').text('the exact number').attr('fill', '#e5e8eb');
    centerText.classed('xs-regular', true);

    arcsShadow
      .append('path')
      .attr('fill', '#AAA')
      .attr('d', <any>arcShadow);

    arcs
      .append('path')
      .attr('fill', function (_, i) {
        return chartData[i].color;
      })
      .attr('d', <any>arc)
      .on('mouseover', this.handleMouseOver(centerText, chartData, dounatG))
      .on('mouseout', this.handleMouseOut(centerText, dounatG));
  }

  private handleMouseOver(centerText: d3.Selection<SVGTextElement, unknown, null, undefined>, data, dounat): any {
    return function (d, i) {
      dounat.selectChild(`.arc-shadow--${i.index}`).style('opacity', '0.4').style('color', 'white');
      centerText.text(data[i.index].value).classed('xs-regular', false).classed('h5-bold', true).attr('fill', 'white');
      centerText.append('tspan').attr('x', 0).attr('dy', '1.5em').text(data[i.index].label).classed('xs-regular', true);
    };
  }

  private handleMouseOut(centerText: d3.Selection<SVGTextElement, unknown, null, undefined>, dounat): any {
    return function () {
      dounat.selectAll('.arc-shadow').style('opacity', '0');
      centerText.classed('h5-bold', false).classed('xs-regular', false).classed('xs-regular', true);
      centerText.text('').attr('fill', 'white');
      centerText.selectAll('tspan').remove();
      centerText.append('tspan').attr('x', 0).text('Hover to see');
      centerText.append('tspan').attr('x', 0).attr('dy', '1.2em').text('the exact number');
    };
  }
}
