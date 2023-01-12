
const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#username-comment').value.trim();
    const article_id = document.querySelector('#article-id').innerHTML;

    console.log(content, article_id);

    if (content && article_id) {
    
        console.log('line 12 in comment.js');

        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ content, article_id }),
            headers: { 'Content-Type': 'application/json' },
        }).then(response=> {
            console.log('Comment success');
        }).catch((err)=>{
            res.status(400).json(err);
        });
  
    //   if (response.ok) {
        
    //     // document.location.reload();
    //   } else {
    //     alert('Comment content cannot be empty.');
    //   }
    // }
  };
};

  const commentBtn=document.getElementById("comment");
  commentBtn.addEventListener("click", commentFormHandler);