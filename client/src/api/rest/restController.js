import httpClient from '../interceptor';

export const registerRequest = (data) => httpClient.post('auth/registration', data);
export const loginRequest = (data) => httpClient.post('auth/login', data);
export const refreshRequest = (data) => httpClient.put('auth/refresh', data);


export const getUser = () => httpClient.post('user/getUser');
export const cashOut = (data) => httpClient.post('user/cashout', data);
export const updateUser = (data) => httpClient.post('user/updateUser', data);

export const updateContest = (data) => httpClient.post('contest/updateContest', data);
export const downloadContestFile = (data) => httpClient.get(`contest/downloadFile/${data.fileName}`);
export const payMent = (data) => httpClient.post('contest/pay', data.formData);
export const dataForContest = (data) => httpClient.post('contest/dataForContest', data);
export const getCustomersContests = (data) => httpClient.post('contest/getCustomersContests', { limit: data.limit, offset: data.offset }, {
  headers: {
    status: data.contestStatus,
  },
});


export const getActiveContests = ({
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
}) => httpClient.post('contest/getAllContests', {
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
});

export const getContestById = (data) => httpClient.get('contest/getContestById', {
  headers: {
    contestId: data.contestId,
  },
});

export const setNewOffer = (data) => httpClient.post('offer/setNewOffer', data);
export const setOfferStatus = (data) => httpClient.post('offer/setOfferStatus', data);
export const setOfferApprovement = (data) => httpClient.post('offer/setOfferApprovement', data);
export const changeMark = (data) => httpClient.post('offer/changeMark', data); 
export const getOfferList = (data) => httpClient.post('offer/getOffers', data);

export const getPreviewChat = () => httpClient.post('chat/getPreview');
export const getDialog = (data) => httpClient.post('chat/getChat', data);
export const newMessage = (data) => httpClient.post('chat/newMessage', data);
export const changeChatFavorite = (data) => httpClient.post('chat/favorite', data);
export const changeChatBlock = (data) => httpClient.post('chat/blackList', data);
export const getCatalogList = (data) => httpClient.post('chat/getCatalogs', data);
export const addChatToCatalog = (data) => httpClient.post('chat/addNewChatToCatalog', data);
export const createCatalog = (data) => httpClient.post('chat/createCatalog', data);
export const deleteCatalog = (data) => httpClient.post('chat/deleteCatalog', data);
export const removeChatFromCatalog = (data) => httpClient.post('chat/removeChatFromCatalog', data);
export const changeCatalogName = (data) => httpClient.post('chat/updateNameCatalog', data);
