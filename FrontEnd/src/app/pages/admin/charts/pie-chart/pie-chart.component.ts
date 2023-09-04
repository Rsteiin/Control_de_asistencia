import { Component,Input, OnInit } from '@angular/core';
import { Pie } from '@antv/g2plot';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() id: string;

  constructor() { }

  ngOnInit(): void {
    let data = [
      { type: 'Consola 1', value: 27 },
      { type: "Consola2", value: 25 },
      { type: "Consola3", value: 18 },
      { type: "Consola4", value: 15 },
      { type: "Consola5", value: 10 },
      { type: "Consola6", value: 5 },
    ];
    const piePlot = new Pie(this.id, {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [{ type: 'element-active' }],
    });
    
    piePlot.render();
  
  }

}
