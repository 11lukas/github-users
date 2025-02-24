import NoDataImage from '@assets/images/no-data.png';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function NoListData() {
  return <Card sx={{ display: "flex", alignItems: "center", justifyContent: 'center', p: 2 }}>
    <CardContent>
      <CardMedia
        component="img"
        height="200"
        image={NoDataImage}
        alt="No data"
        sx={{ borderRadius: 4 }}
      />
      <Typography variant="body2" color="text.secondary" align="center" mt={2}>
        Nie znaleziono użytkownika
      </Typography>
    </CardContent>
  </Card>
}