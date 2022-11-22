import httpClient from '../interceptor';

export const registerRequest = (data) => httpClient.post('auth/registration', data);
export const loginRequest = (data) => httpClient.post('auth/login', data);
export const refreshRequest = (data) => httpClient.put('auth/refresh', data);


export const getUser = () => httpClient.get('user/getUser');
export const cashOut = (data) => httpClient.post('user/cashout', data);
export const updateUser = (data) => httpClient.patch('user/updateUser', data);

export const updateContest = (data) => httpClient.patch('contest/updateContest', data);
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
export const setOfferStatus = (data) => httpClient.patch('offer/setOfferStatus', data);
export const setOfferApprovement = (data) => httpClient.patch('offer/setOfferApprovement', data);
export const changeMark = (data) => httpClient.post('offer/changeMark', data); 
export const getOfferList = (data) => httpClient.post('offer/getOffers', data);

export const getPreviewChat = () => httpClient.get('chat/getPreview');
export const getDialog = (data) => httpClient.post('chat/getChat', data);
export const newMessage = (data) => httpClient.post('chat/newMessage', data);
export const changeChatFavorite = (data) => httpClient.patch('chat/favorite', data);
export const changeChatBlock = (data) => httpClient.patch('chat/blackList', data);
export const getCatalogList = (data) => httpClient.get('chat/getCatalogs', data);
export const addChatToCatalog = (data) => httpClient.post('chat/addNewChatToCatalog', data);
export const createCatalog = (data) => httpClient.post('chat/createCatalog', data);
export const deleteCatalog = (data) => httpClient.post('chat/deleteCatalog', data);
export const removeChatFromCatalog = (data) => httpClient.post('chat/removeChatFromCatalog', data);
export const changeCatalogName = (data) => httpClient.patch('chat/updateNameCatalog', data);

export const сountRoles = () => httpClient.get('tasks/countRoles');
export const сashback = () => httpClient.patch('tasks/cashback');
export const addToBalance = () => httpClient.patch('tasks/addToBalance');