import { useEffect } from 'react';
import axios from 'axios'
import { useRef } from 'react';

function App() {

  const clientId = useRef()
  const clientSecret = useRef()
  const personalAccessToken = useRef()

  function getAuthCode() {
    localStorage.setItem('client_secret',clientSecret.current.value)
    localStorage.setItem('client_id',clientId.current.value)

    const redirectUri = 'https%3A%2F%2Flocalhost%3A3000%2Foauth2%2Fcallback'
    //https%3A%2F%2Fzendesk-api.vercel.app%2Foauth2%2Fcallback

    window.location.replace(`https://api.getbase.com/oauth2/authorize?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId.current.value}`)
  }

  function getContactsList() {

    let token = null
    if(localStorage.getItem('token') !== null) {
      token = localStorage.getItem('token')    
    }

    axios.post('https://localhost:5000/getContacts',{data:{
      token: token,
    }})
    .then(res => {
      console.log('data: ', res.data)
    })
  }

  function getContactsListPAT() {

    axios.post('https://localhost:5000/getContactsPAT',{data:{
      token: personalAccessToken.current.value,
    }})
    .then(res => {
      console.log('data: ', res.data)
    })
  }

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code")

    let client_secret = null
    let client_id = null

    if(localStorage.getItem('client_secret') !== null && localStorage.getItem('client_id') !== null) {
      client_secret = localStorage.getItem('client_secret')
      client_id = localStorage.getItem('client_id')
    }

    if (params.has("code")) {
      axios.post(`https://localhost:5000/getToken?code=${code}`,{
        data:{
          client_secret: client_secret,
          client_id: client_id
        }
      })
      .then(res => {
        console.log('token: ', res.data)
        localStorage.setItem('token',res.data.access_token)
      })
    }
  },[])

  return (
    <div>
      <input type='text' ref={clientId} placeholder='Enter client id' />
      <input type='text' ref={clientSecret} placeholder='Enter client secret' />
      <button
        onClick={getAuthCode}
      >
        Get Auth code
      </button>
      <button
        onClick={getContactsList}
      >
        Get contacts list
      </button>
      <br />
      <hr />
      <br />
      <input type='text' ref={personalAccessToken}  placeholder='personalAccessToken'/>
      <button
        onClick={getContactsListPAT}
      >
        Get contacts list with PAT
      </button>
    </div>
  );
}

export default App;
