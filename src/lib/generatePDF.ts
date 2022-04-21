import JsPDF from 'jspdf';

const generatePDF = (source: string, dest: string, distance: number, cost: number, pricePerDay: number, sumDays: number) => {
  const doc = new JsPDF('portrait', 'pt', 'a4');

  doc.text(`From ${source}`, 10, 30);
  doc.text(`To ${dest}`, 10, 60);
  doc.text(`Distance: ${distance} km`, 10, 90);
  doc.text(`Total cost: ${cost}`, 10, 120);
  doc.text(`Price per day: ${pricePerDay}`, 10, 150);
  doc.text(`Total days: ${sumDays}`, 10, 180);
  doc.save('track.pdf');
};

export default generatePDF;
