import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, ChartDataLabels);

interface PlotCohesionNDProps {
  correlation: string;
  userPl1?: number;
  userPl2?: number;
  userIC?: number;
}

export default function PlotCohesionND({ correlation, userPl1, userPl2, userIC }: PlotCohesionNDProps) {
  const dataPoints: { x: number; y: number }[] = [];
  let userPoint: { x: number; y: number } | null = null;
  let xLabel = '';
  let xMin = 0;
  let xMax = 0;
  let yMin = 0;
  let yMax = 0;

  userPl1 = Number(userPl1);
  userPl2 = Number(userPl2);

  if (correlation === 'Pl1') {
    xLabel = 'Pl (kPa)';
    xMin = 0;
    xMax = 2500;

    yMin = 0;
    yMax = 160;

    for (let pl = xMin; pl <= xMax; pl += 10) {
      let Cu = 0;
      if(pl <= 300){
        Cu = pl/5.5;       
      }
      else if(pl > 300 && pl <= 1000){
        Cu = pl/12 + 30;
      }
      else if(pl > 1000){
        Cu = pl/35 + 85;
      }
      if (Cu === -Infinity){
        Cu = -1000000;
      }
      dataPoints.push({ x: pl, y: Cu });
    }

    if (userPl1) {
      let Cu = 0;
      if(userPl1 <= 300){
        Cu = userPl1/5.5;       
      }
      else if(userPl1 > 300 && userPl1 <= 1000){
        Cu = userPl1/12 + 30;
      }
      else if(userPl1 > 1000){
        Cu = userPl1/35 + 85;
      }
      userPoint = { x: userPl1, y: Cu };

    }
  }

  if (correlation === 'Pl2') {
    xLabel = 'Pl (kPa)';
    xMin = 0;
    xMax = 2500;

    yMin = 0;
    yMax = 400;

    for (let pl = xMin; pl <= xMax; pl++) {
      const Cu = 0.21*(pl/1000)**(0.75)*1000;
      dataPoints.push({ x: pl, y: Cu });
    }

    if (userPl2) {
      const Cu = 0.21*(userPl2/1000)**(0.75)*1000;
      userPoint = { x: userPl2, y: Cu };

    }
  }

  if (correlation === 'IC') {
    xLabel = 'IC (%)';
    xMin = 0;
    xMax = 100;

    yMin = 0;
    yMax = 200;

    for (let ic = xMin; ic <= xMax; ic++) {
      const Cu = 200*(ic/100)**(2);
      dataPoints.push({ x: ic, y: Cu });
    }

    if (userIC) {
      const Cu = 200*(userIC/100)**(2);
      userPoint = { x: userIC, y: Cu };

    }
  }

  const chartData: ChartData<'line'> = {
    datasets: [
      {
        label: 'Valeurs de Cu',
        data: dataPoints,
        borderColor: '#155DFC',
        backgroundColor: '#155DFC',
        fill: false,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 0,
        order: 2,
      },
      ...(userPoint
        ? [
            {
              label: 'Valeur utilisateur',
              data: [userPoint],
              backgroundColor: 'red',
              pointRadius: 6,
              pointHoverRadius: 6,
              order: 1,
              showLine: false,
            },
          ]
        : []),
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: (context) => context.dataset.label === 'Valeur utilisateur',
        color: 'red',
        font: {
          weight: 'bold',
          size: 12,
        },
        align: 'bottom',
        anchor: 'start',
        formatter: () => 'Point de calcul',
      },
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            weight: 'normal',
          }
        },
      },
      tooltip: {
        enabled: false,
        callbacks: {
          label: (context) => {
            const x = context.parsed.x;
            const y = context.parsed.y;
            return `${xLabel.split(' ')[0]}: ${x.toFixed(2)}, φ: ${y.toFixed(2)}°`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: { 
          display: true, 
          text: xLabel 
        },
        min: xMin,
        max: xMax,
        
      },
      y: {
        title: { 
          display: true, 
          text: 'Cu (kPa)' 
        },
        min: yMin,
        max: yMax,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={options}/>
    </div>
  );
}