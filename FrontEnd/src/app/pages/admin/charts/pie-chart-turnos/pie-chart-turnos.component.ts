import { Component, OnInit } from '@angular/core';
import { Pie } from '@antv/g2plot';

@Component({
  selector: 'app-pie-chart-turnos',
  templateUrl: './pie-chart-turnos.component.html',
  styleUrls: ['./pie-chart-turnos.component.scss']
})
export class PieChartTurnosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let data = [
      { type: 'Mañana', value: 35 },
      { type: "Tarde", value: 25 },
      { type: "Velada", value: 50 },
    ];
    const piePlot = new Pie("container", {
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
