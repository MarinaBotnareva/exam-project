import http from '../interceptor';

export const registerRequest = (data) => http.post('auth/registration', data);
export const loginRequest = (data) => http.post('auth/login', data);

export const getUser = () => http.post('user/getUser');
export const cashOut = (data) => http.post('user/cashout', data);
export const updateUser = (data) => http.post('user/updateUser', data);

export const updateContest = (data) => http.post('contest/updateContest', data);
export const downloadContestFile = (data) => http.get(`contest/downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('contest/pay', data.formData);
export const dataForContest = (data) => http.post('contest/dataForContest', data);
export const getCustomersContests = (data) => http.post('contest/getCustomersContests', { limit: data.limit, offset: data.offset }, {
  headers: {
    status: data.contestStatus,
  },
});

export const getActiveContests = ({
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
}) => http.post('contest/getAllContests', {
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
});

export const getContestById = (data) => http.get('contest/getContestById', {
  headers: {
    contestId: data.contestId,
  },
});

export const setNewOffer = (data) => http.post('offer/setNewOffer', data);
export const setOfferStatus = (data) => http.post('offer/setOfferStatus', data);
export const changeMark = (data) => http.post('offer/changeMark', data);

export const getPreviewChat = () => http.post('chat/getPreview');
export const getDialog = (data) => http.post('chat/getChat', data);
export const newMessage = (data) => http.post('chat/newMessage', data);
export const changeChatFavorite = (data) => http.post('chat/favorite', data);
export const changeChatBlock = (data) => http.post('chat/blackList', data);
export const getCatalogList = (data) => http.post('chat/getCatalogs', data);
export const addChatToCatalog = (data) => http.post('chat/addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('chat/createCatalog', data);
export const deleteCatalog = (data) => http.post('chat/deleteCatalog', data);
export const removeChatFromCatalog = (data) => http.post('chat/removeChatFromCatalog', data);
export const changeCatalogName = (data) => http.post('chat/updateNameCatalog', data);
