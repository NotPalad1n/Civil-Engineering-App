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

interface PlotAngleFrottementProps {
  correlation: string;
  userPl?: number;
  userIp?: number;
}

export default function PlotAngleFrottement({ correlation, userPl, userIp }: PlotAngleFrottementProps) {
  const dataPoints: { x: number; y: number }[] = [];
  let userPoint: { x: number; y: number } | null = null;
  let xLabel = '';
  let xMin = 0;
  let xMax = 0;
  let yMin = 0;
  let yMax = 0;

  userIp = Number(userIp);
  userPl = Number(userPl);

  if (correlation === 'Pl') {
    xLabel = 'Pl (kPa)';
    xMin = 0;
    xMax = 2500;

    yMin = -50;
    yMax = 50;

    for (let pl = xMin; pl <= xMax; pl += 10) {
      let phi = 24 + 4 * (Math.log10((10 * (pl / 1000)) / 2.5) / Math.log10(2));
      if (phi === -Infinity){
        phi = -1000000;
      }
      dataPoints.push({ x: pl, y: phi });
    }

    if (userPl) {
      const phi = 24 + 4 * (Math.log10((10 * (userPl / 1000)) / 2.5) / Math.log10(2));
      userPoint = { x: userPl, y: phi };

    }
  }

  if (correlation === 'Ip') {
    xLabel = 'Ip (%)';
    xMin = 0;
    xMax = 50;

    yMin = 15;
    yMax = 55;

    for (let ip = xMin; ip <= xMax; ip++) {
      const phi = Math.atan(0.21 + 8 / (ip + 6)) * (180 / Math.PI);
      dataPoints.push({ x: ip, y: phi });
    }

    if (userIp) {
      const phi = Math.atan(0.21 + 8 / (userIp + 6)) * (180 / Math.PI);
      userPoint = { x: userIp, y: phi };

    }
  }

  const chartData: ChartData<'line'> = {
    datasets: [
      {
        label: 'Valeurs de φ',
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
          text: 'φ (°)' 
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