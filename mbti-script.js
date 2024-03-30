document.addEventListener('DOMContentLoaded',function(){
    const sidebarBtn = document.getElementById('sidebarBtn');
    const sidebar = document.getElementById('sidebar');
    const links = sidebar.querySelectorAll('a');
    const page = document.getElementById('page');

    sidebarBtn.addEventListener('click', () => {
        if (sidebar.style.width == '0px') {
            page.style.marginLeft = '250px';
            sidebar.style.width = '250px';
            links.forEach(link => {
                link.style.display = 'block';
            });
        } else {
            page.style.marginLeft = '0px';
            sidebar.style.width = '0px';
            links.forEach(link => {
                link.style.display = 'none';
            });
        }
    });



document.querySelectorAll(".post").forEach(post => {
	const postId = post.dataset.postId;

	const ratings = post.querySelectorAll(".post-rating");
	const likeRating = post.querySelectorAll(".post-rating-like");


	ratings.forEach(rating => {
		const button = rating.querySelector(".post-rating-button");
		const count = rating.querySelector(".post-rating-count");

		button.addEventListener("click", async () => {
			if (rating.classList.contains("post-rating-selected")) {
				return;
			}

			count.textContent = Number(count.textContent) + 1;

			ratings.forEach(rating => {
				if (rating.classList.contains("post-rating-selected")) {
					const count = rating.querySelector(".post-rating-count");

					count.textContent = Math.max(0, Number(count.textContent) - 1);
					rating.classList.remove("post-rating-selected");
				}
			});

			rating.classList.add("post-rating-selected");

			const likeOrDislike = likeRating === rating ? "like" : "dislike";
			const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
			const body = await response.json();
		});
	});
});

});