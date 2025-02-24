import { Avatar, Card, CardContent, Typography } from "@mui/material";

interface Props {
  user: User
}

export default function UserListItem({ user }: Props) {
  return <Card key={user.id} sx={{ display: "flex", alignItems: "center", p: 2 }}>
    <Avatar src={user.avatar_url} alt={user.login} sx={{ width: 64, height: 64, mr: 2 }} />
    <CardContent>
      <Typography variant="h6">{user.login}</Typography>
      <Typography variant="body2" color="text.secondary">
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          {user.html_url}
        </a>
      </Typography>
    </CardContent>
  </Card>
}