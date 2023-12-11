function setLocalStorage(key,data) {
const validDataToStore = JSON.stringify(data);
localStorage.setItem(key,validDataToStore);
};

export default setLocalStorage;
