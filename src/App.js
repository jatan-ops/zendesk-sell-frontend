import { useEffect } from 'react';
import axios from 'axios'

function App() {

  function getAuthCode() {
    window.location.replace('https://cambrianhelp.zendesk.com/oauth/authorizations/new?response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Foauth2%2Fcallback&client_id=cambrian&scope=read%20write')
  }

  function getTicketList() {

    const token = '60a918f33f6e168b62ba33ab4319e071980befa7cc5e9493576eebf232a84740'

    axios.post('https://localhost:5000/listTickets',{
      token: token
    })
    .then(res => {
      console.log('data: ', res.data)
    })
  }

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code")
    console.log('params: ', code)
    if (params.has("code")) {
      axios.get(`https://localhost:5000/getToken?code=${code}`)
      .then(res => {
        console.log('data: ', res.data)
      })
    }
  },[])

  return (
    <div>
      <button
        onClick={getAuthCode}
      >
        Get Auth code
      </button>
      <button
        onClick={getTicketList}
      >
        Get ticket list
      </button>
    </div>
  );
}

export default App;
