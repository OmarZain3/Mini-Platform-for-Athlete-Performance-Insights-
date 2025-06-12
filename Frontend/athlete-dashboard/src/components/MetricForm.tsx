import { useEffect, useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import API from '../api/axios';

interface Athlete { id: string; name: string; }
interface Video { id: string; file_path: string; }

const MetricForm = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [form, setForm] = useState({ athlete_id: '', video_id: '', metric_name: '', value: '' });

  useEffect(() => {
    API.get<Athlete[]>('/athletes/').then(res => setAthletes(res.data));
    API.get<Video[]>('/videos/').then(res => setVideos(res.data));
  }, []);

  const handleSubmit = async () => {
    await API.post('/metrics/', {
      ...form,
      value: parseFloat(form.value)
    });
    alert('Metric added!');
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6">Add Performance Metric</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Athlete</InputLabel>
        <Select value={form.athlete_id} onChange={e => setForm({ ...form, athlete_id: e.target.value })}>
          {athletes.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Video</InputLabel>
        <Select value={form.video_id} onChange={e => setForm({ ...form, video_id: e.target.value })}>
          {videos.map(v => <MenuItem key={v.id} value={v.id}>{v.file_path}</MenuItem>)}
        </Select>
      </FormControl>

      <TextField label="Metric Name" fullWidth margin="normal" value={form.metric_name}
        onChange={e => setForm({ ...form, metric_name: e.target.value })} />

      <TextField label="Value" type="number" fullWidth margin="normal" value={form.value}
        onChange={e => setForm({ ...form, value: e.target.value })} />

      <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default MetricForm;



// import { useEffect, useState } from 'react';
// import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
// import API from '../api/axios';

// interface Athlete { id: string; name: string; }
// interface Video { id: string; file_path: string; }

// const MetricForm = () => {
//   const [athletes, setAthletes] = useState<Athlete[]>([]);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [form, setForm] = useState({
//     athlete_id: '',
//     video_id: '',
//     metric_name: '',
//     value: ''
//   });

//   useEffect(() => {
//     API.get<Athlete[]>('/athletes/').then(res => setAthletes(res.data));
//     API.get<Video[]>('/videos/').then(res => setVideos(res.data));
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       await API.post('/metrics/', {
//         ...form,
//         value: parseFloat(form.value)
//       });
//       alert('Metric added');
//     } catch {
//       alert('Failed to add metric');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, m: 'auto', mt: 4 }}>
//       <Typography variant="h6">Add Performance Metric</Typography>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Athlete</InputLabel>
//         <Select value={form.athlete_id} onChange={e => setForm({ ...form, athlete_id: e.target.value })}>
//           {athletes.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
//         </Select>
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Video</InputLabel>
//         <Select value={form.video_id} onChange={e => setForm({ ...form, video_id: e.target.value })}>
//           {videos.map(v => <MenuItem key={v.id} value={v.id}>{v.file_path}</MenuItem>)}
//         </Select>
//       </FormControl>
//       <TextField label="Metric Name" fullWidth margin="normal"
//         value={form.metric_name}
//         onChange={e => setForm({ ...form, metric_name: e.target.value })}
//       />
//       <TextField label="Value" type="number" fullWidth margin="normal"
//         value={form.value}
//         onChange={e => setForm({ ...form, value: e.target.value })}
//       />
//       <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
//     </Box>
//   );
// };

// export default MetricForm;
