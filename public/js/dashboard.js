
const articleFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#article-title').value.trim();
    const content = document.querySelector('#article-content').value.trim();

    console.log('line 7 dashboard.js : ',content,title);

    if (content && title) {
    
        console.log('line 12 in article.js');
        console.log(content, title);

        const newarticle = await fetch('/api/dashboard', {
            method: 'POST',
            body: JSON.stringify({ content, title }),
            headers: { 'Content-Type': 'application/json' },
        }).then(response=> response.json())
        .then(data=> {
            console.log('article posted');
            document.location.replace('/api/dashboard');
            
        }).catch((err)=>{
            console.error(err);
        });
    };
}; //closes function
  const articleBtn=document.getElementById("article");
  articleBtn.addEventListener("click", articleFormHandler);