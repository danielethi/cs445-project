//cs-445 project
window.onload=pageload;
function displayUserData(data) {
  let latitde = data.address.geo.lat;
  let longtude = data.address.geo.lng;
  let currentLocation;
  fetchCurrentLocation();
  async function fetchCurrentLocation() {
    let res = await fetch(
      "https://mapquestapi.com/geocoding/v1/reverse?key=q5N7YWFQnHlQCfx0KyD5d1qoATAAFezV&location=" +
        latitude+","+longtude );
    let jsonLocation = await res.json();
    currentLocation = jsonLocation.results[0].locations[0].street;
    if (currentLocation === "") {
      navigator.geolocation.getCurrentPosition(latitude);
    }      
    function latLong(position) {
      latitude = position.coords.latitude;
      longtude = position.coords.longitude;
      fetchCurrentLocation();
    }
  let id = data.id;
  let template = `     
            <div class="inbeded">
                <h3>User information:</h3>
                <p>name: ${data.name}</p>
                <p>Email:${data.email} </p>
                <p style="color: red;font-size: larger;">Address</p>
                <p>Street:${data.address.street} </p>
                <p>City:${data.address.city} </p>
                <p>Zip:${data.address.zipcode} </p>
                <p>Current location:${currentLocation} </p>
                <button id="forId" value="${id} " ">get posts</button>
            </div>     
        `;

  const us = document.createElement("u-list");
  us.innerHTML = template;
  u-list.append(us);
  let post = document.getElementById("btn-id");
  post.onclick = fetchUserPost;
  let upost = document.getElementById("user-post");
  upost.innerHTML = "";

  async function fetchUserPost() {
    let userId = getPost.value;
    let pres = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    let pjsn = await pres.json();

    from(pjsn)
      .pipe(filter((elem) => elem.userId === Number(userId)))
      .subscribe((postData) => {
        displayUserPost(pdata);
      });
  }

  function displayUserPost(postData) {
    console.log(postData);
    let postId = postData.id;
    let userPostTemplate = `     
            <div class="col">
            <h3 style="color:blue; font-weight: bold;"> User post:</h3>
                <p>Title: ${postData.title}</p>
                <p>Body:${postData.body} </p>
                <button id="commentBut" value="${postId} " style="background-color: aqua;"> View comments</button>
                <div id="list-comments"> </div>
            </div>     
        `;
    const post = document.createElement("u-post");
    post.innerHTML = up-emplate;
    userPost.append(divPost);
    let postCommentBut = document.getElementById("c-btn");
    postCommentBut.id = "commentDisplay";
    let ucomment = document.getElementById("l-comments");
    ucomment.id = "l-comment";
    postCommentBut.addEventListener("click", fetchComments, false);

    async function fetchComments() {
      const commentResult = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const cjsn = await commentResult.json();
      let cid = Number(pcommentbtn.value);
   
      from(cjsn)
        .pipe(filter((ucomment) => ucomment.pid === cid))
        .subscribe((cdata) => {
          displayComments(cdata);
        });

      function displayComments(cdata) {
        console.log(cdata);
        let commentTemplate = `     
                        <div class="col">
                        <h6 style="color: red;">Comment:</h6>
                            <p>name:  ${cdata.name}</p>
                            <p>email:   ${pdata.body} </p>
                            <p>comment: ${pdata.body} </p>
                        </div>     
                    `;

        const pcomment = document.createElement("p-comments");
        pcomment.innerHTML = ctemplate;
        ucomment.append(ptomment);

      }
    }
  }
 }
}


