const Path = (port, route) =>{
  const {hostname, protocol} = window.location;
  console.log(`${protocol}//${hostname}:${port}/${route}`);
  return `${protocol}//${hostname}:${port}/${route}`
}

export default class filmAPI{

  static getFilms = async () => {
    const res = await fetch(Path(8080, "films"), {
      method: 'get',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }});
    const body = await res.json();
    return body;
  };

  static uploadFile = async (formData) => {
    const res = await fetch(Path(8080, "upload"), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      body : formData});
    const body = await res.json();
    return body;
  };

  static deleteFilm = async (id) => {
    const res = await fetch(Path(8080, "films"), {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body : JSON.stringify({id})});
    const body = await res.json();
    console.log(body);
    return body;
  };

  static addFilm = async (obj) => {
    const res = await fetch(Path(8080, "films"), {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body : JSON.stringify({...obj})});
    const body = await res.json();
    console.log(body);
    return body;
  };

}