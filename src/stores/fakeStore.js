// data model

const chartViews = [ {
  x: 'Time', y: 'MAP'
}]
const store = {
  tabs: [{ id: 1, charts: [1,2,3], chartViews: [{ x: 'Time', y: 'Map' }], selected: true }],
  owners: [{ id: 1, name: "Dennis" }],
  tuners: [{ id: 1, name: "Joe" }],
  vehicles: [
    {
      id: 1,
      year: 2011,
      make: "Nissan",
      model: "GTR",
      ownedBy: 1,
      note: "AMS Alpha 12x"
    }
  ],
  charts: [
    {
      id: 1,
      name: '',
      vehicleId: 1,
      data: '',
      date: "",
      filePath: "",
      notes: "",
      peakHp: "",
      peakTq: "",
    }
  ]
};
