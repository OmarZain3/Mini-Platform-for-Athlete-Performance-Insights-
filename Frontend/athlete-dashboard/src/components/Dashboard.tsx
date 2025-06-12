import { useEffect, useState } from 'react';
import API from '../api/axios';
import { Typography, Card, CardContent, Button, Box, TextField, Stack } from '@mui/material';
import CreateAthleteDialog from './CreateAthleteDialog';
import EditAthleteDialog from './EditAthleteDialog';
import EditMetricsDialog from './EditMetricsDialog';
import { useNavigate } from 'react-router-dom';

interface Metric {
  metric_name: string;
  value: number;
  timestamp: string;
  video_id: string;
}

interface Video {
  id: string;
  file_path: string;
  status: string;
  duration: number;
  upload_date: string;
  metrics: Metric[];
}

interface Athlete {
  id: string;
  name: string;
  sport: string;
  age: number;
  created_at: string;
  videos: Video[];
  metrics: Metric[];
}

const Dashboard = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    sport: '',
    from_date: '',
    to_date: ''
  });

  const loadAthletes = () => {
    const params: any = {};
    if (filters.sport) params.sport = filters.sport;
    if (filters.from_date) params.from_date = filters.from_date;
    if (filters.to_date) params.to_date = filters.to_date;

    API.get<Athlete[]>('/dashboard/', { params })
      .then(res => setAthletes(res.data))
      .catch(() => alert('Failed to load dashboard'));
  };

  useEffect(() => {
    loadAthletes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this athlete?')) return;
    try {
      await API.delete(`/athletes/${id}`);
      loadAthletes();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Athletes Dashboard
      </Typography>
      <Box sx={{ p: 3, justifyContent: 'center' }}>
       <Box sx={{ display: 'flex', gap: 2, mb: 2 , justifyContent: 'center'}}>
       <label style={{ fontSize: '2em', justifyContent: 'center' }}>Filter by:</label>      
         {['Sport', 'From Date', 'To Date'].map((label, idx) => (
          <TextField
            key={label}
            label={label}
            type={idx > 0 ? 'date' : 'text'}
            value={(idx === 0 ? filters.sport : idx === 1 ? filters.from_date : filters.to_date)}
            onChange={e => {
              const key = idx === 0 ? 'sport' : idx === 1 ? 'from_date' : 'to_date';
              setFilters({ ...filters, [key]: e.target.value });
            }}
            InputLabelProps={idx > 0 ? { shrink: true } : undefined}
          />
        ))}
        <Button variant="outlined" onClick={loadAthletes}>Apply Filters</Button>
      </Box>
      </Box>

     

      <Stack spacing={3}>
        {athletes.map(a => (
          <Card key={a.id}>
            <CardContent>
              <Typography variant="h5">{a.name}</Typography>
              <Typography>Sport: {a.sport} — Age: {a.age}</Typography>
              <Box sx={{ mt: 1 }}>
                <EditAthleteDialog athlete={a} onUpdated={loadAthletes} />
                <Button color="error" onClick={() => handleDelete(a.id)} sx={{ ml: 1 }}>Delete</Button>
                <Button onClick={() => navigate(`/upload?athleteId=${a.id}`)} sx={{ ml: 1 }}>
                  Upload Video
                </Button>
              </Box>
              {a.metrics.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Athlete Metrics:</Typography>
                  {a.metrics.map(m => (
                    <Typography key={m.timestamp}>
                      {m.metric_name}: {m.value} ({new Date(m.timestamp).toLocaleDateString()})
                    </Typography>
                  ))}
                </Box>
              )}
              <Typography variant="h6" sx={{ mt: 2 }}>Videos</Typography>
              {a.videos.map(video => (
                <Box key={video.id} sx={{ mt: 1, pl: 2, borderLeft: '4px solid #94C94A' , borderRight: '4px solid #94C94A' }}>
                  <Typography>{new Date(video.upload_date).toLocaleDateString()} — {video.status}</Typography>
                  <video width="500" height="300" controls>
                    <source src={`http://localhost:8000/${video.file_path}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <br />
                  <Button
                    size="small"
                    color="error"
                    onClick={async () => {
                      if (window.confirm("Delete this video?")) {
                        try {
                          await API.delete(`/videos/${video.id}`);
                          loadAthletes();  
                        } catch {
                          alert("Failed to delete video");
                        }
                      }
                    }}
                  >
                    Delete Video
                  </Button>
                  {video.metrics.length > 0 ? (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2">Video Metrics:</Typography>
                      {video.metrics.map(m => (
                        <Typography key={m.timestamp}>
                          {m.metric_name}: {m.value}
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography>No metrics for this video yet.</Typography>
                  )}
                  <EditMetricsDialog
                    videoId={video.id}
                    athleteId={a.id}
                    onUpdated={loadAthletes}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Box sx={{ mb: 3, mt: 3 }}>
        <CreateAthleteDialog open={open} onClose={() => setOpen(false)} onSuccess={loadAthletes} />
      </Box>
    </Box>
  );
};

export default Dashboard;
