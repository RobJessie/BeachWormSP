import React, { useState } from 'react';
import { useAuth } from './../../hooks/authHooks';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './Questionnaire.css';
import './../../api/recommendationApi';
import { postGenreSeeds } from '../../api/recommendationApi';
import Placeholder from '../images/genres/placeholder.png';
import { useWindowDimensions, SCREEN_SIZE } from './../../hooks/responsiveHooks';
import Fab from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

/*
* TO-DO:
* Get images for each genre
*/
const spotifyGenreIds = ['acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 
'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 
'chill', 'classical', 'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno',
'disco', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french', 'funk',
'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 'hardcore',
'hardstyle', 'heavy-metal', 'hip-hop', 'holidays', 'honky-tonk', 'house', 'idm', 'indian', 'indie', 'indie-pop',
'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay',
'mandopop', 'metal', 'metalcore', 'movies', 'mpb', 'new-age', 'opera', 'pagode', 'party', 'philippines-opm', 'piano',
'pop', 'post-dubstep', 'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day',
'reggae', 'reggaeton', 'road-trip', 'rock', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'ska',
'sleep', 'songwriter', 'soul', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance',
'trip-hop', 'turkish', 'work-out', 'world-music'];
const defaultGenres = {};

spotifyGenreIds.forEach(genreId => {
  defaultGenres[genreId] = {
    id: genreId,
    spotifyid: genreId,
    name: genreId.replaceAll('-', ' '),
    image: <Placeholder />,
    selected: false,
  }
});

function PlaceLetter(props) {
  // Do the first one manually
  if(props.name === 'acoustic'){
    return <LetterGrid name={props.name}/>
    }
  
  // If the first character of genre doesn't match the last one, at the big letter divider
  const index = spotifyGenreIds.indexOf(props.name.replace(" ","-"))
  if(index>0){
    if(props.name.charAt(0) !== spotifyGenreIds[index-1].charAt(0)){
      return <LetterGrid name={props.name}/>
    }
  }

  return null
}

function LetterGrid(props) {
  return (
    <Grid item key={props.name} xs={10} sm='10' justify='center'>
      <Typography style={{ width: '100'}} display='block'
            color = 'primary' variant='h2' >
        {props.name.charAt(0).toUpperCase()}
      </Typography>
    </Grid>)
}

function Questionnaire1() {
  const [genres, setGenres] = useState(defaultGenres);
  const auth = useAuth();
  const history = useHistory();
  const { width } = useWindowDimensions();
  const isMobile = width <= SCREEN_SIZE.SMALL;

  const onIconClick = (event) => {
    let newState = {...genres};
    newState[event.target.id].selected = !newState[event.target.id].selected;
    setGenres(newState);
  }

  const sendGenreSeeds = () => {
    let genreIds = [];
    Object.entries(genres).forEach(genreKV => {
      if(genreKV[1].selected){
        genreIds.push(genreKV[1].spotifyid);
      }
    });
    postGenreSeeds(genreIds).then(_response => {
      console.log('Saved genre seeds', genreIds);
      auth.setHasSeeds({
        ...auth.hasSeeds,
        genre: true,
      })
      history.push('/questionnaire2', history.location.state)
    });
  }

  return !isMobile ? (   
      <div className="questionnaire">
        <button 
          type="button" 
          className="btn"
          onClick={sendGenreSeeds}
        >
          Submit
        </button>
        <Typography align='center' color='primary' variant='h4'>Select some genres you like</Typography>
        <Grid container>
          {Object.keys(genres).map(icon => (
            <Grid item sm key={genres[icon]['id']}>
              <div className={genres[icon]['selected'] ? "withBorder" : "noBorder"} >
                <img
                  src={Placeholder}
                  width="300"
                  height="300"
                  id={genres[icon]['id']}
                  alt={genres[icon]['name']}
                  onClick={(e) => onIconClick(e)} />
                <p>{genres[icon]['name']} </p>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    ) : (
      <div className="questionnaire">
        
        <button 
          type="button" 
          className="btn"
          onClick={sendGenreSeeds}
        >
          Submit
        </button>
        <Typography align='center' color='primary' variant='h5'>Select some genres you like</Typography>
        <Grid container justify="space-evenly" alightItems="center" spacing={2}>
          {Object.keys(genres).map(icon => (
            <React.Fragment>
              <PlaceLetter name={genres[icon]['name']}/>
              <Grid item sm='5' xs={5} key={genres[icon]['id']} >
                
                <div className={genres[icon]['selected'] ? "withBorder" : "noBorder"} >
                  <Fab
                    variant="extended"
                    id={genres[icon]['id']}
                    alt={genres[icon]['name']}
                    onClick={(e) => onIconClick(e)}>
                    {genres[icon]['name']}
                  </Fab>
                </div>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </div>
    );
}

export default Questionnaire1;