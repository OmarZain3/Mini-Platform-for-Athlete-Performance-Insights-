import { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import API from '../api/axios';

interface Athlete {
  id: string;
  name: string;
  sport: string;
  age: number;
}

const EditAthleteDialog = ({ athlete, onUpdated }: { athlete: Athlete; onUpdated: () => void }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...athlete });

  const handleUpdate = async () => {
    try {
      await API.put(`/athletes/${athlete.id}`, {
        name: form.name,
        sport: form.sport,
        age: form.age,
      });
      onUpdated();
      setOpen(false);
    } catch {
      alert('Failed to update athlete');
    }
  };

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>Edit</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Athlete</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <TextField label="Sport" fullWidth margin="normal"
            value={form.sport}
            onChange={e => setForm({ ...form, sport: e.target.value })}
          />
          <TextField label="Age" fullWidth margin="normal" type="number"
            value={form.age}
            onChange={e => setForm({ ...form, age: Number(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditAthleteDialog;
