const commentForm = document.querySelector('#commentForm');
// since we're using a form, we will collect title and description
// directly from commentForm element!
// const title = document.querySelector('#title');
// const description = document.querySelector('#description');
const feed = document.querySelector('#feed');
const feedTitle = document.querySelector('#feed-title');
// h2 initially hidden
// feedTitle.style.display = 'none';

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = commentForm.elements.title;
    const description = commentForm.elements.description;
    // build the comment
    const comment = createComment(title.value, description.value);
    
    // Check if feed is empty
    
    if (feed.innerText === "") {
        console.log("First comment");
        // Display h2!
        feedTitle.style.display = 'block';
        feed.style.display = 'block';
        feed.innerHTML += comment;
    } else {
        // append a separator
        const sep = `<hr>`;
        feed.innerHTML += sep;
        feed.innerHTML += comment;
    }
    console.log('New Comment added!');
    // empty our text fields
    title.value = null;
    description.value = null;
});

const createComment = (title, description) => {
    const currDateTime = getDateTime('es-ES');
    return `<ul class="comment-block">
                <li class="comment-title">${title}</li>
                <li class="comment-description">${description}</li>
                <li class="comment-datetime">Posted on ${currDateTime}</li>
            </ul>`;
}

function getDateTime(country) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    // const options = {}
    return `${today.toLocaleDateString(country)} ${today.toLocaleTimeString(country)}`
}