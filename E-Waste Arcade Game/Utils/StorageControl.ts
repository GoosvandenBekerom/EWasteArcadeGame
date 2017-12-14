module EWasteUtils {
    export class StorageControl {

        static setStorage(key, data) {
            localStorage.setItem(key, data);
        }

        static getStorage(key) {
            return localStorage.getItem(key);
        }
    }
}