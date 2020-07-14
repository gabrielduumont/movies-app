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
            const url = "?apikey=" + APIkey + "&i=" + id +"&r=JSON";
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
    }
};

export default omdbAPIService;