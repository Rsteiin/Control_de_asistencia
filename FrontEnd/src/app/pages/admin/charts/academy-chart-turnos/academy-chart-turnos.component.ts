import { Component,Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-academy-chart-turnos',
  templateUrl: './academy-chart-turnos.component.html',
  styleUrls: ['./academy-chart-turnos.component.scss']
})
export class AcademyChartTurnosComponent {
  
  multi =  [
    {
        "name": "Enero",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Febrero",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Marzo",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Abril",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Mayo",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Junio",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Julio",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Agosto",
        "series": [
            {
                "name": "MAÑANA",
                "value": 1
            },
            {
                "name": "TARDE",
                "value": 1
            },
            {
                "name": "VELADA",
                "value": 1
            }
        ]
    },
    {
        "name": "Septiembre",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 1
            },
            {
                "name": "VELADA",
                "value": 41
            }
        ]
    },
    {
        "name": "Octubre",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Noviembre",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    },
    {
        "name": "Diciembre",
        "series": [
            {
                "name": "MAÑANA",
                "value": 0
            },
            {
                "name": "TARDE",
                "value": 0
            },
            {
                "name": "VELADA",
                "value": 0
            }
        ]
    }
]

  view;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showGridLines:boolean = false;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Inasistencias';
  legendTitle: string = 'Turnos';
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  }

  legendPosition:LegendPosition = LegendPosition.Below 
  

  constructor() {
    Object.assign(this.multi)
  }

 onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
