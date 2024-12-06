import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DepsereviceService } from 'src/app/depserevice.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { patient } from 'src/app/hospital';

Chart.register(...registerables);

@Component({
  selector: 'app-dash-activity',
  templateUrl: './dash-activity.component.html',
  styleUrls: ['./dash-activity.component.css']
})



export class DashActivityComponent {
  
  
  

  constructor(private serv:DepsereviceService,private datePipe: DatePipe){
    const today = new Date();

  }
  today:any;
  startOfWeek: any;
  endOfWeek: any;
  orderData:any[]=[];
  liveNums:any;
  deps:any[]=[];
  labels:any[]=[];
  patients:any[]=[];
  nurses:any[]=[];
  

ngOnInit(){


  this.serv.gethistable().subscribe(
    (res:any)=>{
      this.ELEMENT_DATA=res.data;
      this.orderData=this.sortByHistory(this.ELEMENT_DATA);
      this.filtered=this.orderData;
    }
  );

  this.serv.getchartdata().subscribe(
    (res:any)=>{
      this.liveNums=res.liveNums;
      this.deps=res.deps;
      console.log(this.deps);
      for (let element of this.deps) {
        this.labels.push(element.depName);
        this.patients.push(element.patients);
        this.nurses.push(element.nurses);
      }
      
      this.renderChart();
      this.renderflowChart();
      this.rendernurseChart();
      
    }
  ) 

}

filtered:any[]=[];
ELEMENT_DATA: any[] = [];
displayedColumns: string[] = ['Date','Time', 'Action', 'CIN', 'State'];
dataSource = this.orderData;

sortByHistory(array: any[]): any[] {
  return array.sort((a, b) => {
    const dateA = new Date(a.historyp);
    const dateB = new Date(b.historyp);
    return dateB.getTime() - dateA.getTime();
  });
}

isInThisDay(date: any): boolean {
  const parsedDate = new Date(date);
  const today = new Date();
  return (
    parsedDate.getFullYear() === today.getFullYear() &&
    parsedDate.getMonth() === today.getMonth() &&
    parsedDate.getDate() === today.getDate()
  );
}

isInThisWeek(date: any): boolean {
  const parsedDate = new Date(date);
  const todayMinusSevenDays = new Date();
  todayMinusSevenDays.setDate(todayMinusSevenDays.getDate() - 7);
  return parsedDate >= todayMinusSevenDays;
}

isInThisMonth(date: any): boolean {
  const parsedDate = new Date(date);
  const todayMinusThirtyDays = new Date();
  todayMinusThirtyDays.setDate(todayMinusThirtyDays.getDate() - 30);
  return parsedDate >= todayMinusThirtyDays;
}


trimTableData(option: any) {
  this.filtered = [];
  if (option.value == 'week') {
    for (let elt of this.orderData) {
      if (this.isInThisWeek(elt.historyp)) {
        this.filtered.push(elt);
      }
    }
  } else if (option.value == 'month') {
    for (let elt of this.orderData) {
      if (this.isInThisMonth(elt.historyp)) {
        this.filtered.push(elt);
      }
    }
  }
  else if(option.value =='day'){
    for (let elt of this.orderData) {
      if (this.isInThisDay(elt.historyp)) {
        this.filtered.push(elt);
      }
    }
  }
  else {
    this.filtered = this.orderData;
  }
  console.log(this.filtered);
}


renderChart() {
  const myChart = new Chart('barchart', {
    type: 'bar',
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Number of patients',
        data: this.patients,
        backgroundColor:  ['#1565C0', '#1E88E5', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD', '#009688', '#26A69A', '#4DB6AC'],
        barThickness:35,
        borderRadius:5
      }]
    },
    options: {

      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            color: '#707070',
          },
          grid: {
            display: false,
          },
          title: {
            display: false,
            text: 'Specialty',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        y: {

          ticks: {
            color: '#707070',
      
          },
          grid: {
            display: true,
            color: '#e0e0e0'
          },
          title: {
            display: false,
            text: 'Number of Patients',
            font: {
              weight: 'bold'
            }
          }
        },
      },
      plugins: {
        legend: {
          display: false // hide legend
        }
      }
    }
  });
}


renderflowChart() {
  const myChart = new Chart('flowchart', {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
      datasets: [{
        label: 'Number of Patients',
        data: [12, 10, 8, 20, 17, 15,9],
        backgroundColor: ['#1A237E'],
        borderColor: '#5C6BC0',
        borderWidth:4,
        pointRadius:5,
        pointBorderWidth:0
      }]
    },
    options: {

      responsive: true,
      maintainAspectRatio: false,
      scales: {

        x: {
          ticks: {
            color: '#707070',

          },
          grid: {
            display: false,
          },
          title: {
            display: false,
            text: 'Specialty',
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        y: {

          beginAtZero: true,

          ticks: {
            color: '#707070',
            
          },
          grid: {
            display: true,
            color: '#e0e0e0'
          },
          title: {
            display: false,
            text: 'Number of Patients',
            font: {
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false // hide legend
        }
      }
    }
  });
}

legendLabels=this.labels;
legendColors=['#1565C0', '#1E88E5', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD', '#009688', '#26A69A', '#4DB6AC'];

rendernurseChart(){
  const myChart = new Chart('nurseChart', {
    type: 'doughnut',
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Nurse Count',
        data: this.nurses,
        backgroundColor: this.legendColors,
        hoverOffset: 10,
        borderRadius:2
      }]
    },

  options:{
   
    responsive: true,
    
    plugins:{
      legend:{
        display:false,
      }
    } 
  }
})
}}
