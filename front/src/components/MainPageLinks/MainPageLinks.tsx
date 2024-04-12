import React, { useState } from 'react';
import axiosApi from '../../axiosApi';
import { useMutation } from '@tanstack/react-query';
import { Button, Grid, TextField, Typography } from '@mui/material';

const MainPageLinks = () => {
  const urlCharacters = ['a', 'A', 'b', 'B', 'J', 'm', 'V', 'v', 'k', 'K', 'D', 'F', 'Q', 'q', 'w', 'W', 'L', 'l'];
  const [inputUrl, setInputUrl] = useState('');
  const [displayLink, setDisplayLink] = useState<React.ReactNode>(<div></div>);


  const shortenLinkMutation = useMutation({
    mutationFn: async (data: { originalUrl: string, shortUrl: string }) => {
      const response = await axiosApi.post('/links', data);
      return response.data;
    },
  });

  const generateLink = () => {
    let shortLink = '';
    for (let i = 0; i < 7; i++) {
      const index = Math.floor(Math.random() * urlCharacters.length);
      shortLink += urlCharacters[index];
    }
    return shortLink;
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newShortLink = generateLink();

    try {
      const result = await shortenLinkMutation.mutateAsync({
        originalUrl: inputUrl,
        shortUrl: newShortLink,
      });

      setDisplayLink(<a href={`http://localhost:8000/links/${result.shortUrl}`}>{`http://localhost:8000/links/${result.shortUrl}`}</a>);

    } catch (error) {
      console.log('Error: ' + error);
      setDisplayLink(<div>Не удалось создать ссылку, повторите пожалуйста позже..</div>);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  return (
    <div>
  <Typography variant="h2" mt={4} textAlign="center">Сократить Ссылку</Typography>
  <form onSubmit={handleFormSubmit} style={{ marginTop:20 }}>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={8}>
        <TextField fullWidth required variant="outlined" 
        id="inputUrl" 
        name="inputUrl" 
        label="Введите URL" 
        value={inputUrl} onChange={handleInputChange}
        />
      </Grid>
      <Grid item>
        <Button type='submit' variant="contained" color="primary" fullWidth>Сократить</Button>
      </Grid>
    </Grid>
  </form>
  <Typography variant="h6" mt={2} textAlign="center">Ваша ссылка:</Typography>
  <Typography variant="body2" textAlign="center" style={{ marginTop: 8 }}>
    {displayLink || <br>Ссылка</br>}
  </Typography>
</div>

  );
};

export default MainPageLinks;
