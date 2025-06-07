import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Typography, Card, CardContent } from '@mui/material';
import { Grid } from '@mui/material';

interface Metric {
  metric_name: string;
  value: number;
  timestamp: string;
}

interface Video {
  id: string;
  file_path: string;
  status: string;
  duration: number;
  upload_date: string;
}

interface Athlete {
  id: string;
  name: string;
  sport: string;
  age: number;
  created_at: string;
  metrics: Metric[];
  videos: Video[];
}

const Dashboard = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    API.get<Athlete[]>('/dashboard/')
      .then(res => setAthletes(res.data))
      .catch(() => alert('Failed to load dashboard'));
  }, []);

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {athletes.map(a => (
        <Grid key={a.id} sx={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">{a.name}</Typography>
              <Typography variant="body2">Sport: {a.sport}</Typography>
              <Typography variant="body2">Age: {a.age}</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1 }}>Recent Metrics:</Typography>
              {a.metrics.slice(0, 3).map(m => (
                <Typography key={m.timestamp}>{m.metric_name}: {m.value}</Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
