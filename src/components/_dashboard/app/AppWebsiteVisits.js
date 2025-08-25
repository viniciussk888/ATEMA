import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

export default function AppWebsiteVisits({ topMunicipios }) {
  const totals = topMunicipios?.map((item) => item.total) || [];
  const labels = topMunicipios?.map((item) => item.municipio) || [];
  const CHART_DATA = [
    {
      name: 'Total',
      type: 'column',
      data: totals
    }
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '22%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: labels,
    xaxis: { type: 'label' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} Topônimos`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader
        title="Municípios X Registros"
        subheader="Municípios com maior número de novos toponímicos cadastrados"
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
