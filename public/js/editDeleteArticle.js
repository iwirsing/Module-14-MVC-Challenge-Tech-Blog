
const articleFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#article-title').value.trim();
    const content = document.querySelector('#article-content').value;
    const articleID = document.querySelector('#articleID').innerHTML;
    
    console.log('line 7 editDeleteArticle.js : ',content,title);

    if (content && title) {

        const editURL='/api/edit/'+articleID;
        const newarticle = await fetch(editURL, {
            method: 'PUT',
            body: JSON.stringify({ content, title }),
            headers: { 'Content-Type': 'application/json' },
        }).then(response=> response.json())
        .then(data=> {
            console.log('article replublished');
            document.location.replace('/api/dashboard');
            
        }).catch((err)=>{
            console.error(err);
        });
    };
}; //closes republish function

const deleteFormHandler = async (event) => {
    event.preventDefault(); 
    const articleID = document.querySelector('#articleID').innerHTML;
    
    console.log('line 39 editDeleteArticle.js : ');

    if (articleID) {

        const deleteURL='/api/edit/'+articleID;
        const delArticle = await fetch(deleteURL, {
            method: 'DELETE',
            body: JSON.stringify({ article_id:articleID }),
            headers: { 'Content-Type': 'application/json' },
        }).then(response=> response.json())
        .then(data=> {
 
            document.location.replace('/api/dashboard');
            
        }).catch((err)=>{
            console.error(err);
        });
    };
}; //closes republish function



  const articleBtn=document.getElementById("republish");
  articleBtn.addEventListener("click", articleFormHandler);

  const deleteBtn=document.getElementById("delete");
  deleteBtn.addEventListener("click", deleteFormHandler);