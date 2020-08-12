import { LogRealmSchema } from "./LogRealmSchema";

const Realm = require('realm');
let realm = new Realm({schema: [LogRealmSchema]});

class LogRealmService {

  init() {
    realm = new Realm({schema: [LogRealmSchema]});
  }

  save = async (id, title, date, html, imageFile) => {
    let justText = '';

    html = html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
    justText = html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();

    realm.write(() => {
      let timestamp;
      let update;
      if (id !== null) {
        timestamp = id;
        update = true;
      } else {
        timestamp = new window.Date().toString();
        update = false;
      }
      realm.create(
        'Log',
        {
          id: timestamp,
          title: title,
          date: date,
          content: justText,
          formattedContent: html,
          image: imageFile
        },
        update);
    });
  }

  getAll = () => {
    return realm.objects('Log');
  }

  addOnChangeListener = (callback) => {
    realm.addListener('change', () => {
      callback()
    });
  }

  close = () => {
    if (realm !== null && !realm.isClosed) {
      realm.close()
    }
  }
}

export default LogRealmService;
