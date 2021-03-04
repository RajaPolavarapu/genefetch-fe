const getData = ({value}) => {
    return new Promise((resolve, reject) => {
        fetch(`/genesuggest?query=${value}`)
        .then((response) => response.json())
        .then(result => {
            if (result && result.data) {
                resolve(result.data)
            } else {
                reject([])
            }
        })
        .catch(err => {
            reject([])
        })
    });
}