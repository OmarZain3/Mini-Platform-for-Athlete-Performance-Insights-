import { useEffect, useState } from 'react';
import { Box, Button, InputLabel, MenuItem, Select, FormControl, Typography } from '@mui/material';
import API from '../api/axios';

interface Athlete {
  id: string;
  name: string;
}

const UploadForm = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    API.get<Athlete[]>('/athletes/').then(res => setAthletes(res.data));
  }, []);

  const handleUpload = async () => {
    if (!file || selected.length === 0) return alert("Please select a file and athletes");

    const formData = new FormData();
    formData.append('file', file);
    selected.forEach(id => formData.append('athlete_ids', id));

    try {
      await API.post('/videos/', formData);
      alert('Upload successful');
    } catch {
      alert('Upload failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, m: 'auto', mt: 4 }}>
      <Typography variant="h6">Upload Video</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Athletes</InputLabel>
        <Select multiple value={selected} onChange={e => setSelected(e.target.value as string[])}>
          {athletes.map(a => (
            <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <input type="file" accept=".mp4,.mov" onChange={e => setFile(e.target.files?.[0] || null)} />
      <Button fullWidth variant="contained" onClick={handleUpload} sx={{ mt: 2 }}>Upload</Button>
    </Box>
  );
};

export default UploadForm;
