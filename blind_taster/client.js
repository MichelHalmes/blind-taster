

const SERVER_HOST_PORT = 'http://192.168.8.101:3000'


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    console.log('Client Error:', response.status, response.url);
    let error = new Error(response.statusText);
    error.response = response;
    throw error; // TODO: errors do not get handled properly on the client side
  }
}

function postLogin(username) {
  return fetch(`${SERVER_HOST_PORT}/api/login`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function getWinesTags() {
  return fetch(`${SERVER_HOST_PORT}/api/wines_tags`, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function postGuess(username, guess) {
  return fetch(`${SERVER_HOST_PORT}/api/guess`, {
      method: 'POST',
      body: JSON.stringify({ username, guess }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function getRevealTag() {
  return fetch(`${SERVER_HOST_PORT}/api/reveal_tag`, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function postRevealTag(tag, wine) {
  return fetch(`${SERVER_HOST_PORT}/api/reveal_tag`, {
      method: 'POST',
      body: JSON.stringify({ tag, wine }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}

function getPoints(username) {
  return fetch(`${SERVER_HOST_PORT}/api/points/${username}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(checkStatus)
    .then((response) => response.json())
}


export default {
  postLogin,
  getWinesTags,
  postGuess,
  getRevealTag,
  postRevealTag,
  getPoints
}
