import { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@mui/material';
import API from '../api/axios';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateAthleteDialog = ({ onSuccess }: Props) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', sport: '', age: '' });

  const handleSubmit = async () => {
    try {
      await API.post('/athletes/', {
        ...form,
        age: parseInt(form.age),
      });
      onSuccess();
      setOpen(false);
      setForm({ name: '', sport: '', age: '' });
    } catch {
      alert('Failed to create athlete');
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        + Create Athlete
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Athlete</DialogTitle>
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
            onChange={e => setForm({ ...form, age: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateAthleteDialog;
