App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    getGif: function(searchingText) { 
        return new Promise (
            function (resolve, reject) {
                const GIPHY_API_URL = 'https://api.giphy.com';
                const GIPHY_PUB_KEY = 'Gh1yoqICnFu2D5Uo760Vle58P0N5QCsC';
                const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; 
                const request = new XMLHttpRequest();
                request.open('GET', url); 
                request.onload = function () { 
                    if (this.status === 200) {
                        const data = JSON.parse(request.responseText).data; 
                        const gif = {  
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);  
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
                request.send();
            }
        )
    },

    handleSearch: function (searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText)
            .then(gif => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            })
            .catch(error => console.log(error));
    },




    render: function() {
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        )
    }
});