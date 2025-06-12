import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { useState } from 'react';
import API from '../api/axios';

interface Props { videoId: string; athleteId: string; onUpdated(): void }

const EditMetricsDialog = ({ videoId, athleteId, onUpdated }: Props) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ metric_name: '', value: '' });

  const handleSave = async () => {
    await API.post('/metrics/', {
      video_id: videoId,
      athlete_id: athleteId,
      metric_name: form.metric_name,
      value: parseFloat(form.value),
    });
    onUpdated(); setOpen(false);
  };

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>Add Metric</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add/Edit Metric</DialogTitle>
        <DialogContent>
          <TextField label="Metric Name" fullWidth margin="normal" value={form.metric_name} onChange={e => setForm({ ...form, metric_name: e.target.value })}/>
          <TextField label="Value" type="number" fullWidth margin="normal" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditMetricsDialog;