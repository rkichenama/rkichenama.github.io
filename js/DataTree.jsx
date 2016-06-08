const
  React = require('react')
;

const data = [ // the children
  {name: "Kichenama", children: [
    {name: "Jolien Kichenama", children: [
      {name: "Roger Kichenama" },
      {name: "Carmen Kichenama", children: [
        {name: "Richard Kichenama", children: [
          {name: "[human] Kichenama" },
        ] },
        {name: "Mary Kichenama" },
      ] },
      {name: "Serge Kichenama" },
    ] },
  ] },
  {name: "Ruffen-Blanchette", children: [
    {name: "Suzanne Ruffen-Blanchette" },
    {name: "Josianne Ruffen-Blanchette", children: [
      {name: "Michelle Ruffen-Blanchette", children: [
        {name: "Mikyal McDonald" },
        {name: "[girl] McDonald" },
      ] },
    ] },
  ] },
  {name: "Click", children: [
    {name: "Mary Click", children: [
      {name: "Donna Click", children: [
        {name: "Amanda Pitts" },
        {name: "Heather Pitts" },
      ] },
    ] },
  ] },
  {name: "Pitts", children: [
    {name: "Grand Pitts", children: [
      {name: "David Pitts", children: [
        {name: "Amanda Pitts", children: [
          {name: "[human] Kichenama" },
        ] },
        {name: "Heather Pitts" },
      ] },
    ] },
  ] },
];

module.exports = () => (
  <div style={{minWidth: '240px', height: '100%', backgroundColor: 'orange'}}>
  </div>
);
