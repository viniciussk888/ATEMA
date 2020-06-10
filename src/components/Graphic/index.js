import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';

export default function Graphic(dados) {

  const [inf, setInf] = useState([])
  const [names, setNames] = useState([])
  const [totals, setTotals] = useState([])



  const data = {
    datasets: [{
      data: [10, 20, 30, 40, 50, 60, 70, 80],
      backgroundColor: [
        '#6A5ACD',
        '#2F4F4F',
        '#00FF00',
        '#A0522D',
        '#4B0082',
        '#FF0000',
        '#FF4500',
        '#FFFF00',
        '#D8BFD8',
        '#F0F8FF',
        '#F0E68C',
        '#800000'
      ],
    }],
    labels: [
      'Red',
      'Yellow',
      'Blue',
      'Red',
      'Yellow',
      'Blue',
      'Red',
      'Yellow',
      'Blue',
      'Red',
      'Yellow',
      'Blue'
    ],
  };
  return (
    <>
      <Doughnut data={data} />
    </>
  )
}