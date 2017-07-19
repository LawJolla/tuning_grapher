// data model

const store = {
  owners: [
    { id: 1, name: 'Dennis' }
  ],
  tuners: [
    { id: 1, name: 'Joe' }
  ],
  vehicles: [
    {id: 1, year: 2011, make: 'Nissan', model: 'GTR', ownedBy: 1, note: 'AMS Alpha 12x'}
  ],
  charts: [
    { id: 1, date: '', filePath: '', map: '', notes: '', peakHp: '', peakTq: '',
      render: [
        {x: 'Time', y: 'Boost', plot: 'XY'},
        {x: 'Time', y: 'Knock', plot: 'XY'}
      ]
    }
  ]
};