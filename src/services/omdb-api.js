import axios from 'axios';

const APIkey = '4592c110';

const omdbAPIServiceBase = axios.create({
    baseURL: "http://www.omdbapi.com",
});

const omdbAPIService = {
    search: {
        byTitle: async (title, onSuccess = null, onError = null) => {
            const url = "?apikey=" + APIkey + "&s=" + title + "&r=JSON";

            await omdbAPIServiceBase({
                method: 'get',
                url: url,
            })
                .then((res) => {
                    if (!!onSuccess) onSuccess(res.data);
                })
                .catch((err) => {
                    if (!!onError) onError(err);
                });
        },
        byTitleAndYear: async (title, year, onSuccess = null, onError = null) => {
            const url = "?apikey=" + APIkey + "&s=" + title + "&y=" + year + "&r=JSON";
            await omdbAPIServiceBase({
                method: 'get',
                url: url,
            })
                .then((res) => {
                    if (!!onSuccess) onSuccess(res.data);
                })
                .catch((err) => {
                    if (!!onError) onError(err);
                });
        },
        byId: async (id, onSuccess = null, onError = null) => {
            const url = "?apikey=" + APIkey + "&i=" + id + "&r=JSON";
            await omdbAPIServiceBase({
                method: 'get',
                url: url,
            })
                .then((res) => {
                    if (!!onSuccess) onSuccess(res.data);
                })
                .catch((err) => {
                    if (!!onError) onError(err);
                });
        },
        batch: async (arr, onSuccess = null, onError = null) => {
            let promisesArr = [];
            for (let i in arr) {
                promisesArr.push(
                    omdbAPIServiceBase({
                        method: 'get',
                        url: "?apikey=" + APIkey + "&i=" + arr[i].imdbID + "&r=JSON",
                    })
                );
            }
            let dataFetchedArr = [];
            await Promise.all(promisesArr).then((values) => {
                for (let i in values) {
                    dataFetchedArr.push(
                        {
                            ...values[i].data
                        }
                    );
                }
            }).catch(err => {
                if (!!onError) onError(err);
            });
            if (!!onSuccess) onSuccess(dataFetchedArr);
        },
    }
};

export default omdbAPIService;