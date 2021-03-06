const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
  });
  api.defaults.headers.common['X-API-KEY'] = 'ca39cbab-563f-4516-833b-d8d544b9b051';

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=ca39cbab-563f-4516-833b-d8d544b9b051';
const API_URL_FAVORITES ='https://api.thecatapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=ca39cbab-563f-4516-833b-d8d544b9b051`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'
    const spanError = document.getElementById('error')

  const  loadRandomGats = async () => {
    const res = await fetch(API_URL_RANDOM);
    const data= await res.json();
  
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
      } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2')
        
        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavorite(data[0].id);
        btn2.onclick = () => saveFavorite(data[1].id);
      }
    
  };

  const  loadFavorites = async () => {
    const res = await fetch(API_URL_FAVORITES, {
        
        method: 'GET',
        headers: {
            
            'x-api-key': 'ca39cbab-563f-4516-833b-d8d544b9b051',
        },
        
    });
    const data= await res.json();
    console.log(data);
    
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      } else {
        const section = document.getElementById('favorites');
          section.innerHTML="";

          const h2 = document.createElement('h2');
          const h2Text = document.createTextNode('Favoritos');

          h2.appendChild(h2Text);
          section.appendChild(h2);

          data.forEach(item => {
              
              const article = document.createElement('article');
              const img = document.createElement('img');
              const btn = document.createElement('button');
              const btnText = document.createTextNode ('Quitar de favoritos');

            btn.appendChild(btnText);
            btn.onclick = () => deleteFavorite(item.id);
            img.src= item.image.url;
            img.width = 150;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
              
          })
      }
    
  };

  const saveFavorite = async (id) => {
      const {data, status} = await api.post('/favourites', {
          image_id: id,
      })
    //  const res = await fetch (API_URL_FAVORITES,{
    //      method: 'POST',
    //      headers: {
    //          'Content-Type': 'application/json',
    //          'x-api-key': 'ca39cbab-563f-4516-833b-d8d544b9b051',
    //      },
    //      body: JSON.stringify({
    //          image_id: id
    //      }),
    //  } );
    //  const data = await res.json();

     console.log("SAVE");
     

     if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
      } else {
          loadFavorites();
      }
  }

  const deleteFavorite = async(id) => {
    const res = await fetch (API_URL_FAVORITES_DELETE(id),{
        method: 'DELETE',
        headers: {
            
            'x-api-key': 'ca39cbab-563f-4516-833b-d8d544b9b051'}

        
    } );
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      } else {
          console.log('se elimino correctamente');
          loadFavorites();
      }
  }

  const uploadPhoto = async ()=>{
      const form = document.getElementById("uploadingForm");
      const formData = new FormData(form);

      console.log(formData.get('file'));

      const res = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers: {
            // 'ContentType': 'multipart/form-data',
            'x-api-key':'ca39cbab-563f-4516-833b-d8d544b9b051',
        },
        body: formData,
      })
      const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      } else {
          console.log('Foto subida');
          saveFavorite(data.id);
      }
  }

  const miniatura = () => {
    const form = document.getElementById("uploadingForm");
    const formData = new FormData(form);
    const reader = new FileReader();

    console.log(form);

    if (form.children.length === 3) {
        const preview = document.getElementById("preview")
        form.removeChild(preview)
    }
    reader.readAsDataURL(formData.get('file'));

    reader.onload = () => {
        const previewImage = document.createElement('img')
        previewImage.id = "preview"
        previewImage.width = 50
        previewImage.src = reader.result
        form.appendChild(previewImage);
    }
  }
  
  loadRandomGats();
  loadFavorites();
  console.log(fetch());