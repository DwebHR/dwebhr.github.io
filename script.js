(() => {
	const dateObj = new Date();
	const year = dateObj.getUTCFullYear();
	const month = dateObj.getUTCMonth() + 1;
	const day = dateObj.getUTCDate();
	const date = year + '/' + month + '/' + day;
	const saved_quotes = JSON.parse(localStorage.getItem('qod')) || {};
	const quote_wrap = document.getElementById('quote');

	if(Object.keys(saved_quotes).includes(date)) {
		quote_wrap.innerText = saved_quotes[date];
	} else {
		fetch('https://quotes.rest/qod', {
				'Content-type': 'application/json'
			})
			.then(response => {
				if(response.ok) return response.json();
				return Promise.reject('An error occured. Please try again later.');
			})
			.then(data => {
				const quote = data.contents.quotes[0].quote;
				quote_wrap.innerText = quote;
				localStorage.setItem('qod', JSON.stringify({ [date]: quote, ...saved_quotes }));
			})
			.catch(error => quote_wrap.innerText = error);
	}
})();