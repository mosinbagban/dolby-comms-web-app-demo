import React, { useEffect, useState } from "react";
import LocalizedStrings from "react-localization";
import { useLocation } from "react-router-dom";

import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';

import { GlobalStyles } from '../../../theme/GlobalStyles';
import {useTheme} from '../../../theme/useTheme';

import Conference from "./conference";
import dolbyLogo from "../../../static/images/dolby.png";
import axios from "axios";
import ThemeSelector from "../../../theme/ThemeSelector";
import Dialog from "../Dialog";
import CreateThemeContent from "../../../theme/CreateThemeContent";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { ColorPicker, useColor } from "react-color-palette";


let strings = new LocalizedStrings({
  en: {
    join: "Join call",
    name: "Your name",
    accessToken: "Your access token",
    conferenceName: "The conference name",
    copyright: " All Rights Reserved",
    next: "Next",
    joinAsListener: "Join as a listener",
    defaultSettings: "Connect using default settings",
    advancedOptions: "advanced options",
    show: "Show",
    hide: "Hide"
  },
  fr: {
    join: "Rejoindre la conférence",
    name: "Nom d'utilisateur",
    accessToken: "Votre jeton d'authentification",
    conferenceName: "Nom de la conférence",
    copyright: " Tous droits réservés",
    next: "Suivant",
    joinAsListener: "Rejoindre en tant qu'auditeur",
    defaultSettings: "Se connecter avec les paramètres par défaut",
    advancedOptions: "les options avancées",
    show: "Afficher",
    hide: "Masquer"
  },
});

// 2: Create a cotainer
const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Main = ({ }) => {
  const query = useQuery();
  const conferenceAlias = query.get("alias");
  const accessToken = query.get("token");

  const conferenceInUrl = conferenceAlias != null && conferenceAlias.length >= 0;
  const accessTokenInUrl = accessToken != null && accessToken.length >= 0;

  const [ alias, setAlias ] = useState(conferenceAlias);
  const [ getAccessToken, setAccessToken ] = useState(accessToken);
  const [ username, setUsername ] = useState();
  const [ useDefaultSettings, setUseDefaultSettings ] = useState(true);
  const [ isListener, setIsListener ] = useState(false);
  const [ showOptions, setShowOptions ] = useState(false);
  const [ joinSubmitted, setJoinSubmitted ] = useState(false);

  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [showDialog, setShowDialog] = useState(false);
  const [newTheme, setNewTheme] = useState();
  const [color, setColor] = useColor("hex", "#121212");

  const toggleConfiguration = () => {
    setUseDefaultSettings(!useDefaultSettings);
  };

  useEffect(() => {
    setSelectedTheme(theme);
   }, [themeLoaded]);

  // 4: Load all the fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  const manageDialog = () => {
    setShowDialog(!showDialog);
  }

  const createTheme = newTheme => {
    console.log(newTheme);
    setShowDialog(false);
    setNewTheme(newTheme);
  }

const consumerKey = "52M3D538jQTc8iNFjOZOFQ==";
const consumerSecret = "Fb7QTdgfYNmjrfhTzKVyA8l0l2cVVetmlptyOgNMOY0=";

  const settings = {
    authentication: {
      credentials: {
        key: consumerKey,
        secret: consumerSecret,
      },
      serverUrl: "https://api.voxeet.com/v1/auth/token",
    },
    conferenceAlias: "Sample",
  };

  useEffect(()=>{
        getToken();
  }, []);

  function getToken() {
    const key = settings.authentication.credentials.key;
    const secret = settings.authentication.credentials.secret;
    const basic_credentials = btoa(`${key}:${secret}`);
    // const basic_credentials = "WE9oS1pqQ19jdkJadG5VcUV5Zklkdz09OjhyamVRaGhJc0lDdk9pcVd3TTEtSDBSb21JRmx4NlhJVVYySVQ3VHZ3SVE9";
    
    // For Node environments you'd handle credentials like this:
    // const basic_credentials = new Buffer.from(`${key}:${secret}`).toString('base64');
    console.log('Calling access token service: ' + btoa(`${key}:${secret}`) );
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    

    // const config = {
    //     method: 'post',
    //     url: 'https://session.voxeet.com/v1/oauth2/token',
    //     headers: {
    //       'Authorization': `Basic ${basic_credentials}`,
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     data: params
    //   };
      // 
//https://dolby-io-backend-demo.herokuapp.com/access-token
      const config = {
        method: 'get',
        url: 'https://dolby-io-backend-demo.herokuapp.com/access-token',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
      };
    
    axios(config)
        .then(function (response) {
          console.log(response.data.access_token);
          setAccessToken(response.data.access_token);
        })
        .catch(function (error) {
          console.log(error);
        });
    
   }
  
  const handleOnLeave = () => {
    setJoinSubmitted(false);
  };

  if (joinSubmitted) {
    return (
      <>
 
      {
        themeLoaded && <ThemeProvider theme={ selectedTheme }>
          <Container style={{fontFamily: selectedTheme.font}}>
          <Conference
            conferenceAlias={alias}
            accessToken={getAccessToken}
            username={username}
            handleOnLeave={handleOnLeave}
            useDefaultSettings={useDefaultSettings}
            isListener={isListener}
      />
          </Container>
        </ThemeProvider>
      }
      </>
      
    );
  }

  return (
    <div >
      {/* {
      themeLoaded && <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles/>
        <Container style={{fontFamily: selectedTheme.font}}>
        <ThemeSelector setter={ setSelectedTheme } /> 
        <button className="btn" onClick={ manageDialog }>Create a Theme</button>
          <Dialog 
            header="Create a Theme"
            body={ <CreateThemeContent create={ createTheme }/> }
            open={ showDialog } 
            callback = { manageDialog }/>
           
        </Container>
      </ThemeProvider>
    } */}
      {/* <div className="content-sample">
        <div className="dolby-container-logo">
          <img src={dolbyLogo} alt="Dolby.io" />
        </div>
        {!accessTokenInUrl && (
          <div className="input-field">
            <input
              name="accessToken"
              placeholder={strings.accessToken}
              value={getAccessToken ?? ""}
              onChange={(e) => setAccessToken(e.target.value)}
              id="accessToken"
              type="text"
              className="validate"
              hidden
            />
          </div>
        )}
        {!conferenceInUrl && (
          <div className="input-field">
            <input
              name="conferenceName"
              placeholder={strings.conferenceName}
              value={alias ?? ""}
              onChange={(e) => setAlias(e.target.value)}
              id="conferenceName"
              type="text"
              className="validate"
            />
          </div>
        )}
        <div className="input-field">
          <input
            name="username"
            placeholder={strings.name}
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            className="validate"
          />
        </div>
        <div
          className="advanced-options"
          onClick={() => setShowOptions(!showOptions)}
        >
          {`${showOptions ? strings.hide : strings.show} ${strings.advancedOptions}`}
          <div className={showOptions ? 'arrow-up' : 'arrow-down'} />
        </div>
        {showOptions && <React.Fragment>
          <input
            type="checkbox"
            id="isListener"
            checked={isListener}
            onChange={(e) => setIsListener(!isListener)}
          />
          <label id="isListenerLabel" htmlFor="isListener">
            {strings.joinAsListener}
          </label>

          <input
            type="checkbox"
            id="configuration"
            checked={useDefaultSettings}
            onChange={toggleConfiguration}
          />
          <label id="configurationLabel" htmlFor="configuration">
            {strings.defaultSettings}
          </label>
        </React.Fragment>}

        <div className="blockButton">
          <button  
          id="join"
            disabled={!alias || alias.length === 0}
            className={
              !getAccessToken || getAccessToken.length <= 0 || !alias || alias.length <= 0
                ? "waves-effect waves-light disable"
                : "waves-effect waves-light"
            }
            onClick={() => setJoinSubmitted(true)}
          >
            {strings.next}
          </button>
        </div>
        <a href="https://heroku.com/deploy?template=https://github.com/mosinbagban/dolby-io-backend-demo">
        <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy" />
        </a>
      </div> */}

      <div>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',  
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor : '#f7f5f6',
            paddingTop: '100px',
            paddingRight: '100px',
            paddingLeft:'100px',
            paddingBottom: '150px'
          }}
        >
          <img src={dolbyLogo} width='100px'
            style={{paddingBottom:'50px'}}
          />
          <Typography component="h1" variant="h5" 
            style={{paddingBottom:'20px'}}>
            Welcome to Dolby.io conference app
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="conference"
              label="Conference name"
              name="conference"
              autoFocus
              onChange={(e) => setAlias(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Your name"
              name="username"
              autoComplete="name"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />  

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: color.hex }}
              onClick={() => setJoinSubmitted(true)}
            >
              Join
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </div>
      
      
      <div className="copyright">
        <span>Powered by Dolby.io Appbuilder— {strings.copyright}</span>
      </div>
      </div>
  );
};

export default Main;
