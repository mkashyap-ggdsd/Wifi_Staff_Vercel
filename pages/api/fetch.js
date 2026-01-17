
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { roll, reg } = req.body;
  const results = [];
  const filePath = path.join(process.cwd(), 'data', 'students.csv');

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const student = results.find(s => s.roll === roll && s.reg === reg);
      if (!student) return res.status(404).json({ error: 'No record found' });
      res.json({ username: student.username, password: student.password });
    });
}
